import React, { FunctionComponent } from 'react';
import { atom, useRecoilState } from 'recoil';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { moveDashboard } from '../../../server/models/dashboard';
import { verifyDashboardNameUniqueIn } from '../../../server/models/folder';
import MoveToFolderModal, { MoveToFolderModalProps } from './MoveToFolderModal';
import { useHistory } from 'react-router-dom';
import RedirectTo from '../../../utilities/RedirectTo';

interface Props {
  t: TFunction;
}

export const moveDashboardModalVisibleState = atom<boolean>({
  key: 'moveDashboardModalVisibleState',
  default: false,
});

export const moveDashboardModalFolderId = atom<number>({
  key: 'moveDashboardModalFolderId',
  default: -1,
});

export const moveDashboardModalFolderName = atom<string>({
  key: 'moveDashboardModalFolderName',
  default: '',
});

export const moveDashboardModalDashboardId = atom<string>({
  key: 'moveDashboardModalDashboardId',
  default: '',
});

export const moveDashboardModalDashboardName = atom<string>({
  key: 'moveDashboardModalDashboardName',
  default: '',
});

const MoveDashboardModal: FunctionComponent<Props> = ({ t }: Props) => {
  const [visible, setVisible] = useRecoilState(moveDashboardModalVisibleState);
  const [dashboardId] = useRecoilState(moveDashboardModalDashboardId);
  const [folderId] = useRecoilState(moveDashboardModalFolderId);
  const [folderName] = useRecoilState(moveDashboardModalFolderName);
  const [dashboardName] = useRecoilState(moveDashboardModalDashboardName);
  const history = useHistory();
  const nullCheck = localStorage.getItem('group_space_id') || '0';

  const moveToFolderModalProps: MoveToFolderModalProps = {
    currentFolderId: folderId,
    currentFolderName:
      folderId === parseInt(nullCheck)
        ? `${localStorage.getItem('organization_name')}'s ${t('folder')}`
        : folderName,
    dashboardName: dashboardName,
    formSubmitCallback: async (folderId: number) =>
      await moveDashboard(dashboardId, String(folderId), dashboardName),
    successMessage: t('dashboardMoveSuccess'),
    successCallback: () => {
      RedirectTo({ history, path: window.location.pathname });
    },
    failureMessage: t('dashboardMoveFail'),
    errorMessage: t('dashboardMoveError'),
    titleName: 'moveDashboardTitle',
    titleValidationCallback: async () =>
      await verifyDashboardNameUniqueIn(dashboardName, folderId.toString()),
    notificationMessage: t('dashboardMoveNotify'),
    duplicateErrorMessage: t('dashboardMoveDuplicate'),
    autoFocus: true,
    headerText: t('dashboardMoveHeader'),
    primaryButtonText: t('dashboardMoveButton'),
    visible: visible,
    setVisible: (isVisible: boolean) => setVisible(isVisible),
    t: t,
  };

  return <MoveToFolderModal {...moveToFolderModalProps} />;
};

export default withTranslation('ModalWindow')(MoveDashboardModal);
