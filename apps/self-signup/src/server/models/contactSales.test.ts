import { AxiosResponse } from 'axios';
import { getMockedAxios } from '../../testUtils.node';
import contactSales from './contactSales';

const mockedAxios = getMockedAxios();
describe('extendFreeTrail tests', () => {
  it('passes profileId', async () => {
    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: {
        wasSuccessful: true,
      },
    } as AxiosResponse);

    const invitationCode = 'invitationCode';
    await contactSales(invitationCode);
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post.mock.calls[0][0]).toContain(
      '/accounts/generateSubscriptionEmail'
    );
    expect(mockedAxios.post.mock.calls[0][1]).toEqual({ invitationCode });
  });
});
