import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar, { NavbarProps } from './Navbar';

describe('Navbar Component', () => {
  test('it should render', () => {
    const props: NavbarProps = {
      withLoginButton: true,
    };
    render(<Navbar {...props} />);
    expect(screen.getByTestId(/alcumusLogo/)).toBeInTheDocument();
  });

  test('it should render with login button', () => {
    const props: NavbarProps = {
      withLoginButton: true,
    };
    render(<Navbar {...props} />);

    expect(screen.getByText(/Log In/)).toBeInTheDocument();
  });

  test('it should render without login button', () => {
    const props: NavbarProps = {
      withLoginButton: false,
    };
    render(<Navbar {...props} />);

    expect(() => screen.getByText(/Log In/)).toThrow();
  });
});
