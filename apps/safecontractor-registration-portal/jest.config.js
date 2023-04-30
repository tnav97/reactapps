const path = require('path');
const JestConfig = require('../../jest.config.base');

const { projects, ...baseConfig } = JestConfig;

module.exports = {
  ...baseConfig,
  displayName: 'safecontractor-registration-portal',
  rootDir: './src',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    NODE_ENV: 'test',
  },
  clearMocks: true,
  verbose: true,
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    path.join(__dirname, 'build'),
    path.join(__dirname, 'build-static'),
  ],
  testMatch: [
    path.join(__dirname, 'src/**/*.test.ts'),
    path.join(__dirname, 'src/**/*.test.tsx'),
  ],
  rootDir: './src',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
