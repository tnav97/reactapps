/* eslint-disable react/display-name */
import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { atom, useRecoilState } from 'recoil';
import { IFolderDto } from '../../../dtos/folderDto';
import { getAllEditableFoldersFor } from '../../../server/models/folder';
import { DataNode } from 'rc-tree-select/lib/interface';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { TreeSelect } from 'antd';
import { TreeSelectProps } from 'antd/lib/tree-select';
import { makeStyles } from '@mui/styles';
import { StyleVariables } from '@alcumus/components';

interface Props {
  visible: boolean;
  defaultFolderId?: number | undefined;
  rootFolderIds?: string[] | undefined;
  listOnlyEditableFolders?: boolean | true;
  t: TFunction;
}

const foldersTreeDataState = atom<DataNode[] | undefined>({
  key: 'foldersTreeDataState',
  default: undefined,
});

export const selectedFolderState = atom<DataNode | undefined>({
  key: 'selectedFolderState',
  default: undefined,
});

const useStyles = makeStyles(() => ({
  treeInput: {
    borderLeft: `4px solid ${StyleVariables.colors.border.critical}`,
    borderRadius: '8px',
    height: 40,
  },
}));

const FoldersTree: FunctionComponent<Props> = ({ visible, t }: Props) => {
  const [selectedFolder, setSelectedFolder] = useRecoilState<
    DataNode | undefined
  >(selectedFolderState);
  const [foldersData, setFoldersData] = useRecoilState<DataNode[] | undefined>(
    foldersTreeDataState
  );
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const isMounted = useRef(true);
  const classes = useStyles();
  const onChange = (value: string | number | undefined, label: ReactNode[]) => {
    setSelectedFolder({ value: value, label: label, key: value });
  };

  const createTreeForParent = (
    folders: IFolderDto[],
    rootId: number
  ): DataNode[] | undefined => {
    const folderTree: DataNode[] = [];

    for (let i = 0; i < folders.length; i++) {
      const treeData: DataNode = {
        title: folders[i].name,
        value: folders[i].id,
        key: folders[i].id,
        children: [],
      };

      if (folders[i].parentId === rootId) {
        const children = createTreeForParent(folders, folders[i].id);

        if (children && children?.length > 0) {
          treeData.children = children;
        }

        folderTree.push(treeData);
      }
    }

    return folderTree;
  };

  const createTree = (
    flatListFolders: IFolderDto[],
    rootFolderIds?: number[] | undefined
  ): DataNode[] | undefined => {
    const folderTree: DataNode[] = [];

    if (!rootFolderIds) {
      rootFolderIds = flatListFolders
        .filter(
          (folder) => !flatListFolders.find((x) => folder.parentId === x.id)
        )
        .map((folder) => folder.parentId)
        .filter(
          (folderId, index, folderIds) => folderIds.indexOf(folderId) === index
        );
    }

    rootFolderIds.forEach((rootId) => {
      const treeWithRootNodes = createTreeForParent(flatListFolders, rootId);
      treeWithRootNodes?.forEach((rootNode) => folderTree.push(rootNode));
    });

    return folderTree;
  };

  const getFolders = useCallback(() => {
    if (isMounted.current) {
      setIsLoadingData(true);
      getAllEditableFoldersFor()
        .then((folders) => {
          if (folders) {
            folders = folders.filter((folder) => folder.creatorId !== null);
            const foldersAsTree = createTree(folders);
            if (foldersAsTree) {
              setFoldersData(foldersAsTree);
            }
          }
        })
        .finally(() => {
          if (isMounted.current) {
            setIsLoadingData(false);
          }
        });
    }
  }, [foldersData, setFoldersData, setSelectedFolder, visible]);

  useEffect(() => {
    getFolders();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const defaults: TreeSelectProps<string | number | undefined> = {
    id: 'folderTreeSelector',
    bordered: true,
    onChange: onChange,
    placeholder: t('selectAFolder'),
    value: selectedFolder?.value,
    loading: isLoadingData,
    dropdownStyle: { maxHeight: 400, overflow: 'auto' },
    notFoundContent: (
      <div className={'p-20 text-center'}>{t('noFoldersFound')}</div>
    ),
    treeIcon: () => {
      return <i className={`fa fa-folder p-right10`} aria-hidden="true" />;
    },
    treeData: foldersData,
  };
  return <TreeSelect {...defaults} className={classes.treeInput} />;
};

export default withTranslation()(FoldersTree);
