export class SiteDto {
  id: string;
  parentId: string;
  name: string;

  constructor(site: any) {
    this.id = site.id;
    this.parentId = site.parentId;
    this.name = site.name;
  }
}
