import axios, { AxiosError } from 'axios';

export async function updateSubscriptionLicenses(licenses, subscriptionId) {
  try {
    await axios.patch(`/api/subscriptions/${subscriptionId}`, { licenses });
  } catch (e: any) {
    if (e.isAxiosError) {
      const err = e as AxiosError;

      if (err.response?.status === 400 || err.response?.status === 409) {
        throw new Error(err.response.data);
      }
    }
    throw e;
  }
}
