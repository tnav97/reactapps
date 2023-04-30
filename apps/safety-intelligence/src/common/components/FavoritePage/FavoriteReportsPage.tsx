import React, { FunctionComponent } from 'react';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { TranslateReady } from '@alcumus/components';
import { searchLooksAndSync } from '../../../server/models/look';
import { searchDashboardsAndSync } from '../../../server/models/dashboard';
import ReportBasePage from '../BasePage/ReportBasePage';
import { TableHeader } from '../ReportTable/SortableTableHeader';
import FavoriteRoute from '../../../routes/FavoriteRoute';
import EmptyState from '../EmptyState/EmptyState';

interface Props {
  t: TFunction;
  tReady: boolean;
}

const FavoriteReportsPage: FunctionComponent<Props> = ({
  t,
  tReady,
}: Props) => {
  const headers: TableHeader[] = [
    { id: 'icon', displayName: '' },
    { id: 'name', displayName: t('name', { ns: 'TableHeaders' }) },
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
      dashboardText={t('favoriteDashboardText')}
      lookText={t('favoriteLookText')}
    />
  );
  return (
    <TranslateReady tReady={tReady}>
      <ReportBasePage
        title={FavoriteRoute.friendlyName}
        getDashboardsFunction={() =>
          searchDashboardsAndSync({ contentFavoriteId: 'not null' })
        }
        getLooksFunction={() =>
          searchLooksAndSync({ contentFavoriteId: 'not null' })
        }
        headers={headers}
        showViews
        emptyState={emptyState}
      />
    </TranslateReady>
  );
};

export default withTranslation(['EmptyState', 'TableHeaders'])(
  FavoriteReportsPage
);
