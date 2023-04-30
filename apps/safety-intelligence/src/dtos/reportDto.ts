import { CanDto } from './canDto';
import { FolderDto } from './folderDto';

export interface IReportDto {
  id: number;
  title: string;
  description: string;
  folder: FolderDto;
  contentMetadataId: number;
  contentFavoriteId: number;
  userId: number;
  createdAt: any;
  deletedAt: any;
  favoriteCount: number;
  viewCount: number;
  lastViewedAt?: Date;
  userName: string;
  popularity?: number;
  can: CanDto;
}

export class ReportDto implements IReportDto {
  userName: string;
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public folder: FolderDto,
    public can: CanDto,
    public contentMetadataId: number,
    public contentFavoriteId: number,
    public userId: number,
    public createdAt: any,
    public deletedAt: any,
    public favoriteCount: number,
    public viewCount: number,
    public lastViewedAt?: Date,
    public popularity?: number,
    userName?: string
  ) {
    this.userName = userName ?? '';
  }

  public static get QUERY_FIELDS(): string {
    return `
        id,title,description,folder(${FolderDto.QUERY_FIELDS}),content_metadata_id,content_favorite_id,
        user_id,created_at,deleted_at,can(${CanDto.QUERY_FIELDS}),favorite_count`;
  }
}
