import { DataNode } from 'rc-tree-select/lib/interface';
import { SiteDto } from './siteDto';

export class SiteDataDto {
  siteTree: DataNode[];
  siteFlatList: SiteDto[];

  constructor(siteData: any) {
    this.siteTree = siteData.siteTree;
    this.siteFlatList = siteData.siteFlatList;
  }
}
