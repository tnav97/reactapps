export class RecentlyViewedDto {
  id: number;
  reportId: string;
  reportType: string;
  embedUserId: number;
  userId: number;
  organizationId: number;
  utcLastModifiedDate: Date;
  modifiedByUserId: number;
  viewCount: number;

  constructor(RecentlyViewedDto: any) {
    this.id = RecentlyViewedDto.id;
    this.reportId = RecentlyViewedDto.reportId;
    this.reportType = RecentlyViewedDto.reportType;
    this.embedUserId = RecentlyViewedDto.embedUserId;
    this.userId = RecentlyViewedDto.userId;
    this.organizationId = RecentlyViewedDto.organizationId;
    this.utcLastModifiedDate = new Date(
      RecentlyViewedDto.utcLastModifiedDate ?? null
    );
    this.modifiedByUserId = RecentlyViewedDto.modifiedByUserId;
    this.viewCount = RecentlyViewedDto.viewCount;
  }
}
