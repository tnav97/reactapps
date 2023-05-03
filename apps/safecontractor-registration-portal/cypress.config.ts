import { defineConfig } from 'cypress';

export default defineConfig({
  video: true,
  videosFolder: '../../videos/safecontractor-registration-portal',
  screenshotsFolder: '../../screenshots/safecontractor-registration-portal',
  defaultCommandTimeout: 10000,
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    testIsolation: 'legacy',
    setupNodeEvents(on, config) {
      /* eslint-disable @typescript-eslint/no-var-requires */
      // eslint-disable-next-line import/no-extraneous-dependencies
      require('cypress-mochawesome-reporter/plugin')(on);
      // eslint-disable-next-line import/no-extraneous-dependencies
      require('cypress-grep/src/plugin')(config);
      return config;
    },
    baseUrl: 'https://screg-dev.alcdev.net/',
  },
});
