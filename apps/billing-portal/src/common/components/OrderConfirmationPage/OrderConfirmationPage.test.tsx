// @ts-ignore
import React from 'react';
import OrderConfirmationPage from './OrderConfirmationPage';
import { render, screen } from '@testing-library/react';
import getSuccessRedirectUrl from '../../services/getSuccessRedirectUrl';

jest.mock('../../services/getSuccessRedirectUrl');

const mockedGetSuccessRedirectUrl =
  getSuccessRedirectUrl as jest.MockedFunction<typeof getSuccessRedirectUrl>;

const redirectUrl = 'testing';

describe('OrderConfirmationPage tests', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    mockedGetSuccessRedirectUrl.mockResolvedValue(redirectUrl);
    window.location.assign = jest.fn();
  });

  test('it renders', () => {
    render(<OrderConfirmationPage tReady={true} t={(x: string) => x} />);
    const img = screen.getByTestId('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/order-confirmation.svg');
  });

  test('it redirects', async () => {
    render(<OrderConfirmationPage tReady={true} t={(x: string) => x} />);
    jest.runAllTimers();

    // https://stackoverflow.com/questions/44741102/how-to-make-jest-wait-for-all-asynchronous-code-to-finish-execution-before-expec
    // https://github.com/facebook/jest/issues/10221#issuecomment-654687396
    await Promise.resolve().then(() => jest.advanceTimersByTime(3000));

    expect(mockedGetSuccessRedirectUrl).toHaveBeenCalled();
    expect(window.location.assign).toHaveBeenCalledWith(redirectUrl);
  });
});
