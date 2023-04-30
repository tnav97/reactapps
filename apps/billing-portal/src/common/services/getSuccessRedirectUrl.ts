import axios from 'axios';

export default async function getSuccessRedirectUrl(): Promise<string> {
  return (await axios.get('/api/getSuccessRedirectUrl')).data;
}
