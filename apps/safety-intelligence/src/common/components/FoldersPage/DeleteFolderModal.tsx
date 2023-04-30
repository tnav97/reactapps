import React, { FunctionComponent, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { deleteFolder } from '../../../server/models/folder';
import ReportFoldersRoute from '../../../routes/FoldersRoute';
import DeleteModal, { DeleteModalProps } from '../Modals/DeleteModal';
import RedirectTo from '../../../utilities/RedirectTo';
import { useHistory, useLocation } from 'react-router-dom';
import useCurrentFolder from '../FoldersPage/useCurrentFolder';

interface Props {
  t: TFunction;
}

export const deleteFolderModalVisibleState = atom<boolean>({
  key: 'deleteFolderModalVisibleState',
  default: false,
});

export const deleteFolderModalCurrentFolderId = atom<number>({
  key: 'deleteFolderModalCurrentFolderId',
  default: -1,
});

const DeleteFolderModal: FunctionComponent<Props> = ({ t }: Props) => {
  const [visible, setVisible] = useRecoilState(deleteFolderModalVisibleState);
  const [folderId] = useRecoilState(deleteFolderModalCurrentFolderId);
  const location = useLocation();
  const history = useHistory();
  const [, setErrorState] = useState<{
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
  const [isFetchingFolder, currentFolder, folders, dashboards, looks] =
    useCurrentFolder({
      folderId: folderId,
      handleErrorsCallback: handleErrors,
    });

  const successCallback = () => {
    if (
      location.pathname
        .toLowerCase()
        .includes(ReportFoldersRoute.path.toLowerCase())
    )
      RedirectTo({
        history,
        path: `${ReportFoldersRoute.path}/${currentFolder?.parentId}`,
      });
  };

  const deleteModalProps: DeleteModalProps = {
    formSubmitCallback: async () => await deleteFolder(currentFolder?.id || -1),
    successCallback: successCallback,
    successMessage: t('folderDeleteSuccess'),
    failureMessage: t('folderDeleteFail'),
    errorMessage: t('folderDeleteError'),
    typeOfItemToDelete: 'Folder',
    headerText: `${t('folderDeleteHeader')} “${currentFolder?.name}”`,
    primaryButtonText: t('folderDeleteButton'),
    autoFocus: true,
    t: t,
    visible: visible,
    setVisible: (isVisible: boolean) => setVisible(isVisible),
    folderCount: folders.length,
    dashboardCount: dashboards.length,
    lookCount: looks.length,
    loading: isFetchingFolder,
  };

  return <DeleteModal {...deleteModalProps} />;
};

export default withTranslation('ModalWindow')(DeleteFolderModal);
