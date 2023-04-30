import fs, { readdirSync, readFileSync } from 'fs';
import { generateDockerfile } from './generateDockerfile';
import { execSync } from 'child_process';

const { writeFileSync } = require('fs');
const path = require('path');

const PORT_START = 3000;
const ROOT_DIR = path.resolve(__dirname, '../');
const APPS_DIR = path.resolve(__dirname, '../apps');

const getStorybookPort = (port: number): number => port - PORT_START + 6000;

const appsPresent = readdirSync(APPS_DIR, {
  withFileTypes: true,
})
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const appName = process.argv[2];
const port = process.argv[3] || String(PORT_START + appsPresent.length);

function replacePatternInFile(
  file: string,
  pattern: RegExp,
  replacement: string
) {
  writeFileSync(
    file,
    readFileSync(file).toString().replace(pattern, replacement)
  );
}

export function createApp(appName: string, port: string) {
  if (!appName) {
    console.error('App name is required.');
    return 1;
  }

  if (!appName.match(/^[a-zA-Z0-9-]+$/)) {
    console.error('App name cannot contain anything except A-Z, 0-9 and -');
    return 1;
  }

  const appDir = path.join(APPS_DIR, appName);

  if (fs.existsSync(appDir)) {
    console.info(`Creating "${appName}" to run on port ${port}`);
    return 1;
  }

  console.info(`Creating "${appName}" to run on port ${port}`);
  const portVariableName = `${appName}_PORT`
    .replace(/-|\s/g, '_')
    .toUpperCase();

  execSync(`cp -R ${path.join(APPS_DIR, 'starter-app')} ${appDir}`);

  replacePatternInFile(
    path.join(appDir, 'package.json'),
    /starter-app/,
    appName
  );

  replacePatternInFile(
    path.join(appDir, 'package.json'),
    /"storybook": "start-storybook -p \d+"/,
    `"storybook": "start-storybook -p ${getStorybookPort(parseInt(port))}"`
  );

  replacePatternInFile(
    path.join(appDir, 'src', 'server', 'index.ts'),
    /STARTER_APP_PORT/,
    portVariableName
  );

  replacePatternInFile(
    path.join(appDir, 'src', 'server', 'index.ts'),
    /'Starter App'/,
    `'${appName}'`
  );

  replacePatternInFile(
    path.join(appDir, 'src', 'server', 'index.ts'),
    /'Starter App'/,
    `'${appName}'`
  );

  replacePatternInFile(
    path.join(appDir, 'src', 'server', 'middleware', 'renderPage.tsx'),
    /<title>.*<\/title>/,
    `<title>${appName}</title>`
  );

  generateDockerfile(appName, port);

  const envFile = path.join(ROOT_DIR, '.env');
  const envExampleFile = path.join(ROOT_DIR, '.env.example');

  writeFileSync(
    envExampleFile,
    readFileSync(envExampleFile)
      .toString()
      .concat(`\n${portVariableName}=${port}`)
  );

  if (fs.existsSync(envFile)) {
    writeFileSync(
      envFile,
      readFileSync(envFile).toString().concat(`\n${portVariableName}=${port}`)
    );
  }
}

if (require.main === module) {
  // Run the script if called directly from CLI, otherwise do nothing
  const returnCode = createApp(appName, port);
  process.exit(returnCode || 0);
}
