import '@testing-library/jest-dom';
import '@testing-library/react';
import '@testing-library/react/dont-cleanup-after-each';

beforeAll(() => {
  // Reassign window.location so that it can be mocked with jest
  // https://github.com/facebook/jest/issues/890#issuecomment-682286025

  // @ts-ignore
  const location = window.location;
  // @ts-ignore
  delete global.window.location;
  global.window.location = Object.assign({}, location);
});

beforeEach(() => {
  document.body.innerHTML = '';
});
