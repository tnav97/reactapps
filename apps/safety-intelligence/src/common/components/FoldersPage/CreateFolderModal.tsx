import React, { FunctionComponent } from 'react';
import {
  createFolder,
  verifyFolderNameUniqueIn,
} from '../../../server/models/folder';
import { atom, useRecoilState } from 'recoil/dist';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import ReportFoldersRoute from '../../../routes/FoldersRoute';
import { FolderDto } from '../../../dtos/folderDto';
import RedirectTo from '../../../utilities/RedirectTo';
import { useHistory } from 'react-router-dom';
import SaveInFolderModal, {
  SaveInFolderModalProps,
} from '../Modals/SaveInFolderModal';

interface Props {
  defaultFolderId: number;
  t: TFunction;
}

export const createFolderModalVisibleState = atom<boolean>({
  key: 'createFolderModalVisibleState',
  default: false,
});

const CreateFolderModal: FunctionComponent<Props> = ({
  defaultFolderId,
  t,
}: Props) => {
  const [visible, setVisible] = useRecoilState(createFolderModalVisibleState);
  const history = useHistory();
  const successCallback = (res: FolderDto | undefined) => {
    if (res)
      RedirectTo({ history, path: `${ReportFoldersRoute.path}/${res.id}` });
  };

  const saveInFolderModalProps: SaveInFolderModalProps = {
    id: 'createFolderModal',
    defaultFolderId: defaultFolderId,
    formSubmitCallback: async (title: string, folderId: number) =>
      await createFolder({ Name: title, ParentId: folderId.toString() }),
    successCallback: successCallback,
    successMessage: t('folderCreateSuccess'),
    failureMessage: t('folderCreateFail'),
    errorMessage: t('folderCreateError'),
    titleName: 'createFolder',
    titleValidationCallback: async (title: string, folderId: number) =>
      await verifyFolderNameUniqueIn(title, folderId.toString()),
    placeholder: t('folderCreatePlaceholder'),
    duplicateErrorMessage: t('folderCreateDuplicate'),
    headerText: t('folderCreateHeader'),
    primaryButtonText: t('folderCreateButton'),
    autoFocus: true,
    visible: visible,
    setVisible: (isVisible) => setVisible(isVisible),
    t: t,
  };

  return <SaveInFolderModal {...saveInFolderModalProps} />;
};

export default withTranslation('ModalWindow')(CreateFolderModal);
