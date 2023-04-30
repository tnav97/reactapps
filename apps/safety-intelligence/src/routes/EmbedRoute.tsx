import ReportHomeRoute from './ReportsRoute';
export default class EmbedReportRoute {
  static get path(): string {
    return `${ReportHomeRoute.path}/:folderId`;
  }

  static dashboardQueryString(folderId: number, dashboardId: number): string {
    return `${ReportHomeRoute.path}/${folderId}?dashboardId=${dashboardId}`;
  }

  static lookQueryString(folderId: number, lookId: number): string {
    return `${ReportHomeRoute.path}/${folderId}?lookId=${lookId}`;
  }
}
