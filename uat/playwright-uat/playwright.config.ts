import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  projects: [
    {
      name: 'billing-portal',
      testMatch: /\/tests\/billing-portal\/.*\.spec\.ts/,
      retries: 0,
      timeout: 120000,
    },
  ],
};

if (process.env.CI) {
  config.reporter = [['junit', { outputFile: 'results.xml' }]];
  config.use = {
    video: 'on',
  };
}

export default config;
