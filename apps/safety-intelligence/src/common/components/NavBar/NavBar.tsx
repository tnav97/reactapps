import React, { FunctionComponent } from 'react';
import {
  DrawerContent,
  DrawerItem,
  Navigation,
  Page,
} from '@alcumus/components';
import MToolbar from '@mui/material/Toolbar';
import { createStyles, makeStyles } from '@mui/styles';
import '../../theme/SafetyIntelligenceTheme';
import AppMenu from './AppMenu';
import UserMenu from './UserMenu';
import { logout } from '../../../server/models/logout';
import Toast from '../Toast/Toast';
import FoldersRoute from '../../../routes/FoldersRoute';
import FavoriteRoute from '../../../routes/FavoriteRoute';
import PopularRoute from '../../../routes/PopularRoute';
import RecentRoute from '../../../routes/RecentRoute';
import ReportsRoute from '../../../routes/ReportsRoute';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import { TFunction, withTranslation } from 'react-i18next';

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  t: TFunction;
};

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      flexGrow: 1,
    },
    root: {
      display: 'flex',
    },
    safetyIntelligencePage: {
      padding: 0,
    },
  })
);

const NavBar: FunctionComponent<Props> = ({ children, disabled, t }: Props) => {
  const personalFolderId = localStorage.getItem('personal_folder_id');

  const drawerItems: DrawerItem[] = [
    {
      dataTestId: 'drawerFolders',
      title: t(FoldersRoute.friendlyName),
      href: FoldersRoute.path,
      icon: <FolderOutlinedIcon />,
    },
    {
      dataTestId: 'drawerReports',
      title: t(ReportsRoute.friendlyName),
      href: ReportsRoute.path,
      icon: <AssessmentOutlinedIcon />,
    },
    {
      dataTestId: 'drawerFavorite',
      title: t(FavoriteRoute.friendlyName),
      href: FavoriteRoute.path,
      icon: <FavoriteBorderOutlinedIcon />,
    },
    {
      dataTestId: 'drawerRecent',
      title: t(RecentRoute.friendlyName),
      href: RecentRoute.path,
      icon: <QueryBuilderOutlinedIcon />,
    },
    {
      dataTestId: 'drawerPopular',
      title: t(PopularRoute.friendlyName),
      href: PopularRoute.path,
      icon: <TrendingUpOutlinedIcon />,
    },
    {
      title: localStorage.getItem('user_first_name')
        ? `${localStorage.getItem('user_first_name')}'s ${t('folder')}`
        : `${t('personalFolder')}`,
      href: `${FoldersRoute.path}/${personalFolderId}`,
      icon: <FolderSharedOutlinedIcon />,
      dataTestId: 'drawerPersonalFolder',
      showDivider: true,
    },
  ];

  const classes = useStyles();

  return (
    <Page className={classes.safetyIntelligencePage}>
      <div className={classes.root}>
        <Navigation
          logoUrl={'/images/alcumus-logo-with-tagline.svg'}
          logoAltText={'Alcumus Logo'}
          logoRedirect="/"
          userContent={<UserMenu onLogout={logout} />}
          drawerContent={<DrawerContent drawerItems={drawerItems} />}
          contextChooser={<AppMenu disabled={disabled} />}
        />
        <main id="safety-intelligence-v2" className={classes.content}>
          <Toast />
          <MToolbar />
          {children}
        </main>
      </div>
    </Page>
  );
};

export default withTranslation(['translation', 'AriaLabels'])(NavBar);
