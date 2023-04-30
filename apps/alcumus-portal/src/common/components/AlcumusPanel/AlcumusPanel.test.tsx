import React from 'react';
import { render, screen } from '@testing-library/react';
import AlcumusPanel from './AlcumusPanel';

describe('AlcumusPanel', () => {
  test('it should render with logo and footer text by default', () => {
    render(
      <AlcumusPanel>
        <h1>Foo</h1>
      </AlcumusPanel>
    );

    expect(screen.getByTestId('alcumusLogo')).toBeDefined();
    expect(screen.getByText(/Foo/)).toBeInTheDocument();
    expect(screen.getByText(/termsAndConditions/)).toBeInTheDocument();
  });

  test('it should render with given title', () => {
    render(
      <AlcumusPanel title="Test Title">
        <h1>Foo</h1>
      </AlcumusPanel>
    );

    expect(screen.getByText(/Test Title/)).toBeInTheDocument();
  });

  test('it should render with footerContent', () => {
    render(
      <AlcumusPanel footerContent={<div>Footer content has rendered</div>}>
        <h1>Foo</h1>
      </AlcumusPanel>
    );

    expect(screen.getByText(/Footer content has rendered/)).toBeInTheDocument();
  });
});
