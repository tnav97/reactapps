import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { TranslateReady } from '@alcumus/components';
import { DataNode } from 'rc-tree-select/lib/interface';
import { atom, useRecoilState } from 'recoil';
import { embedSiteTreeProvider } from '../../../providers/EmbedSiteTreeProvider';
import CopyDashboardModal from '../Modals/CopyDashboardModal';
import { SiteDto } from '../../../dtos/siteDto';
import { ReportElementTypes } from '../../../domain/reportElementTypes';
import EmbedReport from './EmbedReport';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '../../../lib/utils/useQuery';
import PanelSection from '../shared/PanelSection';
import NavBar from '../NavBar';
import EmbedSiteTree from '../SiteTree/EmbedSiteTree';
import { Col, Row } from 'antd';
import CopyDashboardButton from '../Button/CopyDashboardButton';

export const hasEmbeddedSiteFiltersState = atom<boolean>({
  key: 'hasEmbeddedSiteFiltersState',
  default: false,
});

type EmbedReportParams = {
  folderId: string;
};

export const internalSelectedSiteNodesState = atom<DataNode[] | undefined>({
  key: 'internalSelectedSiteNodesState',
  default: undefined,
});

export const siteTreeState = atom<Array<DataNode>>({
  key: 'siteTreeState',
  default: [],
});

export const siteTreeFlatListState = atom<Array<SiteDto> | undefined>({
  key: 'siteTreeFlatListState',
  default: undefined,
});

export const selectedSiteIdsState = atom<Array<number> | undefined>({
  key: 'selectedSiteIdsState',
  default: undefined,
});

export const embedInternalFilterState = atom<{ [key: string]: string }>({
  key: 'embedInternalFilterState',
  default: {},
});

export const embedInternalSiteIdsState = atom<Array<number> | undefined>({
  key: 'embedInternalSiteIdsState',
  default: undefined,
});

export const syncExternalSiteFilterState = atom<boolean>({
  key: 'syncExternalSiteFilterState',
  default: false,
});

const EmbedReportPage: FunctionComponent<
  RouteComponentProps<EmbedReportParams>
> = ({ match }: RouteComponentProps<EmbedReportParams>) => {
  const [treeData, setSiteTreeData] = useRecoilState(siteTreeState);
  const [siteTreeFlatList, setSiteTreeFlatList] = useRecoilState(
    siteTreeFlatListState
  );

  const [hasSiteFilters, setHasEmbeddedSiteFilters] = useRecoilState(
    hasEmbeddedSiteFiltersState
  );
  const embeddedSitesFilterElementRef = useRef(null);
  const [, setInternalSelectedSiteNodes] = useRecoilState(
    internalSelectedSiteNodesState
  );
  const [, setEmbedInternalFilter] = useRecoilState(embedInternalFilterState);
  const [, setEmbedInternalSiteIds] = useRecoilState(embedInternalSiteIdsState);
  const [, i18n] = useTranslation();
  const folderId = Number(match.params.folderId);
  const lookId = useQuery().get('lookId') as string;
  const dashboardId = useQuery().get('dashboardId') as string;
  const viewType = lookId
    ? ReportElementTypes.Look
    : ReportElementTypes.Dashboard;

  const mapSelectedSiteNodes = useCallback(
    (selectedInternalSiteIds: string[] | undefined) => {
      if (!selectedInternalSiteIds || !treeData.length) return;

      const selectedNodes = siteTreeFlatList
        ?.filter(
          (site) =>
            selectedInternalSiteIds.filter((int) => int === site.id).length > 0
        )
        .map((site) => ({ value: site.id, label: site.name } as DataNode));

      setInternalSelectedSiteNodes(selectedNodes);
    },
    [setInternalSelectedSiteNodes, treeData]
  );

  const handleEmbeddedSiteFiltersChange = useCallback(
    (mutation: MutationRecord) => {
      const target = mutation.target as Element;
      const value = target.getAttribute('value');
      if (value) {
        const filters = JSON.parse(value);
        setEmbedInternalFilter(filters);
        const siteFilterKey = Object.keys(filters).find(
          (key: string) => key.toLowerCase() === 'site'
        );
        if (!siteFilterKey) {
          return;
        }
        const siteFilters = (filters[siteFilterKey] as any)?.split(',');
        setEmbedInternalSiteIds(siteFilters);
        mapSelectedSiteNodes(siteFilters);
      }
    },
    [mapSelectedSiteNodes]
  );

  useEffect(() => {
    // TODO enable calls to getSiteFilterFor and mutationObserver
    // when site tree is implemented
  }, [handleEmbeddedSiteFiltersChange, setHasEmbeddedSiteFilters]);

  const getSiteTreeData = useCallback(() => {
    if (hasSiteFilters)
      embedSiteTreeProvider({}).then((res) => {
        setSiteTreeFlatList(res.siteFlatList);
        return setSiteTreeData(res.siteTree);
      });
  }, [hasSiteFilters]);

  useEffect(() => {
    getSiteTreeData();
    return () => {
      setInternalSelectedSiteNodes(undefined);
      setSiteTreeData([]);
    };
  }, [getSiteTreeData]);

  return (
    <TranslateReady tReady={i18n.isInitialized}>
      <NavBar>
        <PanelSection
          footer={
            !!treeData.length && (
              <Row>
                <Col span={4} />
                <Col span={16}>
                  <EmbedSiteTree />
                </Col>
                <Col span={4} />
              </Row>
            )
          }
          enableGoBack
          panelSettings={
            viewType === ReportElementTypes.Dashboard &&
            localStorage.getItem('user_is_editor') === 'true' && (
              <CopyDashboardButton />
            )
          }
        >
          <input
            ref={embeddedSitesFilterElementRef}
            id="embeddedSitesFilters"
            type="hidden"
          />
          <EmbedReport
            embedReportId={lookId ?? dashboardId}
            embedReportType={viewType}
          />
          <CopyDashboardModal
            dashboardId={dashboardId as string}
            defaultFolderId={folderId}
          />
        </PanelSection>
      </NavBar>
    </TranslateReady>
  );
};

export default EmbedReportPage;
