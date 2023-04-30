import React from 'react';
import { render, screen } from '@testing-library/react';
import Link from './Link';
import { MemoryRouter } from 'react-router';

describe('Link', () => {
  test('it should render as an anchor element with target set', () => {
    render(
      <MemoryRouter>
        <Link to="https://www.alcumus.com" target="_blank" rel="noreferrer">
          Alcumus
        </Link>
      </MemoryRouter>
    );
    expect(screen.getByText(/Alcumus/).nodeName).toBe('A');
  });

  test('it should render as a Link component', () => {
    render(
      <MemoryRouter>
        <Link to="/login" replace>
          Login
        </Link>
      </MemoryRouter>
    );
    expect(screen.getByText(/Login/).nodeName).toBe('A');
  });
});
