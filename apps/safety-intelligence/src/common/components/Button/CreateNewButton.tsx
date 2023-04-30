import {
  Button as BaseButton,
  StyleVariables,
  Text,
} from '@alcumus/components';
import { Menu, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AssessmentOutlined,
  DashboardOutlined,
  ExpandMore,
  FolderOutlined,
} from '@mui/icons-material';
import { useSetRecoilState } from 'recoil';
import { createFolderModalVisibleState } from '../FoldersPage/CreateFolderModal';
import { createDashboardModalVisibleState } from '../Modals/CreateDashboardModal';
import { createLookModalVisibleState } from '../Modals/CreateLookModal';

interface ButtonStyleProps {
  size: 'sm' | 'med';
}
interface Props {
  buttonSize: 'sm' | 'med';
}
const useStyles = makeStyles((theme) => ({
  buttonBase: {
    borderRadius: 100,
    padding: (props: ButtonStyleProps) =>
      props.size === 'sm' ? '6px 12px 6px 16px' : '8px 20px 8px 24px',
  },
  buttonText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    lineHeight: (props: ButtonStyleProps) =>
      props.size === 'sm'
        ? StyleVariables.fonts.lineHeight.h6
        : StyleVariables.fonts.lineHeight.h5,
    fontSize: (props: ButtonStyleProps) => (props.size === 'sm' ? 14 : 16),
  },
  endIcon: {
    color: StyleVariables.colors.white,
    marginLeft: theme.spacing(1),
  },
  root: {
    marginTop: 4,
  },
  paper: {
    boxShadow: `0 2px 8px ${StyleVariables.colors.boxShadowGrey}`,
    borderRadius: theme.spacing(1),
    border: `1px solid ${StyleVariables.colors.border.default}`,
    width: (props: ButtonStyleProps) => (props.size === 'sm' ? 155 : 170),
  },
  menuItem: {},
  menuIcon: {
    marginRight: theme.spacing(1),
    color: StyleVariables.colors.grey4,
  },
}));

function CreateNewButton({ buttonSize }: Props) {
  const classes = useStyles({ size: buttonSize });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation(['translation', 'AriaLabels']);
  const setCreateFolderModalVisibility = useSetRecoilState(
    createFolderModalVisibleState
  );
  const setCreateDashboardModalVisibility = useSetRecoilState(
    createDashboardModalVisibleState
  );
  const setCreateLookModalVisibleState = useSetRecoilState(
    createLookModalVisibleState
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFolderClick = () => {
    setAnchorEl(null);
    setCreateFolderModalVisibility(true);
  };

  const handleDashboardClick = () => {
    setAnchorEl(null);
    setCreateDashboardModalVisibility(true);
  };

  const handleLookClick = () => {
    setAnchorEl(null);
    setCreateLookModalVisibleState(true);
  };

  return (
    <>
      <BaseButton
        aria-label={t('createNew', { ns: 'AriaLabels' })}
        uppercase={false}
        rounded
        className={classes.buttonBase}
        size={buttonSize === 'sm' ? 'small' : 'medium'}
        onClick={(e) => handleClick(e)}
        data-testid="createNewButton"
      >
        <Text as="h5" center className={classes.buttonText}>
          {t('createNewButton', { ns: 'translation' })}
        </Text>
        <ExpandMore className={classes.endIcon} />
      </BaseButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className={classes.root}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PopoverClasses={{
          paper: classes.paper,
        }}
        getContentAnchorEl={null}
      >
        <MenuItem
          onClick={handleFolderClick}
          className={classes.menuItem}
          data-testid="createFolder"
          aria-label={t('createFolder', { ns: 'AriaLabels' })}
        >
          <FolderOutlined className={classes.menuIcon} />
          {t('folder', { ns: 'translation' })}
        </MenuItem>
        <MenuItem
          onClick={handleDashboardClick}
          className={classes.menuItem}
          data-testid="createDashboard"
          aria-label={t('createDashboard', { ns: 'AriaLabels' })}
        >
          <DashboardOutlined className={classes.menuIcon} />
          {t('dashboard', { ns: 'translation' })}
        </MenuItem>
        <MenuItem
          onClick={handleLookClick}
          className={classes.menuItem}
          data-testid="createLook"
          aria-label={t('createLook', { ns: 'AriaLabels' })}
        >
          <AssessmentOutlined className={classes.menuIcon} />
          {t('look', { ns: 'translation' })}
        </MenuItem>
      </Menu>
    </>
  );
}

export default CreateNewButton;
