import React, { FunctionComponent } from 'react';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { TranslateReady } from '@alcumus/components';
import { searchRecentlyViewedLook } from '../../../server/models/look';
import { searchRecentlyViewedDashboard } from '../../../server/models/dashboard';
import ReportBasePage from '../BasePage/ReportBasePage';
import { TableHeader } from '../ReportTable/SortableTableHeader';
import RecentRoute from '../../../routes/RecentRoute';
import EmptyState from '../EmptyState/EmptyState';

interface Props {
  t: TFunction;
  tReady: boolean;
}

const RecentReportsPage: FunctionComponent<Props> = ({ t, tReady }: Props) => {
  const headers: TableHeader[] = [
    { id: 'icon', displayName: '' },
    { id: 'name', displayName: t('name', { ns: 'TableHeaders' }) },
    { id: 'lastViewed', displayName: t('lastViewed', { ns: 'TableHeaders' }) },
    { id: 'createdBy', displayName: t('owner', { ns: 'TableHeaders' }) },
    { id: 'folder', displayName: t('folder', { ns: 'TableHeaders' }) },
    {
      id: 'contentFavoriteId',
      displayName: t('favorite', { ns: 'TableHeaders' }),
    },
  ];
  const emptyState = (
    <EmptyState
      dashboardText={t('recentDashboardText')}
      lookText={t('recentLookText')}
    />
  );
  return (
    <TranslateReady tReady={tReady}>
      <ReportBasePage
        title={RecentRoute.friendlyName}
        getDashboardsFunction={() => searchRecentlyViewedDashboard()}
        getLooksFunction={() => searchRecentlyViewedLook()}
        headers={headers}
        showLastViewed
        emptyState={emptyState}
      />
    </TranslateReady>
  );
};

export default withTranslation(['EmptyState', 'TableHeaders'])(
  RecentReportsPage
);
