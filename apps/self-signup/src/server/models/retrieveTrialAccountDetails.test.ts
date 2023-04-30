import { getMockedAxios } from '../../testUtils.node';
import { AxiosResponse } from 'axios';
import retrieveTrialAccountDetails from './retrieveTrialAccountDetails';
import { addDays } from 'date-fns';

const mockedAxios = getMockedAxios();

describe('retrieveTrialAccountDetails tests', () => {
  const invitationCode = 'invitationCode';
  const mockedResolvedAccountStatus: Partial<AxiosResponse> = {
    data: {
      numberOfSalesCallsInitiated: 1,
      contactEmail: 'email@domain.ca',
      trialPeriod: {
        startDate: 'Sept 10, 2021',
        isActive: true,
        endDate: 'Sept 20, 2021',
        hasBeenExtended: true,
        duration: 7,
      },
    },
  };

  test('returns isActive, contactEmail and hasBeenExtended as recieved from API call results', async () => {
    mockedAxios.get.mockResolvedValue(mockedResolvedAccountStatus);
    const result = await retrieveTrialAccountDetails(invitationCode);
    expect(result).toMatchObject({
      hasBeenExtended: true,
      isActive: true,
      contactEmail: 'email@domain.ca',
    });
  });

  test('returns a not expired account status when endDate is in the future', async () => {
    const tomorrow = addDays(new Date(), 1);
    mockedResolvedAccountStatus.data.trialPeriod.endDate =
      tomorrow.toLocaleDateString();

    mockedAxios.get.mockResolvedValue(mockedResolvedAccountStatus);
    const result = await retrieveTrialAccountDetails(invitationCode);

    expect(result).toMatchObject({
      expired: false,
    });
  });

  test('returns salesContacted set to false when numberOfSalesCallsInitiated is set to 0', async () => {
    mockedResolvedAccountStatus.data.numberOfSalesCallsInitiated = 0;
    mockedAxios.get.mockResolvedValue(mockedResolvedAccountStatus);
    const result = await retrieveTrialAccountDetails(invitationCode);

    expect(result).toMatchObject({
      salesContacted: false,
    });
  });
});
