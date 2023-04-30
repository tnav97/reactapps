import { getAuthorizationHeader } from '../../lib/utils';
import { Types, Utilities } from '@alcumus/core';
import {
  MemberWithUsername,
  UpdateUserRequest,
  InviteUserRequest,
} from '../../common/types';
import { BadAxios } from '../utilities/badAxios';
import { AxiosResponse } from 'axios';

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  applicationLookupKeys?: string[];
  applicationIds?: number[];
  role?: string;
  accountType: string;
  sendInvite?: boolean;
}

interface PostApplicationsRequest {
  applicationLookupKeys?: string[];
  applicationIds?: number[];
}

export async function createUser(
  accessToken: string,
  organizationId: number,
  createUserDto: CreateUserDto
) {
  if (!createUserDto.role) {
    throw new Types.LocalizedError(400, 'Undefined role');
  }
  const usersResponse = await getPostMembersPromise<
    CreateUserDto & { roleId: string },
    MemberWithUsername & { message: string }
  >(
    {
      ...createUserDto,
      roleId: createUserDto.role,
    },
    accessToken,
    organizationId
  );

  if (usersResponse.status >= 400 && usersResponse.status < 500) {
    throw new Types.LocalizedError(
      usersResponse.status,
      usersResponse.data.message
    );
  }

  const user = usersResponse.data as MemberWithUsername;
  await getPostApplicationsPromise(
    {
      applicationLookupKeys: createUserDto.applicationLookupKeys,
      applicationIds: createUserDto.applicationIds,
    },
    accessToken,
    user.organizationMemberId
  );

  return { user, invitationLink: usersResponse.headers.location };
}

export async function inviteUser(
  accessToken: string,
  organizationId: number,
  inviteUsers: InviteUserRequest[]
): Promise<Array<MemberWithUsername>> {
  const getApplicationPromises = (
    inviteUsers: InviteUserRequest[],
    members: MemberWithUsername[]
  ): Array<Promise<AxiosResponse<{}>>> => {
    const result: Array<Promise<AxiosResponse<{}>>> = [];
    inviteUsers.forEach((inviteUser, index) => {
      if (inviteUser.applicationIds.length) {
        const member = members[index];
        result.push(
          getPostApplicationsPromise(
            {
              applicationIds: inviteUser.applicationIds,
            },
            accessToken,
            member.organizationMemberId
          )
        );
      }
    });
    return result;
  };
  const membersResponse = await Promise.all(
    inviteUsers.map((inviteUser) =>
      getPostMembersPromise<InviteUserRequest, MemberWithUsername>(
        inviteUser,
        accessToken,
        organizationId
      )
    )
  );

  await Promise.all(
    getApplicationPromises(
      inviteUsers,
      membersResponse.map((memberResponse) => memberResponse.data)
    )
  );
  return membersResponse.map((memberResponse) => memberResponse.data);
}

export async function updateUser(
  accessToken: string,
  organizationId: number,
  updateUserDto: UpdateUserRequest
) {
  const headers = getAuthorizationHeader(accessToken);
  const { data: updatedUser } = await BadAxios.sendAxiosPatchRequest(
    Utilities.getApiUrl(
      `/users/api/v2/organizations/${organizationId}/users/${updateUserDto.userId}`
    ),
    { ...updateUserDto, id: undefined, userId: undefined },
    headers
  );

  await Utilities.sendAxiosPostRequest(
    Utilities.getApiUrl(
      `/subscriptions/api/v1/members/${updateUserDto.organizationMemberId}/applications`
    ),
    {
      applicationIds: updateUserDto.applicationIds,
    },
    headers
  );

  return updatedUser;
}

export async function getUsernames(
  accessToken: string,
  usernames: string,
  organizationId: number
): Promise<Array<MemberWithUsername>> {
  const axiosInstance = Utilities.getServicesAxiosClient();

  const headers = getAuthorizationHeader(accessToken);

  const { data } = await axiosInstance.get<Array<MemberWithUsername>>(
    Utilities.getApiUrl(
      `/users/api/v2/members?filter[username]=${usernames}&filter[organizationId]=${organizationId}`
    ),
    {
      headers,
      validateStatus: (status: number) => status < 500,
    }
  );
  return data;
}

function getPostMembersPromise<T1, T2>(
  body: T1,
  accessToken: string,
  organizationId: number
) {
  return getPostPromise<T1, T2>(
    '/users/api/v2/members',
    accessToken,
    { ...body, organizationId },
    (status: number) => status < 500
  );
}

function getPostApplicationsPromise(
  body: PostApplicationsRequest,
  accessToken: string,
  organizationMemberId: number
) {
  return getPostPromise<PostApplicationsRequest, {}>(
    `/subscriptions/api/v1/members/${organizationMemberId}/applications`,
    accessToken,
    body
  );
}

function getPostPromise<T1, T2>(
  url: string,
  accessToken: string,
  body: T1,
  validateStatus?: (status: number) => boolean
) {
  const headers = getAuthorizationHeader(accessToken);
  return Utilities.getServicesAxiosClient().post<T1, AxiosResponse<T2>>(
    Utilities.getApiUrl(url),
    { ...body },
    { headers, validateStatus }
  );
}
