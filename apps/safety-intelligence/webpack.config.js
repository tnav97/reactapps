const path = require('path');
const webpack = require('webpack');
const { getWebpackConfig } = require('@alcumus/web-app');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('dotenv/config');
const isProduction = process.env.NODE_ENV === 'production';
const Dotenv = require('dotenv-webpack');

const env = process.env;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const webpackConfig = getWebpackConfig(
  process.env.NODE_ENV,
  path.resolve(__dirname)
);

const plugins = [
  ...webpackConfig.plugins,
  new MiniCssExtractPlugin({}),
  new webpack.DefinePlugin(envKeys),
  new Dotenv({ path: '../../.env' }),
];
const productionPlugins = [...plugins, new CleanWebpackPlugin()];
module.exports = {
  ...webpackConfig,
  resolve: {
    extensions: [...webpackConfig.resolve.extensions, '.less', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(svg|jpg|png|gif|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.(sass|css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('node-sass'),
              sassOptions: {
                modules: true,
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: isProduction ? productionPlugins : plugins,
};
