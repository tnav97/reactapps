const path = require('path');
const JestConfig = require('../../jest.config.base');

const { projects, ...baseConfig } = JestConfig;

module.exports = {
  ...baseConfig,
  projects: [
    {
      displayName: 'component tests',
      testEnvironment: 'jsdom',
      testMatch: ['**/src/**/*.test.ts', '**/src/**/*.test.tsx'],
      setupFilesAfterEnv: [path.join(__dirname, 'src/setupTests.ts')],
      moduleDirectories: ['node_modules', 'src'],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
      globals: {
        NODE_ENV: 'test',
      },
      clearMocks: true,
      verbose: true,
      coveragePathIgnorePatterns: [
        '/node_modules/',
        path.join(__dirname, 'build'),
        path.join(__dirname, 'build-static'),
      ],
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    },
    {
      displayName: 'server tests',
      testEnvironment: 'node',
      testMatch: ['**/tests/**/*.test.ts'],
      moduleDirectories: ['node_modules', 'src'],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
      globals: {
        NODE_ENV: 'test',
      },
      clearMocks: true,
      verbose: true,
      coveragePathIgnorePatterns: [
        '/node_modules/',
        path.join(__dirname, 'build'),
        path.join(__dirname, 'build-static'),
      ],
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    },
  ],
};
