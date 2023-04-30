import { BaseFolderDto, IBaseFolderDto } from './baseFolderDto';
import { DashboardDto } from './dashboardDto';
import { LookDto } from './lookDto';

export interface IFolderDto extends IBaseFolderDto {
  childCount: number;
  creatorId: number;
  can: any;
  dashboards: DashboardDto[];
  looks: LookDto[];
  isSharedRoot: boolean;
  isEmbed: boolean;
  createdBy: string;
}

export class FolderDto extends BaseFolderDto implements IFolderDto {
  childCount: number;
  creatorId: number;
  can: any;
  dashboards: DashboardDto[];
  looks: LookDto[];
  isSharedRoot: boolean;
  isEmbed: boolean;
  createdBy: string;

  constructor(folderDto: any) {
    super({
      name: folderDto.name,
      parentId: folderDto.parent_id,
      id: folderDto.id,
      externalId: folderDto.external_id,
      isPersonal: folderDto.is_personal,
    } as IBaseFolderDto);
    this.childCount = folderDto.child_count;
    this.creatorId = folderDto.creator_id;
    this.can = folderDto.can;
    this.dashboards = folderDto.dashboards;
    this.looks = folderDto.looks;
    this.isPersonal = folderDto.is_personal;
    this.isSharedRoot = folderDto.is_shared_root;
    this.isEmbed = folderDto.is_embed;
    this.createdBy = folderDto.createdBy;
  }

  public static get QUERY_FIELDS(): string {
    return `${BaseFolderDto.QUERY_FIELDS},creator_id,child_count,can,dashboards,looks,is_shared_root,is_embed`;
  }

  public static get ROOT_REQUEST_FIELDS(): string {
    return `${BaseFolderDto.QUERY_FIELDS},is_embed,dashboards,looks`;
  }

  public static get SUMMARY_REQUEST_FIELDS(): string {
    return `${BaseFolderDto.QUERY_FIELDS},is_embed,child_count,can`;
  }
}
