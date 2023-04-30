import axios from 'axios';
import { getPlans } from './productPlans';
import { getBillingServiceApiUrl } from '../../../lib/utils/billingServiceApi';

jest.mock('axios');
jest.mock('../../../lib/utils/billingServiceApi');

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue([1, 2, 3]);

const mockedGetBillingServiceApiUrl =
  getBillingServiceApiUrl as jest.MockedFunction<
    typeof getBillingServiceApiUrl
  >;
mockedGetBillingServiceApiUrl.mockImplementation(
  (path: string) => `http://services.billing-service.ca${path}`
);
describe('productPlans tests', () => {
  test('it calls api', () => {
    getPlans();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      'http://services.billing-service.ca/plans',
      { headers: { 'x-api-key': undefined } }
    );
  });
});
