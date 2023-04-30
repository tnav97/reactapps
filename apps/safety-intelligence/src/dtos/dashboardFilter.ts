import { BaseFilter, IBaseFilter } from './baseFilter';

export interface IDashboardFilter extends IBaseFilter {
  dashboardId: string;
  title: string;
  row: number;
  listenToFilters: any;
  allowMultipleValues: boolean;
  required: boolean;
  uiConfig: any;
}
export class DashboardFilter extends BaseFilter implements IDashboardFilter {
  dashboardId: string;
  title: string;
  row: number;
  listenToFilters: any;
  allowMultipleValues: boolean;
  required: boolean;
  defaultValues: string[];
  uiConfig: any;

  constructor(dashboardFilter: any) {
    super(
      dashboardFilter.id,
      dashboardFilter.name,
      dashboardFilter.type,
      dashboardFilter.default_value,
      dashboardFilter.model,
      dashboardFilter.explore,
      dashboardFilter.dimension
    );
    this.dashboardId = dashboardFilter.dashboard_id;
    this.title = dashboardFilter.title;
    this.row = dashboardFilter.row;
    this.listenToFilters = dashboardFilter.listen_to_filters;
    this.allowMultipleValues = dashboardFilter.allow_multiple_values;
    this.required = dashboardFilter.required;
    this.defaultValues = dashboardFilter?.default_value?.split(',');
    this.uiConfig = dashboardFilter.ui_config;
  }

  public static get QUERY_FIELDS(): string {
    return `${BaseFilter.QUERY_FIELDS},dashboard_id,title,allow_multiple_values,ui_config`;
  }
}
