import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomModal from './CustomModal';

describe('Custom Modal', () => {
  test('it should render custom modal', () => {
    render(
      <CustomModal headerText="create modal" primaryButtonText="create" open />
    );
    expect(screen.getByText('create modal')).toBeInTheDocument();
    expect(screen.getByTestId('submitButton')).toHaveTextContent('create');
  });

  test('it should render critical button on danger', () => {
    render(
      <CustomModal
        headerText="delete modal"
        primaryButtonText="delete"
        open
        danger
      />
    );
    expect(screen.getByTestId('criticalButton')).toHaveTextContent('delete');
  });

  test('it should not show body on validation', () => {
    render(
      <CustomModal
        headerText="delete modal"
        primaryButtonText="delete"
        open
        isValidating
      >
        Test body
      </CustomModal>
    );
    expect(screen.queryByText('Test body')).toBeNull();
  });
});
