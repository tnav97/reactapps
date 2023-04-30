import React, { FunctionComponent } from 'react';
import {
  updateFolder,
  verifyFolderNameUniqueIn,
} from '../../../server/models/folder';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { atom, useRecoilState } from 'recoil/dist';
import ReportFoldersRoute from '../../../routes/FoldersRoute';
import { useHistory } from 'react-router-dom';
import RedirectTo from '../../../utilities/RedirectTo';
import SaveInFolderModal, {
  SaveInFolderModalProps,
} from '../Modals/SaveInFolderModal';

interface Props {
  defaultFolderId: number;
  parentId: number;
  currentFolderName?: string;
  t: TFunction;
}

export const updateFolderModalVisibleState = atom<boolean>({
  key: 'updateFolderModalVisibleState',
  default: false,
});

const UpdateFolderModal: FunctionComponent<Props> = ({
  defaultFolderId,
  currentFolderName,
  parentId,
  t,
}: Props) => {
  const [visible, setVisible] = useRecoilState(updateFolderModalVisibleState);
  const history = useHistory();

  const successCallback = (res: any) => {
    if (
      location.pathname
        .toLowerCase()
        .includes(ReportFoldersRoute.path.toLowerCase()) &&
      res
    ) {
      RedirectTo({ history, path: `${ReportFoldersRoute.path}/${res.id}` });
    }
  };

  const saveInFolderModalProps: SaveInFolderModalProps = {
    id: 'updateFolderModal',
    defaultFolderId: parentId,
    currentFolderName: currentFolderName,
    formSubmitCallback: async (title: string) =>
      await updateFolder(defaultFolderId, {
        Name: title,
        ParentId: parentId.toString(),
      }),
    successCallback: successCallback,
    successMessage: t('folderUpdateSuccess'),
    failureMessage: t('folderUpdateFail'),
    hideFolderTree: true,
    errorMessage: t('folderUpdateError'),
    titleName: 'updateFolder',
    titleValidationCallback: async (title: string) =>
      await verifyFolderNameUniqueIn(title, parentId.toString()),
    notificationMessage: t('folderUpdateNotify'),
    placeholder: t('folderUpdatePlaceholder'),
    duplicateErrorMessage: t('folderUpdateDuplicate'),
    headerText: `${t('folderUpdateHeader')} "${currentFolderName}”`,
    primaryButtonText: t('folderUpdateButton'),
    autoFocus: true,
    visible: visible,
    setVisible: (isVisible) => setVisible(isVisible),
    t: t,
  };

  return <SaveInFolderModal {...saveInFolderModalProps} />;
};

export default withTranslation('ModalWindow')(UpdateFolderModal);
