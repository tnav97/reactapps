const path = require('path');
const JestConfig = require('../../jest.config.base');

const { projects, ...baseConfig } = JestConfig;

module.exports = {
  ...baseConfig,
  displayName: 'safety-intelligence',
  rootDir: './src',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  globals: {
    NODE_ENV: 'test',
  },
  testEnvironment: 'jsdom',
  clearMocks: true,
  verbose: true,
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
