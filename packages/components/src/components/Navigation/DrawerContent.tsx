import React, { useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { StyleVariables } from '../../index';
import { Drawer } from './Drawer';
import clsx from 'clsx';
import { Divider, Tooltip } from '@mui/material';

export interface DrawerItem {
  title: string;
  icon?: React.ReactElement;
  href?: string;
  dataTestId: string;
  showDivider?: boolean;
  onClick?: () => void;
}

const useStyles = makeStyles({
  container: {
    marginTop: '2rem',
  },
  listItemRoot: {
    marginTop: '8px',
    height: '40px',
    borderLeft: `4px solid transparent`,
    '&.Mui-selected': {
      backgroundColor: StyleVariables.colors.surface.selected,
      borderLeft: `4px solid ${StyleVariables.colors.interactive.default}`,
      color: StyleVariables.colors.interactive.default,
      '&:hover': {
        backgroundColor: StyleVariables.colors.surface.selected,
      },
    },
  },
  selected: {
    backgroundColor: StyleVariables.colors.surface.selected,
  },
  listItemIconRoot: {
    minWidth: 'unset',
  },
  listItemIconRootOpen: {
    minWidth: '40px',
  },
  listItemIconSelected: {
    color: StyleVariables.colors.interactive.default,
  },
  drawerItemImageIcon: {
    width: '24px',
    height: '24px',
  },
  drawerItemText: {
    '& span': {
      fontFamily: StyleVariables.fonts.family.body,
      fontSize: StyleVariables.fonts.size.h6,
      fontWeight: StyleVariables.fonts.weight.medium,
    },
  },
  divider: {
    marginTop: '8px',
  },
});

interface DrawerContentProps {
  drawerItems: Array<DrawerItem>;
}

function DrawerListItem({ drawerItem: item }: { drawerItem: DrawerItem }) {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const drawerContext = useContext(Drawer.Context);
  const isDrawerOpen = drawerContext.isOpen;
  const isSelected = item.href
    ? !!matchPath(pathname, { path: item.href, exact: true })
    : false;

  const handleClick = (e, item) => {
    item.href && history.push(item.href);
    item.onClick && item.onClick(e, item);
  };

  return (
    <>
      {item.showDivider && <Divider className={classes.divider} />}
      <ListItem
        button
        key={item.title}
        classes={{
          root: classes.listItemRoot,
          selected: classes.selected,
        }}
        selected={isSelected}
        onClick={(e) => handleClick(e, item)}
        data-testid={item.dataTestId}
        aria-label={item.title}
      >
        <Tooltip title={item.title}>
          <ListItemIcon
            classes={{
              root: clsx([
                classes.listItemIconRoot,
                {
                  [classes.listItemIconSelected]: isSelected,
                  [classes.listItemIconRootOpen]: isDrawerOpen,
                },
              ]),
            }}
          >
            {item.icon}
          </ListItemIcon>
        </Tooltip>
        {isDrawerOpen && (
          <ListItemText
            primary={item.title}
            className={classes.drawerItemText}
          />
        )}
      </ListItem>
    </>
  );
}

function DrawerContent({ drawerItems }: DrawerContentProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {drawerItems.map((item, index) => (
        <DrawerListItem key={index} drawerItem={item} />
      ))}
    </div>
  );
}

export default DrawerContent;
