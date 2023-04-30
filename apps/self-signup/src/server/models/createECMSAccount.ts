import Axios from 'axios';
import retrieveAuthToken from './retrieveAuthToken';
import { RegisterFormData } from '../../client/redux/reducers/register-reducer';
import { mapFormToAccountCreationRequestDto } from './mapFormToAccountCreationRequestDto';
import {
  getECMSApiUrl,
  getECMSCSDefaultSiteId,
  getECMSRequiredHeaders,
} from '../../lib/utils/getECMSApiUrl';

export default async function createECMSAccount(
  form: RegisterFormData,
  externalBillingAccountId?: string
) {
  const { accessToken } = await retrieveAuthToken();

  const config = {
    headers: getECMSRequiredHeaders(getECMSCSDefaultSiteId(), accessToken),
  };

  const response = await Axios.post(
    getECMSApiUrl('/accounts'),
    mapFormToAccountCreationRequestDto(form, externalBillingAccountId),
    config
  );

  return response.data;
}
