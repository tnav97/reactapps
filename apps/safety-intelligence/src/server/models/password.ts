import { Utilities } from '@alcumus/core';

export async function updatePassword(
  userId: number,
  accessToken: string,
  newPassword: string,
  oldPassword: string
) {
  const axiosInstance = Utilities.getAxiosInstance();
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  await axiosInstance.patch(
    Utilities.getApiUrl(`/users/api/v1/users/${userId}/accounts`),
    {
      newPassword,
      oldPassword,
    },
    config
  );
}
