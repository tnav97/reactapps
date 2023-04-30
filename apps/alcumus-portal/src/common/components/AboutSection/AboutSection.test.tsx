import { render, screen } from '@testing-library/react';
import AboutSection, { dataTestIds } from './AboutSection';
import React from 'react';

describe('component/AboutSection', () => {
  test('it renders', () => {
    render(<AboutSection t={(x) => x} />);

    expect(screen.getByTestId(dataTestIds.tosLink)).toBeInTheDocument();
    expect(
      screen.getByTestId(dataTestIds.privacyPolicyLink)
    ).toBeInTheDocument();
    expect(screen.getByTestId(dataTestIds.body)).toBeInTheDocument();
  });
});
