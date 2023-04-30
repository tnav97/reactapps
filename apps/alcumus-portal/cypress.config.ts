// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  videoUploadOnPasses: false,
  videosFolder: '../../videos/alcumus-portal',
  screenshotsFolder: '../../screenshots/alcumus-portal',
  defaultCommandTimeout: 10000,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  chromeWebSecurity: false,
  env: {
    SERVICES_BASE_URL: 'http://localhost:8000',
    API_KEY: '231ed1ec-e3f0-4f3b-b3a3-8c1495300ea1',
  },
  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      /* eslint-disable @typescript-eslint/no-var-requires */
      // eslint-disable-next-line import/no-extraneous-dependencies
      require('cypress-mochawesome-reporter/plugin')(on);
      // eslint-disable-next-line import/no-extraneous-dependencies
      require('cypress-grep/src/plugin')(config);
      return config;
    },
  },
  reporter: '../../../node_modules/cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: '../../reports/alcumus-portal',
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
