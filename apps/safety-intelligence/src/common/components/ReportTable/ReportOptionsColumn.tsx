import React, { FunctionComponent, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { IconButton, Menu, MenuItem } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import MoreVert from '@mui/icons-material/MoreVert';
import { StyleVariables, TranslateReady } from '@alcumus/components';
import clsx from 'clsx';
import { useRecoilState } from 'recoil';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import Analytics from '@alcumus/analytics-package';

import {
  moveDashboardModalDashboardId,
  moveDashboardModalDashboardName,
  moveDashboardModalFolderId,
  moveDashboardModalFolderName,
  moveDashboardModalVisibleState,
} from '../Modals/MoveDashboardModal';
import { ReportListItemProps } from '../../../domain/reportListItemProps';
import {
  deleteFolderModalCurrentFolderId,
  deleteFolderModalVisibleState,
} from '../FoldersPage/DeleteFolderModal';

type Props = {
  showDownload?: boolean;
  showSchedule?: boolean;
  showEdit?: boolean;
  showMove?: boolean;
  showDelete?: boolean;
  disabled?: boolean;
  editFunction?: () => void;
  className?: string;
  row?: ReportListItemProps;
  t: TFunction;
  tReady: boolean;
  enableDelete?: boolean;
  currentFolderId?: number;
};

const useStyles = makeStyles({
  deleteButton: {
    color: `${StyleVariables.colors.action.critical.default}`,
    '& .MuiSvgIcon-root': {
      color: `${StyleVariables.colors.action.critical.default} !important`,
    },
  },
  kebabIcon: {
    borderRadius: 4,
    padding: 8,
    '&:hover': {
      backgroundColor: StyleVariables.colors.grey2,
    },
    '&:active,&[aria-expanded="true"]': {
      backgroundColor: StyleVariables.colors.surface.selected,
      color: StyleVariables.colors.action.primary.default,
    },
  },
  paper: {
    boxShadow: `0px 2px 8px ${StyleVariables.colors.boxShadowGrey}`,
    borderRadius: '8px',
    border: `1px solid ${StyleVariables.colors.border.default}`,
  },
  menuItem: {
    '& .MuiSvgIcon-root': {
      marginRight: 8,
      color: StyleVariables.colors.grey4,
    },
  },
});

const ReportOptionsColumn: FunctionComponent<Props> = ({
  showEdit,
  showMove,
  showDelete,
  editFunction,
  className,
  row,
  t,
  tReady,
  enableDelete,
  currentFolderId,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const [, setMoveDashboardModalVisible] = useRecoilState(
    moveDashboardModalVisibleState
  );
  const [, setMoveDashboardId] = useRecoilState(moveDashboardModalDashboardId);
  const [, setMoveDashboardName] = useRecoilState(
    moveDashboardModalDashboardName
  );
  const [, setMoveFolderId] = useRecoilState(moveDashboardModalFolderId);
  const [, setMoveFolderName] = useRecoilState(moveDashboardModalFolderName);
  const [, setDeleteFolderModalVisible] = useRecoilState(
    deleteFolderModalVisibleState
  );
  const [, setDeleteCurrentFolderId] = useRecoilState(
    deleteFolderModalCurrentFolderId
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    Analytics.getInstance().trackWithCategory(
      'Reports',
      'Opened a report menu'
    );
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    if (editFunction) {
      editFunction();
      Analytics.getInstance().trackWithCategory(
        'Reports',
        'Clicked Rename Dashboard'
      );
    }
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setDeleteCurrentFolderId(row?.id || currentFolderId || -1);
    setDeleteFolderModalVisible(true);
    setAnchorEl(null);
    Analytics.getInstance().trackWithCategory('Reports', 'Deleted a report');
  };

  const handleMove = () => {
    setMoveDashboardId(row?.id.toString() || '');
    setMoveDashboardName(row?.name || '');
    setMoveFolderId(row?.folderId || -1);
    setMoveFolderName(row?.folder || '');
    setMoveDashboardModalVisible(true);
    setAnchorEl(null);
    Analytics.getInstance().trackWithCategory('Reports', 'Moved a report');
  };

  const classes = useStyles();

  return (
    <>
      <TranslateReady tReady={tReady}>
        <IconButton
          data-testid="reportMenu"
          aria-haspopup="true"
          aria-expanded={!!open}
          onClick={handleClick}
          className={clsx(classes.kebabIcon, className)}
          disableRipple
        >
          <MoreVert />
        </IconButton>
        <Menu
          data-testid="reportMenu"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': t('reportMenu', { ns: 'AriaLabels' }),
            classes: {
              root: classes.menuItem,
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          getContentAnchorEl={null}
          PopoverClasses={{
            paper: classes.paper,
          }}
        >
          {!showEdit && (
            <MenuItem
              onClick={handleEdit}
              disabled={!enableDelete}
              data-testid="Rename"
              aria-label={t('rename', { ns: 'AriaLabels' })}
            >
              <EditOutlinedIcon />
              {t('rename', { ns: 'ReportOptions' })}
            </MenuItem>
          )}
          {!!showMove && (
            <MenuItem
              onClick={handleMove}
              data-testid="Move"
              aria-label={t('move', { ns: 'AriaLabels' })}
            >
              <DriveFileMoveOutlinedIcon />
              {t('move', { ns: 'ReportOptions' })}
            </MenuItem>
          )}
          {!!showDelete && enableDelete && (
            <MenuItem
              onClick={handleDelete}
              disabled={!enableDelete}
              className={classes.deleteButton}
              data-testid="Delete"
              aria-label={t('delete', { ns: 'AriaLabels' })}
            >
              <DeleteOutlineOutlinedIcon />
              {t('delete', { ns: 'ReportOptions' })}
            </MenuItem>
          )}
        </Menu>
      </TranslateReady>
    </>
  );
};

export default withTranslation(['ReportOptions', 'AriaLabels'])(
  ReportOptionsColumn
);
