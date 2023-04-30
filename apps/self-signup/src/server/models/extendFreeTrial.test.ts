import { AxiosResponse } from 'axios';
import { getMockedAxios } from '../../testUtils.node';
import extendFreeTrail from './extendFreeTrial';
import { ExtendFreeTrialRequestDto } from './freeTrialExpiredResponseDto';

const mockedAxios = getMockedAxios();
describe('extendFreeTrail tests', () => {
  it('passes params', async () => {
    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: {
        wasSuccessful: true,
      },
    } as AxiosResponse);

    const requestData: ExtendFreeTrialRequestDto = {
      invitationCode: 'email@example.com',
      duration: 7,
    };

    await extendFreeTrail(requestData);
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post.mock.calls[0][0]).toContain(
      '/accounts/extendTrialPeriod'
    );
    expect(mockedAxios.post.mock.calls[0][1]).toEqual(requestData);
  });
});
