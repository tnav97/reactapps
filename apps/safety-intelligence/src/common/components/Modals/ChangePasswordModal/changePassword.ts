import axios from 'axios';

export async function postNewPassword(
  newPassword: string,
  oldPassword: string
) {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('could not get access token');
  await axios.post(
    '/api/password',
    {
      newPassword,
      oldPassword,
    },
    {
      headers: {
        'x-access-token': accessToken,
      },
    }
  );
}
