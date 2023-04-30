import React, { useContext } from 'react';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import MAppBar from '@mui/material/AppBar';
import MToolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import Image from '../Image';
import StyleVariables from '../../styles/variables';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { RegularIcon } from '../Icon';
import { INavigationContext, Navigation } from './Navigation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: StyleVariables.colors.base.white,
      maxHeight: '80px',
      overflow: 'hidden', // Otherwise sidebar items are not clickable in Safari
    },
    appBarContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
      color: StyleVariables.colors.text.subdued,
    },
    logo: {
      '& img': {
        maxWidth: '150px',
      },
      display: 'flex',
      margin: '7px',
    },
    userContent: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      color: StyleVariables.colors.text.default,
    },
    contextChooser: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: '15px',
    },
    sideMenuButton: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
      },
    },
  })
);

export interface AppBarProps {
  logoUrl: string;
  logoAltText: string;
  logoRedirect: string;
  userContent?: React.ReactNode;
  className?: string;
  contextChooser?: React.ReactNode;
}

export default function AppBar({
  logoUrl,
  logoAltText,
  logoRedirect,
  userContent,
  className = undefined,
  contextChooser,
}: AppBarProps) {
  const classes = useStyles();
  const navigationContext = useContext<INavigationContext>(Navigation.Context);

  return (
    <MAppBar
      variant="outlined"
      position="fixed"
      className={clsx(classes.appBar, className)}
    >
      <MToolbar>
        <div className={classes.appBarContent}>
          <IconButton
            color="inherit"
            aria-label="side menu"
            className={clsx(classes.sideMenuButton)}
            onClick={navigationContext.toggleDrawer}
            data-testid="sideMenuIcon"
            size="large">
            {navigationContext.isDrawerOpen ? (
              <RegularIcon icon="close" />
            ) : (
              <RegularIcon icon="menu" />
            )}
          </IconButton>
          <div className={clsx(classes.logo)}>
            <NavLink to={logoRedirect}>
              <Image data-testid="logoImage" src={logoUrl} alt={logoAltText} />
            </NavLink>
            {!!contextChooser && (
              <div className={clsx(classes.contextChooser)}>
                {contextChooser}
              </div>
            )}
          </div>
          {!!userContent && (
            <div className={clsx(classes.userContent)}>{userContent}</div>
          )}
        </div>
      </MToolbar>
    </MAppBar>
  );
}
