import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Toast, { showToastState } from './Toast';

describe('Toast', () => {
  test('it should render success toast', () => {
    const initializeState = ({ set }: any) => {
      set(showToastState, {
        showToast: true,
        severity: 'success',
        message: 'success msg',
      });
    };

    render(
      <RecoilRoot initializeState={initializeState}>
        <Toast />
      </RecoilRoot>
    );
    expect(screen.getByText(/success msg/)).toBeInTheDocument();
    expect(screen.getByTestId('CheckCircleIcon')).toBeInTheDocument();
  });

  test('it should render error toast', () => {
    const initializeState = ({ set }: any) => {
      set(showToastState, {
        showToast: true,
        severity: 'error',
        message: 'failure msg',
      });
    };

    render(
      <RecoilRoot initializeState={initializeState}>
        <Toast />
      </RecoilRoot>
    );
    expect(screen.getByText(/failure msg/)).toBeInTheDocument();
    expect(screen.getByTestId('ErrorOutlineOutlinedIcon')).toBeInTheDocument();
  });
});
