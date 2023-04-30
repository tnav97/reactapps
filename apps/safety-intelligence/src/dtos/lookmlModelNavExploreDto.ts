export class LookmlModelNavExploreDto {
  name: string;
  description: string;
  label: string;
  hidden: boolean;
  groupLabel: string;
  modelName: string;

  constructor(lookmlModelNavExploreDto: any, modelName: string) {
    this.name = lookmlModelNavExploreDto.name;
    this.description = lookmlModelNavExploreDto.description;
    this.label = lookmlModelNavExploreDto.label;
    this.hidden = lookmlModelNavExploreDto.hidden;
    this.groupLabel = lookmlModelNavExploreDto.group_label;
    this.modelName = modelName;
  }

  public static get QUERY_FIELDS(): string {
    return 'name,description,label,hidden,group_label';
  }
}
