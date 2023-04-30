import React, { FunctionComponent } from 'react';
import { useRecoilValue, atom, useRecoilState } from 'recoil';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { saveDashboardAs } from '../../../server/models/dashboard';
import { embedInternalFilterState } from '../EmbeddedReports/EmbedReportPage';
import { verifyDashboardNameUniqueIn } from '../../../server/models/folder';
import SaveInFolderModal, { SaveInFolderModalProps } from './SaveInFolderModal';

interface Props {
  dashboardId: string;
  defaultFolderId: number;
  t: TFunction;
}

export const copyDashboardModalVisibleState = atom<boolean>({
  key: 'copyDashboardModalVisibleState',
  default: false,
});

const CopyDashboardModal: FunctionComponent<Props> = ({
  dashboardId,
  defaultFolderId,
  t,
}: Props) => {
  const internalFilters = useRecoilValue(embedInternalFilterState);
  const [visible, setVisible] = useRecoilState(copyDashboardModalVisibleState);

  const saveInFolderModalProps: SaveInFolderModalProps = {
    defaultFolderId: defaultFolderId,
    formSubmitCallback: async (title: string, folderId: number) =>
      await saveDashboardAs(
        title,
        String(folderId),
        dashboardId,
        internalFilters
      ),
    successMessage: t('dashboardSaveSuccess'),
    failureMessage: t('dashboardSaveFail'),
    errorMessage: t('dashboardSaveError'),
    titleName: 'saveAsDashboardTitle',
    titleValidationCallback: async (title: string, folderId: number) =>
      await verifyDashboardNameUniqueIn(title, folderId.toString()),
    notificationMessage: t('dashboardSaveNotify'),
    placeholder: t('dashboardSavePlaceholder'),
    duplicateErrorMessage: t('dashboardSaveDuplicate'),
    autoFocus: true,
    headerText: t('dashboardDuplicateHeader'),
    primaryButtonText: t('dashboardSaveButton'),
    visible: visible,
    setVisible: (isVisible: boolean) => setVisible(isVisible),
    t: t,
  };

  return <SaveInFolderModal {...saveInFolderModalProps} />;
};

export default withTranslation('ModalWindow')(CopyDashboardModal);
