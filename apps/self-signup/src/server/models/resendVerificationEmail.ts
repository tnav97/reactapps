import axios from 'axios';
import retrieveAuthToken from './retrieveAuthToken';
import {
  getECMSApiUrl,
  getECMSCSDefaultSiteId,
  getECMSRequiredHeaders,
} from '../../lib/utils/getECMSApiUrl';

export default async function resendVerificationEmail({
  employeeProfileId,
  organizationId,
}: {
  employeeProfileId: string;
  organizationId: string;
}): Promise<Boolean> {
  const { accessToken } = await retrieveAuthToken();
  const config = {
    headers: getECMSRequiredHeaders(getECMSCSDefaultSiteId(), accessToken),
  };

  await axios.post(
    getECMSApiUrl('/accounts/resendVerificationEmail'),
    { organizationId, employeeProfileId },
    config
  );

  return true;
}
