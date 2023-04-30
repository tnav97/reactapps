import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from './Message';

describe('Message', () => {
  test('it should render', () => {
    render(
      <Message
        messageFromApi="Hello World!"
        isFetching={false}
        error={undefined}
        getApiMessage={() => {}}
      />
    );
    expect(screen.getByText(/Hello World/)).toBeInTheDocument();
  });
});
