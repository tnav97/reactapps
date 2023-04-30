import { Utilities } from '@alcumus/core';

export const getECMSWebUrl = (path?: string): string => {
  return `${Utilities.ProcessEnv.getValueOrThrow('ECMS_WEB')}${path || ''}`;
};
