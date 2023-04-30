export class CanDto {
  download: boolean;
  update: boolean;
  destroy: boolean;
  schedule: boolean;
  editContent: boolean;

  constructor(canDto: any) {
    this.download = canDto.download;
    this.update = canDto.update;
    this.destroy = canDto.destroy;
    this.schedule = canDto.schedule;
    this.editContent = canDto.edit_content;
  }

  public static get QUERY_FIELDS(): string {
    return 'download,update,schedule,destroy';
  }
}
