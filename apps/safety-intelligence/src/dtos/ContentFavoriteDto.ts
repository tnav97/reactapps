export class ContentFavoriteDto {
  id?: number | undefined;
  userId?: number;
  contentMetadataId: number;
  lookId?: number;
  dashboardId?: number;

  constructor(contentFavoriteDto: any) {
    this.id = contentFavoriteDto.id;
    this.userId = contentFavoriteDto.user_id;
    this.contentMetadataId = contentFavoriteDto.content_metadata_id;
    this.lookId = contentFavoriteDto.look_id;
    this.dashboardId = contentFavoriteDto.dashboard_id;
  }

  public static get QUERY_FIELDS(): string {
    return `id,user_id,content_metadata_id,look_id,dashboard_id`;
  }
}
