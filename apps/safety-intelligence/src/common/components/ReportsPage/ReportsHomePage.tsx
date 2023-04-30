import React, { FunctionComponent } from 'react';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { TranslateReady } from '@alcumus/components';
import ReportBasePage from '../BasePage/ReportBasePage';
import { searchDashboardsAndSync } from '../../../server/models/dashboard';
import { searchLooksAndSync } from '../../../server/models/look';
import { TableHeader } from '../ReportTable/SortableTableHeader';
import ReportsRoute from '../../../routes/ReportsRoute';
import EmptyLookState from '../EmptyState/EmptyLookState';

interface Props {
  t: TFunction;
  tReady: boolean;
}

const ReportsHomePage: FunctionComponent<Props> = ({ t, tReady }: Props) => {
  const headers: TableHeader[] = [
    { id: 'icon', displayName: '' },
    { id: 'name', displayName: t('name') },
    { id: 'viewCount', displayName: t('views'), isNumeric: true },
    { id: 'createdBy', displayName: t('owner') },
    { id: 'folder', displayName: t('folder') },
    { id: 'contentFavoriteId', displayName: t('favorite') },
  ];
  const emptyState = (
    <EmptyLookState
      showCreateButton={localStorage.getItem('user_is_editor') === 'true'}
      t={t}
    />
  );
  return (
    <TranslateReady tReady={tReady}>
      <ReportBasePage
        title={ReportsRoute.friendlyName}
        getDashboardsFunction={() => searchDashboardsAndSync({})}
        getLooksFunction={() => searchLooksAndSync({})}
        headers={headers}
        showViews
        emptyState={emptyState}
      />
    </TranslateReady>
  );
};

export default withTranslation(['TableHeaders', 'EmptyState', 'translation'])(
  ReportsHomePage
);
