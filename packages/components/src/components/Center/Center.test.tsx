import React from 'react';
import { render, screen } from '@testing-library/react';
import Center from './Center';

describe('Center', () => {
  test('it should render content', () => {
    render(
      <Center>
        <h1>Hello</h1>
        <h3>Foo</h3>
      </Center>
    );

    expect(screen.getByText(/Hello/)).toBeInTheDocument();
    expect(screen.getByText(/Foo/)).toBeInTheDocument();
  });
});
