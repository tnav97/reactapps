import React, { FunctionComponent } from 'react';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { TranslateReady } from '@alcumus/components';
import PopularRoute from '../../../routes/PopularRoute';
import { getPopularDashboardsForCurrentOrganization } from '../../../server/models/dashboard';
import { getPopularLooksForCurrentOrganization } from '../../../server/models/look';
import ReportBasePage from '../BasePage/ReportBasePage';
import EmptyState from '../EmptyState/EmptyState';
import { TableHeader } from '../ReportTable/SortableTableHeader';

interface Props {
  t: TFunction;
  tReady: boolean;
}

const PopularReportsPage: FunctionComponent<Props> = ({ t, tReady }: Props) => {
  const headers: TableHeader[] = [
    { id: 'icon', displayName: '' },
    { id: 'name', displayName: t('name', { ns: 'TableHeaders' }) },
    { id: 'popularity', displayName: t('popularity', { ns: 'TableHeaders' }) },
    {
      id: 'viewCount',
      displayName: t('views', { ns: 'TableHeaders' }),
      isNumeric: true,
    },
    { id: 'createdBy', displayName: t('owner', { ns: 'TableHeaders' }) },
    { id: 'folder', displayName: t('folder', { ns: 'TableHeaders' }) },
    {
      id: 'contentFavoriteId',
      displayName: t('favorite', { ns: 'TableHeaders' }),
    },
  ];
  const emptyState = (
    <EmptyState
      dashboardText={t('popularDashboardText')}
      lookText={t('popularLookText')}
    />
  );
  return (
    <TranslateReady tReady={tReady}>
      <ReportBasePage
        title={PopularRoute.friendlyName}
        getDashboardsFunction={() =>
          getPopularDashboardsForCurrentOrganization()
        }
        getLooksFunction={() => getPopularLooksForCurrentOrganization()}
        headers={headers}
        showPopular
        showViews
        emptyState={emptyState}
      />
    </TranslateReady>
  );
};

export default withTranslation(['EmptyState', 'TableHeaders'])(
  PopularReportsPage
);
