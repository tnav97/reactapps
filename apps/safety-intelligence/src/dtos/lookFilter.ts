import { BaseFilter, IBaseFilter } from './baseFilter';

export interface ILookFilter extends IBaseFilter {
  lookId: string;
}

export class LookFilter extends BaseFilter implements ILookFilter {
  defaultValues: string[];

  constructor(
    id: string,
    public lookId: string,
    name: string,
    type: string,
    defaultValue: string,
    model: string,
    explore: string,
    dimension: string
  ) {
    super(id, name, type, defaultValue, model, explore, dimension);
    this.defaultValues = defaultValue?.split(',');
  }
}
