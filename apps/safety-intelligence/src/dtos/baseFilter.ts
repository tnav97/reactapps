export interface IBaseFilter {
  id: string;
  name: string;
  type: string;
  defaultValue: string;
  model: string;
  explore: string;
  dimension: string;
  defaultValues: string[];
}

export class BaseFilter implements IBaseFilter {
  defaultValues: string[];

  constructor(
    public id: string,
    public name: string,
    public type: string,
    public defaultValue: string,
    public model: string,
    public explore: string,
    public dimension: string
  ) {
    this.defaultValues = defaultValue?.split(',');
  }

  public static get QUERY_FIELDS(): string {
    return 'id,name,type,default_value,model,explore,dimension';
  }
}
