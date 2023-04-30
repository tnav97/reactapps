import axios from 'axios';

export async function createSubscription(data: {
  applicationId: number;
  seats: number;
  startDate: string;
  endDate: string;
}) {
  await axios.post('/api/organizations/subscriptions', data);
}
