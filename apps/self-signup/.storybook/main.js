const ourWebpackConfig = require('../webpack.config.js');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    'storybook-addon-pseudo-states',
  ],
  webpackFinal: async (config) => {
    // https://storybook.js.org/docs/react/configure/webpack
    return {
      ...config,
      module: {
        ...config.module,
        rules: ourWebpackConfig.module.rules,
      },
    };
  },
};
