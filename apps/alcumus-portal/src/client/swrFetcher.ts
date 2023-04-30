import axios from 'axios';

export async function swrFetcher(url) {
  const { data } = await axios.get(url);

  return data;
}
