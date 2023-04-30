const path = require('path');
const JestConfig = require('../../jest.config.base');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { projects, ...baseConfig } = JestConfig;

module.exports = {
  ...baseConfig,
  displayName: 'self-signup',
  rootDir: './src',
  globals: {
    NODE_ENV: 'test',
  },
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    path.join(__dirname, 'build'),
    path.join(__dirname, 'build-static'),
  ],
  testMatch: [path.join(__dirname, 'src/server/**/*.test.ts')],
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.node.ts'],
  timers: 'fake',
};
