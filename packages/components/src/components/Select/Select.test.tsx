import React from 'react';
import { render, screen } from '@testing-library/react';
import Select, { Item } from './Select';

describe('Select tests', () => {
  const items: Array<Item> = [
    { id: 'monthly', name: 'monthly' },
    { name: 'yearly', id: 'yearly' },
  ];

  test('it renders', () => {
    render(<Select items={items} label="label" value={'monthly'} />);
    expect(screen.getByTestId('baseSelect')).toBeInTheDocument();
  });

  test('it renders multiple select', () => {
    // Testing MaterialUI selects isn't easy
    // https://github.com/testing-library/react-testing-library/issues/322
    render(<Select items={items} label="label" multiple value={['monthly']} />);
    expect(screen.getByTestId('baseSelect')).toBeInTheDocument();
  });
});
