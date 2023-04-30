import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from './Image';

const TEST_IMAGE =
  'https://coredevuksstorage01.z33.web.core.windows.net/alcumus-logo.svg';

describe('Image', () => {
  test('it should render image by default', () => {
    render(<Image data-testid="image" src={TEST_IMAGE} alt="Test image" />);
    expect(screen.getByTestId('image').getAttribute('src')).toBe(TEST_IMAGE);
  });

  test('it should render empty image with lazy loading turned on', () => {
    render(<Image data-testid="image" src={TEST_IMAGE} alt="Big image" lazy />);
    expect(screen.getByTestId('image').getAttribute('src')).toBe('');
  });
});
