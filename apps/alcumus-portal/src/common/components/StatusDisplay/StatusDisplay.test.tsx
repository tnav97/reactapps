import React from 'react';
import StatusDisplay from './index';
import { render, screen } from '@testing-library/react';
import { MemberStatus } from '../../constants';

describe('components / StatusDisplay', () => {
  test('it renders active status', async () => {
    const status = MemberStatus.ACTIVE;
    render(<StatusDisplay status={status} />);

    expect(await screen.findByTestId(`${status}-text`)).toBeInTheDocument();
    expect(await screen.findByTestId('check')).toBeInTheDocument();
  });

  test('it renders invited status', async () => {
    const status = MemberStatus.PENDING_ACCEPTANCE;
    render(<StatusDisplay status={status} />);

    expect(await screen.findByTestId(`${status}-text`)).toBeInTheDocument();
    expect(await screen.findByTestId('mail')).toBeInTheDocument();
  });

  test('it renders disabled status', async () => {
    const status = MemberStatus.DISABLED;
    render(<StatusDisplay status={status} />);

    expect(await screen.findByTestId(`${status}-text`)).toBeInTheDocument();
    expect(await screen.findByTestId('do_disturb')).toBeInTheDocument();
  });

  test('it renders pending status', async () => {
    const status = MemberStatus.PENDING_INVITE;
    render(<StatusDisplay status={status} />);

    expect(await screen.findByTestId(`${status}-text`)).toBeInTheDocument();
    expect(await screen.findByTestId('hourglass_empty')).toBeInTheDocument();
  });

  test('it renders canceled status', async () => {
    const status = MemberStatus.CANCELED;
    render(<StatusDisplay status={status} />);

    expect(await screen.findByTestId(`${status}-text`)).toBeInTheDocument();
    expect(await screen.findByTestId('cancel')).toBeInTheDocument();
  });

  test('it renders expired status', async () => {
    const status = MemberStatus.INVITE_EXPIRED;
    render(<StatusDisplay status={status} />);

    expect(await screen.findByTestId(`${status}-text`)).toBeInTheDocument();
    expect(await screen.findByTestId('access_time')).toBeInTheDocument();
  });
});
