import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import ExpiredTrialPage from './ExpiredTrialPage';
import axios from 'axios';
import Analytics from '@alcumus/analytics-package';
import { FeatureToggles } from '../../constants/featureToggles';

jest.mock('axios');
jest.mock('@alcumus/analytics-package');
jest.mock('../../constants/featureToggles');

const emailAddress = 'abc.qwe@asd.asd';
const mockedFeatureToggles = FeatureToggles as jest.Mocked<
  typeof FeatureToggles
>;
const mockTrackWithCategory = jest.fn();
const mockTimeEvent = jest.fn();
const mockIdentify = jest.fn();
const MockedAnalytics = Analytics as jest.MockedClass<typeof Analytics>;
MockedAnalytics.getInstance = jest.fn().mockImplementation(() => {
  const item = new Analytics();
  return {
    trackWithCategory: mockTrackWithCategory,
    timeEvent: mockTimeEvent,
    identify: mockIdentify,
  };
});
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockResolvedValue({ data: {} });
const ExpiredTrialPageWithProps = () => (
  <ExpiredTrialPage t={(x: string) => x} tReady={true} />
);

const renderPrompt = async () => {
  mockedAxios.get.mockResolvedValueOnce({
    data: {
      isActive: true,
      hasBeenExtended: false,
      expired: false,
      salesContacted: false,
      contactEmail: emailAddress,
    },
  });
  await act(async () => {
    render(<ExpiredTrialPageWithProps />);
  });
};

const renderPostExtensionExpiryPrompt = async () => {
  mockedAxios.get.mockResolvedValueOnce({
    data: {
      isActive: true,
      hasBeenExtended: true,
      expired: true,
      salesContacted: false,
      contactEmail: emailAddress,
    },
  });
  await act(async () => {
    render(<ExpiredTrialPageWithProps />);
  });
};

