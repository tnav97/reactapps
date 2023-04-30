import { CanDto } from './canDto';
import { DashboardDto } from './dashboardDto';
import { LookDto } from './lookDto';

export class FolderNameDto {
  name: string;
  id: number;
  parentId: number;
  childCount: number;
  dashboards?: DashboardDto[];
  looks?: LookDto[];
  externalId?: string | null;
  creatorId?: number;
  isPersonal?: boolean;
  can?: CanDto;
  constructor(folderDto: any) {
    this.name = folderDto.name;
    this.id = parseInt(folderDto.id);
    this.parentId = parseInt(folderDto.parent_id);
    this.childCount = folderDto.child_count;
    this.dashboards = folderDto.dashboards;
    this.looks = folderDto.looks;
    this.externalId = folderDto.external_id || null;
    this.creatorId = folderDto.creator_id;
    this.can = new CanDto(folderDto.can);
  }

  public static get QUERY_FIELDS(): string {
    return 'name,id,child_count,parent_id,creator_id,external_id,created_at,dashboards,looks,can';
  }

  get friendlyName(): string {
    const nullCheck = localStorage.getItem('group_space_id') || '0';
    const organizationName = localStorage.getItem('organization_name');
    return this.id === parseInt(nullCheck)
      ? `${organizationName}'s Folder`
      : this.name;
  }
}

export interface EditFolderDto {
  Id?: string;
  Name: string;
  ParentId: string;
}

export interface PaginationPageDto {
  page: number;
  perPage: number;
}

export interface FolderWithContents {
  folders?: FolderNameDto[] | undefined;
  currentFolder?: FolderNameDto | undefined;
}
