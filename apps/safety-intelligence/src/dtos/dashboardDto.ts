import { CanDto } from './canDto';
import { FolderDto } from './folderDto';
import { ReportDto } from './reportDto';

export class DashboardDto extends ReportDto {
  preferredViewer: string;

  constructor(dashboardDto: any, lastViewedAt?: Date) {
    super(
      dashboardDto.id,
      dashboardDto.title,
      dashboardDto.description,
      new FolderDto(dashboardDto.folder),
      new CanDto(dashboardDto.can),
      dashboardDto.content_metadata_id,
      dashboardDto.content_favorite_id,
      dashboardDto.user_id,
      dashboardDto.created_at,
      dashboardDto.deleted_at,
      dashboardDto.favorite_count,
      dashboardDto.viewCount,
      lastViewedAt
    );

    this.preferredViewer = dashboardDto.preferredViewer;
  }

  public static get QUERY_FIELDS(): string {
    return `${ReportDto.QUERY_FIELDS},preferred_viewer`;
  }
}
