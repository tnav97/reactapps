import { execSync } from 'child_process';
import { keyBy, uniq } from 'lodash';
import path from 'path';

interface LernaGraph {
  [packageName: string]: string[];
}

interface LernaPackageIndex {
  [name: string]: LernaPackage;
}

interface LernaPackage {
  name: string;
  location: string;
}

function execLernaCommand(command: string) {
  return JSON.parse(
    execSync(`npx lerna ${command} --loglevel silent`, {
      cwd: process.cwd(),
    }).toString()
  );
}

function convertLocationToRelative(packages: LernaPackage[]): LernaPackage[] {
  return packages.map((pkg) => ({
    ...pkg,
    location: path.relative(process.cwd(), pkg.location),
  }));
}

export function getDependencies(
  packageName: string,
  graph?: LernaGraph,
  allPackages?: LernaPackageIndex
): LernaPackage[] {
  if (!graph) {
    graph = <LernaGraph>execLernaCommand('la --graph');
  }
  if (!allPackages) {
    allPackages = keyBy(
      convertLocationToRelative(execLernaCommand('la --json')),
      'name'
    );
  }

  const dependencies = graph[packageName]
    ?.map((packageName) => allPackages?.[packageName])
    .filter((pkg) => !!pkg) as LernaPackage[];

  if (!dependencies) {
    return [];
  }

  const subDeps: LernaPackage[] = dependencies
    .map((dep: LernaPackage) => getDependencies(dep.name, graph, allPackages))
    .flat(20);

  return uniq([...dependencies, ...subDeps]);
}
