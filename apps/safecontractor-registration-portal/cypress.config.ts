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
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    testIsolation: 'legacy',
    setupNodeEvents(on, config) {
      /* eslint-disable @typescript-eslint/no-var-requires */
      // eslint-disable-next-line import/no-extraneous-dependencies
      require('cypress-mochawesome-reporter/plugin')(on);
      // eslint-disable-next-line import/no-extraneous-dependencies
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
    baseUrl: 'https://screg-dev.alcdev.net/',
  },
  reporter: '../../../node_modules/cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: '../../reports/safecontractor-registration-portal',
    charts: true,
    reportPageTitle: 'Cypress-Mochawesome-Reporter',
    embeddedScreenshots: true,
    inlineAssets: true,
    overwrite: false,
    autoOpen: true,
    reportFilename: 'Portal_Automation_UI_Report_[datetime]',
    code: true,
    timestamp: 'longDate',
    showPassed: true,
    showPending: false,
    showSkipped: false,
  },
});
