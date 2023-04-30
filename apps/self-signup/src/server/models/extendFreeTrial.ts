import axios from 'axios';
import retrieveAuthToken from './retrieveAuthToken';
import {
  getECMSApiUrl,
  getECMSCSDefaultSiteId,
  getECMSRequiredHeaders,
} from '../../lib/utils/getECMSApiUrl';
import { ExtendFreeTrialRequestDto } from './freeTrialExpiredResponseDto';
import { ApiResponseDto } from './apiResponseDto';

export default async function extendFreeTrial(data: ExtendFreeTrialRequestDto) {
  const { accessToken } = await retrieveAuthToken();
  const config = {
    headers: getECMSRequiredHeaders(getECMSCSDefaultSiteId(), accessToken),
  };

  const response: ApiResponseDto = await axios.post(
    getECMSApiUrl('/accounts/extendTrialPeriod'),
    data,
    config
  );
  return response.wasSuccessful;
}