describe('ExpiredTrialPage tests', () => {
  beforeEach(() => {
    MockedAnalytics.mockClear();
    mockTrackWithCategory.mockClear();
    mockTimeEvent.mockClear();
    mockIdentify.mockClear();
  });
  test('it redirects when account is not active', async () => {
    window.location.assign = jest.fn();
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        isActive: false,
        hasBeenExtended: false,
        expired: false,
        salesContacted: false,
        contactEmail: emailAddress,
      },
    });

    await render(<ExpiredTrialPageWithProps />);

    expect(window.location.assign).toBeCalledTimes(1);
    expect(window.location.assign).toBeCalledWith('/api/redirects/login');
  });

  test('it renders prompt screen and then salesWillContact page when contacting sales', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        isActive: true,
        hasBeenExtended: false,
        expired: false,
        salesContacted: false,
        contactEmail: emailAddress,
      },
    });
    await act(async () => {
      render(<ExpiredTrialPageWithProps />);
    });
    let img: HTMLImageElement;
    img = screen.getByTestId('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/expired_trial.svg');

    const contactSalesButton = screen.getByTestId('contactSalesButton');
    await act(async () => {
      fireEvent.click(contactSalesButton);
    });
    expect(screen.getByTestId('continueTrialButton')).toBeInTheDocument();
    img = screen.getByTestId('img');
    expect(img).toHaveAttribute('src', '/images/calendar.svg');
    expect(window.document.title).toBe('contactSales.header');
  });

  test('it renders extension expired prompt page when sales are not contacted yet', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        isActive: true,
        hasBeenExtended: true,
        expired: true,
        salesContacted: false,
        contactEmail: emailAddress,
      },
    });
    await act(async () => {
      render(<ExpiredTrialPageWithProps />);
    });
    const img = screen.getByTestId('img');
    expect(screen.getByTestId('contactSalesButton')).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/bench_with_safety_cap.svg');
    expect(window.document.title).toBe('trialExtensionEnded.header');
  });

  test('it renders already extended page when not expired and sales are not contacted', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        isActive: true,
        hasBeenExtended: true,
        expired: false,
        salesContacted: false,
        contactEmail: emailAddress,
      },
    });
    await act(async () => {
      render(<ExpiredTrialPageWithProps />);
    });
    const img = screen.getByTestId('img');
    expect(screen.getByTestId('continueTrialButton')).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/bench_with_safety_cap.svg');
    expect(window.document.title).toBe('alreadyExtended.header');
  });

  test('it renders prompt page when not extended is false', async () => {
    await renderPrompt();
    const img = screen.getByTestId('img');
    expect(screen.getByTestId('extendTrialButton')).toBeInTheDocument();
    expect(screen.getByTestId('contactSalesButton')).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/expired_trial.svg');
  });

  test('it calls identify on rendering', async () => {
    await renderPrompt();
    expect(mockIdentify).toHaveBeenCalledTimes(1);
    expect(mockIdentify).toHaveBeenLastCalledWith(emailAddress);
  });

  test('tracks clicks when clicking on contactSalesButton', async () => {
    await renderPrompt();
    await act(async () => {
      fireEvent.click(screen.getByTestId('contactSalesButton'));
    });
    expect(mockTrackWithCategory).toHaveBeenCalledTimes(1);
    expect(mockTrackWithCategory).toHaveBeenCalledWith(
      'Expired Free Trial',
      'Contact Sales selected'
    );
  });

  test('tracks clicks  when clicking on ExtendTrialButton', async () => {
    await renderPrompt();
    await act(async () => {
      fireEvent.click(screen.getByTestId('extendTrialButton'));
    });
    expect(mockTrackWithCategory).toHaveBeenCalledTimes(1);
    expect(mockTrackWithCategory).toHaveBeenCalledWith(
      'Expired Free Trial',
      'Extend Free Trial Selected'
    );
  });

  test('renders trial extended when clicking on ExtendTrialButton', async () => {
    await renderPrompt();
    await act(async () => {
      fireEvent.click(screen.getByTestId('extendTrialButton'));
    });
    expect(screen.getByTestId('continueTrialButton')).toBeInTheDocument();
    const img = screen.getByTestId('img');
    expect(img).toHaveAttribute('src', '/images/trial_extended.svg');
  });

  it('renders post extension expiry prompt', async () => {
    await renderPostExtensionExpiryPrompt();
    expect(screen.getByTestId('contactSalesButton')).toBeInTheDocument();
  });

  test('renders salesWillContact post extension expiry when contact sales is clicked', async () => {
    await renderPostExtensionExpiryPrompt();
    const contactSalesButton = screen.getByTestId('contactSalesButton');
    await act(async () => {
      fireEvent.click(contactSalesButton);
    });
    const img = screen.getByTestId('img');
    expect(img).toHaveAttribute('src', '/images/calendar.svg');
  });

  test('calls /api/contactSales and /api/extendFreeTrial when clicking on contactSalesButton', async () => {
    await renderPrompt();
    await act(async () => {
      fireEvent.click(screen.getByTestId('contactSalesButton'));
    });
    expect(mockedAxios.post).toHaveBeenCalledTimes(2);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/contactSales');
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/extendFreeTrial', {
      duration: 7,
    });
  });

  test('calls /api/extendFreeTrial when clicking on extendTrialButton', async () => {
    await renderPrompt();
    await act(async () => {
      fireEvent.click(screen.getByTestId('extendTrialButton'));
    });
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/extendFreeTrial', {
      duration: 7,
    });
  });

  test('it renders LoadingPage', () => {
    mockedAxios.get.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 2000);
        })
    );
    act(() => {
      render(<ExpiredTrialPageWithProps />);
    });
    expect(screen.getByTestId(/Logo/)).toBeInTheDocument();
  });

  test('it redirects to billing - portal', async () => {
    mockedFeatureToggles.showUpgradeCTAButton.mockImplementation(() => true);
    window.location.assign = jest.fn();
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        isActive: true,
        hasBeenExtended: false,
        expired: false,
        salesContacted: false,
        contactEmail: emailAddress,
      },
    });
    mockedAxios.post.mockResolvedValueOnce({
      data: 'url',
    });

    await act(async () => {
      await render(<ExpiredTrialPageWithProps />);
    });
    const upgradeButton = screen.getByTestId('upgradeButton');
    await act(async () => {
      fireEvent.click(upgradeButton);
    });
    expect(mockTrackWithCategory).toHaveBeenCalledTimes(1);
    expect(mockTrackWithCategory).toHaveBeenCalledWith(
      'Expired Free Trial',
      'Upgrade selected'
    );
    expect(window.location.assign).toBeCalledTimes(1);
    expect(window.location.assign).toBeCalledWith('url');
  });
});
