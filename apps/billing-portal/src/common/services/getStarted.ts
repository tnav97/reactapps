import axios from 'axios';

export default async function getStarted(
  priceId: string,
  seats: number
): Promise<{ url: string }> {
  return (await axios.post('/api/getStarted', { priceId, seats })).data;
}
