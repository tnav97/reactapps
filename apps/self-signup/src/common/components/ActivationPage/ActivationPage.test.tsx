import React from 'react';
import { render, screen } from '@testing-library/react';
import ActivationPage from './index';
import axios from 'axios';
import _ from 'lodash';

jest.mock('axios');

describe('Activation Page', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');

    (axios as jest.Mocked<typeof axios>).post.mockImplementation(
      async (url: string, data: any) => {
        if (url === '/api/activateAccount') {
          if (data.invitationCode == 'valid') {
            return {
              data: {
                redirectUrl: 'https://test.com',
              },
            };
          } else {
            throw new Error('Invalid invitation code');
          }
        }
      }
    );
  });

  test('it should render', () => {
    window.location.search = '?invitationCode=valid';
    render(<ActivationPage />);
    expect(screen.getByAltText(/logoAltText/)).toBeInTheDocument();
  });

  test('it should capture invitation code from query params', () => {
    window.location.search = '?invitationCode=valid';
    window.location.assign = jest.fn();

    render(<ActivationPage />);

    jest.runAllTimers();

    expect(window.location.assign).toBeCalledWith('https://test.com');
  });
});
