export class QueryDto {
  id: number;
  model: string;
  view: string;
  fields: string[];
  filters: any;
  filterConfig: any;
  filterExpression: string;
  slug: string;

  constructor(queryDto: any) {
    this.id = parseInt(queryDto.id);
    this.model = queryDto.model;
    this.view = queryDto.view;
    this.fields = queryDto.fields;
    this.filters = queryDto.filters;
    this.filterConfig = queryDto.filterConfig;
    this.filterExpression = queryDto.filterExpression;
    this.slug = queryDto.slug;
  }

  public static get QUERY_FIELDS(): string {
    return `id,model,view,fields,filters,filter_config,filter_expression,slug`;
  }
}
