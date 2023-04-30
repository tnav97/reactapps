import axios from 'axios';
import retrieveAuthToken from './retrieveAuthToken';
import {
  getECMSApiUrl,
  getECMSCSDefaultSiteId,
  getECMSRequiredHeaders,
} from '../../lib/utils/getECMSApiUrl';
import { ApiResponseDto } from './apiResponseDto';

export default async function contactSales(invitationCode: string) {
  const { accessToken } = await retrieveAuthToken();
  const config = {
    headers: getECMSRequiredHeaders(getECMSCSDefaultSiteId(), accessToken),
  };

  const response: ApiResponseDto = await axios.post(
    getECMSApiUrl('/accounts/generateSubscriptionEmail'),
    { invitationCode: invitationCode },
    config
  );
  return response.wasSuccessful;
}
