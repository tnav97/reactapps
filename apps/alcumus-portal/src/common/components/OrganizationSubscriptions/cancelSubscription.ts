import axios from 'axios';
import { SubscriptionStatus } from '../../types';

export async function cancelSubscription(subscriptionId: number) {
  await axios.patch(`/api/subscriptions/${subscriptionId}/status`, {
    subscriptionStatus: SubscriptionStatus.Cancelled,
  });
}
