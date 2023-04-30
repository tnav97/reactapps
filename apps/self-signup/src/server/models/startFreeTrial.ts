import axios from 'axios';
import retrieveAuthToken from './retrieveAuthToken';
import {
  getECMSApiUrl,
  getECMSCSDefaultSiteId,
  getECMSRequiredHeaders,
} from '../../lib/utils/getECMSApiUrl';
import { RegisterFormData } from '../../client/redux/reducers/register-reducer';
import { mapFormToStartFreeTrialRequestDto } from './mapFormToStartFreeTrialRequestDto';

export default async function startFreeTrial(form: RegisterFormData) {
  const { accessToken } = await retrieveAuthToken();
  const config = {
    headers: getECMSRequiredHeaders(getECMSCSDefaultSiteId(), accessToken),
  };

  await axios.post(
    getECMSApiUrl('/accounts/startFreeTrial'),
    mapFormToStartFreeTrialRequestDto(form),
    config
  );

  return true;
}
