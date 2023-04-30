require('dotenv/config');
const path = require('path');
const { getWebpackConfig } = require('@alcumus/web-app');
const Dotenv = require('dotenv-webpack');

const webpackConfig = getWebpackConfig(
  process.env.NODE_ENV,
  path.resolve(__dirname)
);

module.exports = {
  ...webpackConfig,
  plugins: [...webpackConfig.plugins, new Dotenv({ path: '../../.env' })],
};
