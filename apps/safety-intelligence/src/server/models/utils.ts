import { AccessLevelTypes } from '../../domain/accessLevelTypes';
import { EmbedUserDto } from '../../dtos/embedUserDto';

export const setHeaderConfig = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      applicationKey: localStorage.getItem('application_id')?.toLowerCase(),
    },
  };

  return config;
};

export const removeLocalStorageItems = () => {
  localStorage.removeItem('expiresIn');
  localStorage.removeItem('application_id');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user_external_id');
  localStorage.removeItem('user_external_group_id');
  localStorage.removeItem('user_first_name');
  localStorage.removeItem('user_last_name');
  localStorage.removeItem('home_folder_id');
  localStorage.removeItem('application_root_folder_name');
  localStorage.removeItem('personal_folder_id');
  localStorage.removeItem('group_space_id');
  localStorage.removeItem('embed_host');
  localStorage.removeItem('user_is_editor');
  localStorage.removeItem('application_root_folder_id');
  localStorage.removeItem('user_id');
  localStorage.removeItem('organization_name');
  localStorage.removeItem('showUpdatePasswordButton');
};

export const setLocalStorageItems = (embedUserDto: EmbedUserDto) => {
  localStorage.setItem(
    'user_external_id',
    embedUserDto.credentialEmbed[0].lookerUserId
  );
  localStorage.setItem(
    'user_external_group_id',
    embedUserDto.credentialEmbed[0].lookerOrgId
  );
  localStorage.setItem('user_first_name', embedUserDto.firstName);
  localStorage.setItem('user_last_name', embedUserDto.lastName);
  localStorage.setItem('home_folder_id', embedUserDto.homeFolderId);
  localStorage.setItem(
    'application_root_folder_name',
    embedUserDto.applicationRootFolderName
  );
  localStorage.setItem('personal_folder_id', embedUserDto.personalFolderId);
  localStorage.setItem('group_space_id', embedUserDto.embedGroupSpaceId);
  localStorage.setItem('embed_host', embedUserDto.embedHostWithScheme);
  localStorage.setItem(
    'user_is_editor',
    (embedUserDto.accessLevel === AccessLevelTypes.Editor).toString()
  );
  localStorage.setItem(
    'application_root_folder_id',
    embedUserDto.applicationRootFolderId.toString()
  );
  localStorage.setItem('user_id', embedUserDto.id.toString());
  localStorage.setItem('organization_name', embedUserDto.organizationName);
};
