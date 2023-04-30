import React, { FunctionComponent, ReactNode, useState } from 'react';
import { useRecoilState } from 'recoil';
import PanelSection from '../shared/PanelSection';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { ReportElementTypes } from '../../../domain/reportElementTypes';
import ReportTypeToggle, {
  reportTypeSwitchState,
} from '../shared/ReportTypeToggle';
import ReportViewToggle from '../shared/ReportViewToggle';
import NavBar from '../NavBar';
import DashboardView from '../Views/DashboardView';
import LookView from '../Views/LookView';
import { DashboardDto } from '../../../dtos/dashboardDto';
import { LookDto } from '../../../dtos/lookDto';
import { TableHeader } from '../ReportTable/SortableTableHeader';
import { Redirect } from 'react-router-dom';
import MoveDashboardModal from '../Modals/MoveDashboardModal';
type Props = {
  title: string;
  getDashboardsFunction: () => Promise<DashboardDto[] | undefined>;
  getLooksFunction: () => Promise<LookDto[] | undefined>;
  headers?: TableHeader[];
  showViews?: boolean;
  showPopular?: boolean;
  showLastViewed?: boolean;
  emptyState?: ReactNode;
  t: TFunction;
};

const ReportBasePage: FunctionComponent<Props> = ({
  title,
  getDashboardsFunction,
  getLooksFunction,
  headers,
  showViews = false,
  showPopular = false,
  showLastViewed = false,
  emptyState,
  t,
}: Props) => {
  const [reportSwitch] = useRecoilState(reportTypeSwitchState);
  const [errorState, setErrorState] = useState<{
    hasError: boolean;
    redirectUrl: string;
  }>({ hasError: false, redirectUrl: '' });
  const handleErrors = (err) => {
    if (err.response.status === 404) {
      setErrorState({ hasError: true, redirectUrl: '/notfound' });
    } else {
      setErrorState({ hasError: true, redirectUrl: '/error' });
    }
  };
  if (errorState.hasError) {
    return <Redirect to={errorState.redirectUrl} />;
  }
  return (
    <NavBar>
      <PanelSection routes={[{ displayName: t(title), path: '' }]}>
        <ReportTypeToggle />
        <br />
        <br />
        <ReportViewToggle showDropdown={false} />
        <br />
        {reportSwitch === ReportElementTypes.Dashboard && (
          <DashboardView
            getDashboardsFunction={getDashboardsFunction}
            headers={headers}
            showViews={showViews}
            showLastViewed={showLastViewed}
            showPopular={showPopular}
            emptyState={emptyState}
            handleErrors={handleErrors}
          />
        )}
        {reportSwitch === ReportElementTypes.Look && (
          <LookView
            getLooksFunction={getLooksFunction}
            headers={headers}
            showViews={showViews}
            showLastViewed={showLastViewed}
            showPopular={showPopular}
            emptyState={emptyState}
            handleErrors={handleErrors}
          />
        )}
      </PanelSection>
      <MoveDashboardModal />
    </NavBar>
  );
};

export default withTranslation()(ReportBasePage);
