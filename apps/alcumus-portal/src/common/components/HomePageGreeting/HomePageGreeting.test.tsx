import React from 'react';
import { render, screen } from '@testing-library/react';
import Greeting from './HomePageGreeting';

const user = { firstName: 'foo', lastName: 'bar', email: 'foo@bar.baz' };

describe('HomePageGreeting', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('it should render generalized greeting from 12AM to 6AM', () => {
    jest.setSystemTime(new Date(2021, 7, 6, 24, 0, 0));
    render(<Greeting user={user} />);
    expect(screen.getByText(/welcome, foo bar/)).toBeInTheDocument();
  });

  test('it should render morning greeting between 6AM and 12PM', () => {
    jest.setSystemTime(new Date(2021, 7, 6, 7, 0, 0));
    render(<Greeting user={user} />);
    expect(screen.getByText(/morning, foo bar/)).toBeInTheDocument();
  });

  test('it should render afternoon greeting between 12PM and 5PM', () => {
    jest.setSystemTime(new Date(2021, 7, 6, 12, 0, 0));
    render(<Greeting user={user} />);
    expect(screen.getByText(/afternoon, foo bar/)).toBeInTheDocument();
  });

  test('it should render evening greeting between 5PM and 12AM', () => {
    jest.setSystemTime(new Date(2021, 7, 6, 18, 0, 0));
    render(<Greeting user={user} />);
    expect(screen.getByText(/evening, foo bar/)).toBeInTheDocument();
  });

  test('it should render with email if no name set on profile', () => {
    jest.setSystemTime(new Date(2021, 7, 6, 18, 0, 0));
    render(<Greeting user={{ email: 'foo@bar.baz' }} />);
    expect(screen.getByText(/evening, foo@bar.baz/)).toBeInTheDocument();
  });
});
