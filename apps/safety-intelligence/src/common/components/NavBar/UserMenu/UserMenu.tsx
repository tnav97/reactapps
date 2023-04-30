import React from 'react';
import Analytics from '@alcumus/analytics-package';
import { createStyles, makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import IconButton from '@mui/material/IconButton';
import { StyleVariables, Text } from '@alcumus/components';
import { Skeleton } from '@mui/material';
import { TFunction } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import ChangePasswordModal from '../../Modals/ChangePasswordModal';
import { changePasswordModalVisibleState } from '../../Modals/ChangePasswordModal/ChangePasswordModal';

const useStyles = makeStyles((theme) =>
  createStyles({
    userContent: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    userProfileMenu: {
      '& .MuiPaper-root': {
        borderRadius: theme.spacing(1),
        boxShadow: `0px 2px 8px ${StyleVariables.colors.boxShadowGrey}`,
      },
    },
    userProfile: {
      marginLeft: '1rem',
      width: '35px',
      height: '35px',
      borderRadius: 4,
      '&:hover': {
        backgroundColor: StyleVariables.colors.grey2,
      },
      '&:active': {
        backgroundColor: StyleVariables.colors.surface.selected,
        color: StyleVariables.colors.action.primary.default,
      },
    },
    userName: {
      fontWeight: StyleVariables.fonts.weight.medium,
      color: StyleVariables.colors.text.subdued,
    },
  })
);

interface UserMenuProps {
  onLogout: () => void;
  t: TFunction;
}

function UserMenu({ onLogout, t }: UserMenuProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const userFirstName: string = localStorage.getItem('user_first_name') ?? '';
  const userLastName: string = localStorage.getItem('user_last_name') ?? '';
  const setOpenChangePasswordModal = useSetRecoilState(
    changePasswordModalVisibleState
  );
  const showChangePasswordButton = localStorage.getItem(
    'showUpdatePasswordButton'
  );
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    Analytics.getInstance().trackWithCategory('Menu', 'Profile Menu Opened');
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    setAnchorEl(null);
    Analytics.getInstance().trackWithCategory('Logout', 'User logged out');
  };

  return (
    <>
      <ChangePasswordModal />
      <Text className={classes.userName}>
        {userFirstName || <Skeleton width={100} />} {userLastName}
      </Text>
      <IconButton
        className={classes.userProfile}
        aria-label="User Menu"
        onClick={handleProfileMenuOpen}
        data-testid="userMenuIcon"
        disableRipple
      >
        <PermIdentityOutlinedIcon
          style={{ fontSize: StyleVariables.fonts.size.h2 }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        id="primary-search-account-menu"
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
        getContentAnchorEl={null}
        className={classes.userProfileMenu}
      >
        {showChangePasswordButton === 'true' && (
          <MenuItem
            data-testid="editPasswordMenuItem"
            onClick={() => setOpenChangePasswordModal(true)}
          >
            {t('editPassword')}
          </MenuItem>
        )}
        <MenuItem data-testid="logoutLink" onClick={handleLogout}>
          {t('logout')}
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
