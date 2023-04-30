import Axios, { AxiosError } from 'axios';
import retrieveAuthToken from './retrieveAuthToken';
import {
  getECMSApiUrl,
  getECMSCSDefaultSiteId,
  getECMSRequiredHeaders,
  getECMSWebUrl,
} from '../../lib/utils/getECMSApiUrl';

export default async function activateAccount(invitationCode: string) {
  const { accessToken } = await retrieveAuthToken();

  const config = {
    headers: getECMSRequiredHeaders(getECMSCSDefaultSiteId(), accessToken),
  };

  try {
    const {
      data: { data },
    } = await Axios.post(
      getECMSApiUrl('/accounts/activate') + `?invitationCode=${invitationCode}`,
      {},
      config
    );

    return {
      redirectUrl: data,
    };
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400 && !data.wasSuccessful) {
        console.error('Error activating account', error);
        return {
          redirectUrl: getECMSWebUrl('/Login'),
        };
      } else {
        throw err;
      }
    } else {
      throw err;
    }
  }
}
