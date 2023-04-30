import axios, { AxiosResponse } from 'axios';
import retrieveAuthToken from './retrieveAuthToken';
import {
  getECMSApiUrl,
  getECMSCSDefaultSiteId,
  getECMSRequiredHeaders,
} from '../../lib/utils/getECMSApiUrl';
import {
  TrialAccountResponse,
  TrialAccountStatus,
} from '../../common/types/trialAccountStatus';

export default async function retrieveTrialAccountDetails(
  invitationCode: string
): Promise<TrialAccountStatus> {
  const { accessToken } = await retrieveAuthToken();
  const config = {
    headers: getECMSRequiredHeaders(getECMSCSDefaultSiteId(), accessToken),
  };

  const response: AxiosResponse<TrialAccountResponse> = await axios.get(
    getECMSApiUrl(`/accounts/details/?invitationCode=${invitationCode}`),
    config
  );
  const { trialPeriod } = response.data;
  return {
    isActive: trialPeriod.isActive,
    hasBeenExtended: trialPeriod.hasBeenExtended,
    expired: new Date(trialPeriod.endDate).getTime() < new Date().getTime(),
    salesContacted: response.data.numberOfSalesCallsInitiated > 0,
    contactEmail: response.data.contactEmail,
  };
}
