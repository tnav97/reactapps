import { Response } from 'express';
import { Types, Utilities } from '@alcumus/core';

export function handleHealthCheck(
  appName: string
): (req: Types.Request, res: Response) => void {
  return (req: Types.Request, res: Response) => {
    const commit = Utilities.ProcessEnv.getValueOrDefault(
      'GIT_COMMIT_SHA',
      'Commit Version Not Available'
    );
    const version = Utilities.ProcessEnv.getValueOrDefault(
      'BUILD_VERSION',
      'Build Version Not Available'
    );
    const healthCheck = {
      uptime: process.uptime(),
      appName,
      status: 'OK',
      timestamp: new Date().toUTCString(),
      pid: process.pid,
      commit,
      version,
    };
    res.json(healthCheck);
  };
}
