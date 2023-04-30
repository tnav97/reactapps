import { LookmlModelNavExploreDto } from './lookmlModelNavExploreDto';

export class LookmlModelDto {
  label: string;
  name: string;
  explores: LookmlModelNavExploreDto[];

  constructor(lookmlModelDto: any) {
    this.label = lookmlModelDto.label;
    this.name = lookmlModelDto.name;
    this.explores = lookmlModelDto?.explores?.map(
      (explore: any) =>
        new LookmlModelNavExploreDto(explore, lookmlModelDto.name)
    );
  }

  public static get QUERY_FIELDS(): string {
    return `label,name,explores(${LookmlModelNavExploreDto.QUERY_FIELDS})`;
  }
}
