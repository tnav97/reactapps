const path = require('path');

module.exports = {
  projects: ['<rootDir>/jest.jsdom.config.js', '<rootDir>/jest.node.config.js'],
  coverageThreshold: {
    global: { functions: 80, lines: 80, statements: 80, branches: 80 },
  },
  coverageDirectory: path.join(__dirname, 'test-coverage-report'),
};
