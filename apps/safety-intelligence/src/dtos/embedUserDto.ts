import { AccessLevelTypes } from '../domain/accessLevelTypes';
import { CredentialEmbedDto } from './credentialEmbedDto';

export class EmbedUserDto {
  id: number;
  firstName: string;
  lastName: string;
  embedGroupSpaceId: string;
  homeFolderId: string;
  personalFolderId: string;
  credentialEmbed: CredentialEmbedDto;
  credentialEmail: string;
  accessLevel: AccessLevelTypes;
  externalGroupId: string;
  applicationRootFolderName: string;
  embedHostWithScheme: string;
  applicationRootFolderId: number;
  organizationName: string;

  constructor(dto: any) {
    this.id = dto.id;
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.embedGroupSpaceId = dto.embedGroupSpaceId;
    this.homeFolderId = dto.homeFolderId;
    this.personalFolderId = dto.personalFolderId;
    this.credentialEmbed = dto.credentialEmbed;
    this.credentialEmail = dto.credentialEmail;
    this.accessLevel = dto.accessLevel;
    this.externalGroupId = dto.externalGroupId;
    this.applicationRootFolderName = dto.applicationRootFolderName;
    this.embedHostWithScheme = dto.embedHostWithScheme;
    this.applicationRootFolderId = dto.applicationRootFolderId;
    this.organizationName = dto.organizationName;
  }
}
