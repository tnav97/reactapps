const baseConfig = require('./jest.config.base');

module.exports = {
  ...baseConfig,
  projects: [
    '<rootDir>/packages/*/jest.config.js',
    '<rootDir>/apps/*/jest.config.js',
  ],
  roots: ['<rootDir>/packages', '<rootDir>/apps'],
  collectCoverageFrom: [
    'packages/**/*.{js,jsx,ts,tsx}',
    'apps/**/*.{js,jsx,ts,tsx}',
  ],
  moduleDirectories: ['node_modules'],
};
