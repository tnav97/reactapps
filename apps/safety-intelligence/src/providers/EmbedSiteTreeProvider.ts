import { DataNode } from 'rc-tree-select/lib/interface';
import { SiteDataDto } from '../dtos/siteDataDto';
import { SiteDto } from '../dtos/siteDto';
import { get } from '../utilities/Api';

const SI2_INTERNAL_URL = '/SafetyIntelligence2Internal';
interface SiteTreeResponseDto {
  Id: string;
  ParentId?: number;
  Name: string;
  Children: SiteTreeResponseDto[];
}

interface siteTreeProviderProp {
  apiUrl?: string;
}

export const embedSiteTreeProvider = async ({
  apiUrl,
}: siteTreeProviderProp): Promise<SiteDataDto> => {
  const url = apiUrl ?? `${SI2_INTERNAL_URL}/SiteTreeFromHereAndBelow`;

  const mapSiteTreeResponse = (dto: SiteTreeResponseDto): DataNode => {
    const parent: DataNode = {
      title: dto.Name,
      key: dto.Id,
      value: dto.Id,
    };
    parent.children = dto.Children.map((x) => mapSiteTreeResponse(x));
    return parent;
  };

  // TODO: move to server/routes/api once site tree is implemented
  const res = await get<any>({ url });
  const siteTree = res?.SiteTree ? [mapSiteTreeResponse(res.SiteTree)] : [];
  const flatList = res?.SiteFlatList
    ? res.SiteFlatList.map(
        (site: any) =>
          new SiteDto({
            id: site.Id,
            parent_id: site.ParentId,
            name: site.Name,
          })
      )
    : [];

  return new SiteDataDto({ siteTree: siteTree, siteFlatList: flatList });
};
