import qs from 'querystring';
import { SubscriptionDto } from '../../types/subscriptionDto';

export async function getWelcomeToPaidPlansIframeUri(
  accountHolderName: string,
  subscription: SubscriptionDto
) {
  const maxSeats = subscription.price.plan?.maxSeats;
  const seatsAvailable = maxSeats ? maxSeats - subscription.seats : '';

  const params = qs.stringify({
    activeSeats: subscription.seats,
    seatsAvailable,
    accountHolderName: accountHolderName,
    planName: subscription.price?.plan?.name,
    nextPaymentDate: subscription.nextPaymentDate?.toString(),
  });
  return `/iframe/banners/welcomeToPaidPlans?${params}`;
}
