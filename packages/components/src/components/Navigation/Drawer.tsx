import React, { createContext } from 'react';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import MDrawer from '@mui/material/Drawer';
import MToolbar from '@mui/material/Toolbar';
import StyleVariables from '../../styles/variables';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { OutlinedIcon } from '../Icon';

interface DrawerStyleProps {
  drawerOpen: boolean;
}

const DrawerWidth = {
  desktop: {
    opened: '250px',
    closed: '64px',
  },
  mobile: {
    opened: '100%',
    closed: '0px',
  },
};

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    flexShrink: 0,
    transition: 'width 500ms',
    width: (props: DrawerStyleProps) =>
      props.drawerOpen
        ? DrawerWidth.desktop.opened
        : DrawerWidth.desktop.closed,
    [theme.breakpoints.down('md')]: {
      width: (props: DrawerStyleProps) =>
        props.drawerOpen
          ? DrawerWidth.mobile.opened
          : DrawerWidth.mobile.closed,
    },
  },
  drawerContainer: {
    overflowX: 'hidden',
    overflowY: 'scroll',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
    transition: 'width 500ms',
  },
  drawerPaper: {
    transition: 'width 500ms',
    width: (props: DrawerStyleProps) =>
      props.drawerOpen
        ? DrawerWidth.desktop.opened
        : DrawerWidth.desktop.closed,
    [theme.breakpoints.down('sm')]: {
      width: (props: DrawerStyleProps) =>
        props.drawerOpen
          ? DrawerWidth.mobile.opened
          : DrawerWidth.mobile.closed,
    },
  },
  drawerMobileClose: {
    marginBottom: '24px',
    margin: '18px',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerMobileCloseIcon: {
    fontSize: '18px',
  },
  menuButton: {
    color: StyleVariables.colors.text.subdued,
    transition: 'transform 500ms',
    margin: '16px',
    alignSelf: 'flex-end',
    transform: (props: DrawerStyleProps) =>
      props.drawerOpen ? 'rotate(-180deg)' : 'rotate(0)',
  },
  drawerMenu: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  divider: {
    marginBottom: '1rem',
    width: '100%',
  },
}));

export interface DrawerProps {
  /**
   * Drawer content - can be JSX markup or simple html
   */
  drawerContent: React.ReactNode;
  /**
   * Determines whether to show drawer as open or closed
   */
  drawerOpen: boolean;
  /**
   * Optional classname to apply to Drawer for style overrides
   */
  className?: string;
  /**
   * Optional callback function for drawer toggle
   */
  onToggleDrawer?: () => void;
  /**
   * Optional to show drawer
   * @deprecated This property is a duplicate, and is unused. Please change this to use the drawerOpen prop instead
   */
  showDrawer?: boolean;
}

export function Drawer({
  drawerOpen,
  className,
  drawerContent,
  onToggleDrawer,
}: DrawerProps) {
  const classes = useStyles({ drawerOpen: drawerOpen });

  return (
    <MDrawer
      className={clsx([classes.drawer, className])}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Drawer.Context.Provider value={{ isOpen: drawerOpen }}>
        <MToolbar />
        <div className={clsx([classes.drawerContainer])}>
          <div className={clsx()}>{drawerContent}</div>
          <div className={clsx(classes.drawerMenu)}>
            <Divider className={clsx(classes.divider)} />
            <IconButton
              size="small"
              color="inherit"
              aria-label="open drawer"
              onClick={onToggleDrawer}
              className={clsx(classes.menuButton)}
              data-testid="drawerIcon"
            >
              <OutlinedIcon icon="keyboard_double_arrow_right" />
            </IconButton>
          </div>
        </div>
      </Drawer.Context.Provider>
    </MDrawer>
  );
}

export interface IDrawerContext {
  isOpen: boolean;
}

Drawer.Context = createContext<IDrawerContext>({
  isOpen: false,
});
