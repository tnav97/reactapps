import axios from 'axios';

export async function validateToken() {
  const { status } = await axios.get('/api/auth/validate');
  return status;
}
