import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles } from '@mui/styles';
import { Image, OutlinedIcon, StyleVariables } from '@alcumus/components';
import clsx from 'clsx';
import { UserProfile } from '../../types';
import OrganizationSelector from './OrganizationSelector';
import { IconButton, Menu, MenuItem, Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userContent: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    userEmail: {
      fontSize: StyleVariables.fonts.size.xs,
      fontWeight: StyleVariables.fonts.weight.bold,
      color: StyleVariables.colors.text.subdued,
    },
    menuButton: {
      display: 'flex',
      color: StyleVariables.colors.icon.default,
      justifyItems: 'center',
    },
    userProfileMenu: {
      display: 'flex',
      marginLeft: '1rem',
      alignItems: 'center',
    },
    userProfile: {
      width: '35px',
      height: '35px',
    },
    userProfileMenuDropdown: {
      '& > .MuiPaper-root.MuiMenu-paper': {
        top: '3.5rem !important',
      },
    },
    [theme.breakpoints.only('xs')]: {
      squeezeText: {
        textOverflow: 'ellipsis',
        width: '43px',
      },
    },
    desktopUserMenu: {
      zIndex: 1,
      display: 'inline-block',
      [theme.breakpoints.up('xs')]: {
        display: 'flex',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    mobileUserMenu: {
      zIndex: 2,
      [theme.breakpoints.up('xs')]: {
        display: 'none',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
      },
    },
  })
);

interface UserMenuProps {
  user?: UserProfile;
  onLogout: () => void;
}

export default function UserMenu({ onLogout, user }: UserMenuProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const { t } = useTranslation('translation');

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <div className={classes.desktopUserMenu}>
        {(user?.organizations || []).length > 0 && <OrganizationSelector />}
        <div className={classes.userProfileMenu}>
          <Image
            src="/icons/Profile.svg"
            alt="User Profile"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            data-testid="profileImage"
            className={classes.userProfile}
            onClick={handleProfileMenuOpen}
          />
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id="primary-search-account-menu"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            className={classes.userProfileMenuDropdown}
          >
            <MenuItem data-testid="settings" component={Link} to="/settings">
              {t('settings')}
            </MenuItem>
            <MenuItem data-testid="logoutLink" onClick={handleLogout}>
              {t('logout')}
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div className={classes.mobileUserMenu}>
        <IconButton
          color="inherit"
          aria-label="Settings"
          className={clsx(classes.menuButton)}
          data-testid="settingsIcon"
          onClick={handleProfileMenuOpen}
        >
          <OutlinedIcon icon="settings" />
        </IconButton>
      </div>
    </React.Fragment>
  );
}
