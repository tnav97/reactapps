import { CanDto } from '../dtos/canDto';
import { ReportElementTypes } from './reportElementTypes';
export class ReportListItemProps {
  id: number;
  name: string;
  basePath: string;
  elementType?: ReportElementTypes;
  folder: string;
  folderId: number;
  contentFavoriteId: number | undefined;
  contentMetadataId: number;
  createdAt: any;
  lastViewed?: Date;
  popularity?: number;
  favoriteCount?: number;
  viewCount?: number | string;
  model?: string;
  createdBy: string;
  dashboards: number | string;
  looks: number | string;
  can?: CanDto;
  userId?: number;

  constructor(report: any) {
    this.id = report.id;
    this.name = report.name;
    this.basePath = report.basePath;
    this.elementType = report.elementType;
    this.folder = report.folder;
    this.folderId = report.folderId;
    this.contentFavoriteId = report.contentFavoriteId;
    this.contentMetadataId = report.contentMetadataId;
    this.createdAt = report.createdAt;
    this.lastViewed = report.lastViewed;
    this.popularity = report.popularity;
    this.favoriteCount = report.favoriteCount;
    this.viewCount = report.viewCount;
    this.model = report.model;
    this.createdBy = report.createdBy;
    this.dashboards = report.dashboards;
    this.looks = report.looks;
    this.can = new CanDto(report.can);
    this.userId = report.userId;
  }
}
