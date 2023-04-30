/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const EmlParser = require('eml-parser');
const fs = require('fs');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    parseEmailToHtml({ base64String }) {
      return new Promise((resolve) => {
        const emlParser = new EmlParser(base64String);
        emlParser.getEmailAsHtml().then((res) => {
          resolve(res);
        });
      });
    },
  });
  on('task', {
    deleteFile(path) {
      if (fs.existsSync(path)) fs.unlinkSync(path);
      return null;
    },
  });
  on('task', {
    maybeReadFile({ filename, options }) {
      if (fs.existsSync(filename)) {
        return fs.readFileSync(filename, options);
      }

      return null;
    },
  });
};
