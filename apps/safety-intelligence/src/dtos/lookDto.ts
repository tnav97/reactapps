import { CanDto } from './canDto';
import { FolderDto } from './folderDto';
import { QueryDto } from './queryDto';
import { ReportDto } from './reportDto';

class LookModelDto {
  id: number;
  label: string;

  constructor(dto: any) {
    this.id = parseInt(dto.id);
    this.label = dto.label;
  }
}

export class LookDto extends ReportDto {
  model: LookModelDto;

  constructor(lookDto: any, lastViewedAt?: Date) {
    super(
      lookDto.id,
      lookDto.title,
      lookDto.description,
      new FolderDto(lookDto.folder),
      new CanDto(lookDto.can),
      lookDto.content_metadata_id,
      lookDto.content_favorite_id,
      lookDto.user_id,
      lookDto.created_at,
      lookDto.deleted_at,
      lookDto.favorite_count,
      lookDto.viewCount,
      lastViewedAt
    );
    this.model = lookDto.model;
  }

  public static get QUERY_FIELDS(): string {
    return `${ReportDto.QUERY_FIELDS},model`;
  }
}

export class LookQueryDto {
  id: number;
  query?: QueryDto;

  constructor(lookQueryDto: any) {
    this.id = parseInt(lookQueryDto.id);
    this.query = lookQueryDto.query;
  }

  public static get QUERY_FIELDS(): string {
    return `id,query(${QueryDto.QUERY_FIELDS})`;
  }
}
