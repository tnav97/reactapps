export interface IBaseFolderDto {
  name: string;
  parentId: number;
  id: number;
  isPersonal: boolean;
  externalId: string;
}

export class BaseFolderDto implements IBaseFolderDto {
  name: string;
  parentId: number;
  id: number;
  externalId: string;
  isPersonal: boolean;

  constructor(baseFolderDto: IBaseFolderDto) {
    this.name = baseFolderDto.name;
    this.parentId = baseFolderDto.parentId;
    this.id = baseFolderDto.id;
    this.externalId = baseFolderDto.externalId;
    this.isPersonal = baseFolderDto.isPersonal;
  }

  get friendlyName(): string {
    const nullCheck = localStorage.getItem('group_space_id') || '0';
    const organizationName = localStorage.getItem('organization_name');
    return this.id === parseInt(nullCheck)
      ? `${organizationName}'s Folder`
      : this.name;
  }

  public static get QUERY_FIELDS(): string {
    return 'name,parent_id,id,external_id,is_personal';
  }
}
