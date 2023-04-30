import axios from 'axios';
import { MemberWithUsername } from '../../types';

export async function getMembers(
  usernames: Array<String>
): Promise<Array<MemberWithUsername>> {
  const { data } = await axios.get<Array<MemberWithUsername>>(
    `/api/users/usernames?usernames=${usernames.join(',')}`
  );
  return data;
}
