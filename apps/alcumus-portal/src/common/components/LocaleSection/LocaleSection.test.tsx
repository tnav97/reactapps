import React from 'react';
import { render, screen } from '@testing-library/react';
import { LocaleSection } from './LocaleSection';

describe('component/AboutSection', () => {
  test('it renders', () => {
    render(<LocaleSection t={(x) => x} />);

    expect(screen.getByTestId('country')).toHaveTextContent('N/A');
    expect(screen.getByTestId('language')).toHaveTextContent('N/A');
    expect(screen.getByTestId('timezone')).toHaveTextContent('N/A');
  });
});
