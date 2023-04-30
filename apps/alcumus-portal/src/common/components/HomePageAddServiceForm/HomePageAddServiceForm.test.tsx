import React from 'react';
import { render, screen } from '@testing-library/react';
import { StyleVariables } from '@alcumus/components';
import HomePageAddServiceForm from './HomePageAddServiceForm';

describe('HomePageAddServiceForm', () => {
  test('it should render 3 sections', () => {
    render(
      <HomePageAddServiceForm
        imageUrl=""
        title="Foo"
        content="Lorem ipsum"
        color={StyleVariables.colors.base.primary}
      />
    );

    expect(screen.getByText(/Foo/)).toBeInTheDocument();
    expect(screen.getByText(/Lorem ipsum/)).toBeInTheDocument();
    expect(screen.getByTestId('nameInput')).toBeInTheDocument();
    expect(screen.getByTestId('emailInput')).toBeInTheDocument();
    expect(screen.getByTestId('messageInput')).toBeInTheDocument();
    expect(screen.getByText(/Send Inquiry/)).toBeInTheDocument();
  });
});
