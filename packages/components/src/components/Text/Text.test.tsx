import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from './Text';

describe('Text', () => {
  test('it should render content', () => {
    render(
      <>
        <Text as="h1" data-testid="h1">
          Hello
        </Text>
        <Text as="h2" data-testid="h2">
          Hello
        </Text>
        <Text as="h3" data-testid="h3">
          Hello
        </Text>
        <Text as="h4" data-testid="h4">
          Hello
        </Text>
        <Text as="h5" data-testid="h5">
          Hello
        </Text>
        <Text as="h6" data-testid="h6">
          Hello
        </Text>
        <Text as="p" data-testid="p">
          Hello
        </Text>
        <Text as="small" data-testid="small">
          Hello
        </Text>
        <Text as="strong" data-testid="strong">
          Hello
        </Text>
        <Text as="span" data-testid="span">
          Hello
        </Text>
        <Text as="b" data-testid="b">
          Hello
        </Text>
        <Text as="i" data-testid="i">
          Hello
        </Text>
        <Text as="u" data-testid="u">
          Hello
        </Text>
        <Text uppercase data-testid="uppercase">
          Hello
        </Text>
        <Text center data-testid="center">
          Hello
        </Text>
      </>
    );
    expect(screen.getByTestId('h1').textContent).toBe('Hello');
    expect(screen.getByTestId('h2').textContent).toBe('Hello');
    expect(screen.getByTestId('h3').textContent).toBe('Hello');
    expect(screen.getByTestId('h4').textContent).toBe('Hello');
    expect(screen.getByTestId('h5').textContent).toBe('Hello');
    expect(screen.getByTestId('h6').textContent).toBe('Hello');
    expect(screen.getByTestId('p').textContent).toBe('Hello');
    expect(screen.getByTestId('small').textContent).toBe('Hello');
    expect(screen.getByTestId('strong').textContent).toBe('Hello');
    expect(screen.getByTestId('span').textContent).toBe('Hello');
    expect(screen.getByTestId('b').textContent).toBe('Hello');
    expect(screen.getByTestId('i').textContent).toBe('Hello');
    expect(screen.getByTestId('u').textContent).toBe('Hello');
    expect(screen.getByTestId('uppercase').textContent).toBe('Hello');
    expect(screen.getByTestId('center').textContent).toBe('Hello');
  });
});
