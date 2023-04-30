import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom';
import '@testing-library/react';

beforeEach(() => {
  document.body.innerHTML = '';
});
