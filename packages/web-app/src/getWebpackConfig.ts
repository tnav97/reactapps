import path from 'path';
import webpack, { DefinePlugin } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import { Environment } from './types';
import CspHtmlWebpackPlugin from 'csp-html-webpack-plugin';

/**
 * Converts key-value pairs to an object that's accepted by DefinePlugin
 * @param environmentVariables
 * @returns
 */
function convertEnvVarsToDefinePluginDefinition(environmentVariables: {
  [key: string]: string;
}) {
  const definitions: { [key: string]: string } = {};
  for (const [key, value] of Object.entries(environmentVariables)) {
    if (value !== undefined) {
      // Define plugin adds constants and not environment variables
      // thats why we have to wrap the values in quotes
      definitions[`process.env.${key}`] = `'${value}'`;
    }
  }
  return definitions;
}

export default function getWebpackConfig(
  environment: Environment,
  basePath: string,
  environmentVariables: { [key: string]: string } = {}
) {
  const isProduction = environment === 'production';
  const isDevelopment = environment === 'development';

  return {
    mode: environment || 'production',
    entry: {
      client: !isDevelopment
        ? path.resolve(basePath, 'src/client/index.ts')
        : [
            'webpack-hot-middleware/client?reload=true',
            path.resolve(basePath, 'src/client/index.ts'),
          ],
    },
    output: {
      filename: isProduction ? '[name].[chunkhash].js' : '[name].bundle.js',
      path: path.resolve(basePath, './build-static'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              module: 'esnext',
            },
          },
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react'],
              },
            },
            {
              loader: 'react-svg-loader',
              options: { jsx: true },
            },
          ],
        },
      ],
    },
    plugins: [
      new WebpackManifestPlugin(),
      new LoadablePlugin({ writeToDisk: true }),
      new DefinePlugin({
        'process.env': JSON.stringify(process.env),
        ...convertEnvVarsToDefinePluginDefinition(environmentVariables),
      }),
      new CspHtmlWebpackPlugin({
        'script-src': '',
        'style-src': '',
      }),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
    optimization: {
      splitChunks: {
        chunks: 'initial',
        minChunks: 1,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|redux|react-redux)[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            name: 'vendor',
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
            name: 'common',
          },
        },
      },
      chunkIds: isProduction ? 'deterministic' : 'named',
      moduleIds: isProduction ? 'deterministic' : 'named',
      emitOnErrors: false,
      ...(isProduction && {
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              sourceMap: true,
              compress: {
                drop_console: true,
              },
            },
          }),
        ],
      }),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    devtool: isProduction ? 'cheap-source-map' : false,
    performance: {
      maxAssetSize: 500000, // in bytes
      hints: false,
    },
  };
}
