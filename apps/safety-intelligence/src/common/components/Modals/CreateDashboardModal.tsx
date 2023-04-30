import React, { FunctionComponent } from 'react';
import { atom, useRecoilState } from 'recoil';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { createDashboard } from '../../../server/models/dashboard';
import { verifyDashboardNameUniqueIn } from '../../../server/models/folder';
import SaveInFolderModal, { SaveInFolderModalProps } from './SaveInFolderModal';
import { useHistory } from 'react-router-dom';
import EmbedRoute from '../../../routes/EmbedRoute';
import RedirectTo from '../../../utilities/RedirectTo';
import { DashboardDto } from '../../../dtos/dashboardDto';

interface Props {
  defaultFolderId: number;
  t: TFunction;
}

export const createDashboardModalVisibleState = atom<boolean>({
  key: 'createDashboardModalVisibleState',
  default: false,
});

const CreateDashboardModal: FunctionComponent<Props> = ({
  defaultFolderId,
  t,
}: Props) => {
  const [visible, setVisible] = useRecoilState(
    createDashboardModalVisibleState
  );
  const history = useHistory();

  const successCallback = (dashboard: DashboardDto) => {
    return RedirectTo({
      history,
      path: EmbedRoute.dashboardQueryString(dashboard.folder.id, dashboard.id),
    });
  };

  const saveInFolderModalProps = {
    defaultFolderId: defaultFolderId,
    formSubmitCallback: async (title: string, folderId: number) =>
      await createDashboard(title, String(folderId)),
    successCallback: successCallback,
    successMessage: t('dashboardCreateSuccess'),
    failureMessage: t('dashboardCreateFail'),
    errorMessage: t('dashboardCreateError'),
    titleName: 'createDashboardTitle',
    titleValidationCallback: async (title: string, folderId: number) =>
      await verifyDashboardNameUniqueIn(title, folderId.toString()),
    notificationMessage: t('dashboardCreateNotify'),
    notificationMessageWaitTime: 1000,
    notificationMessageType: 'info',
    placeholder: t('dashboardCreatePlaceholder'),
    duplicateErrorMessage: t('dashboardCreateDuplicate'),
    headerText: t('dashboardCreateHeader'),
    primaryButtonText: t('dashboardCreateButton'),
    visible: visible,
    setVisible: (isVisible) => setVisible(isVisible),
    t: t,
  } as SaveInFolderModalProps;

  return <SaveInFolderModal {...saveInFolderModalProps} />;
};

export default withTranslation('ModalWindow')(CreateDashboardModal);
