import React, { FunctionComponent, PropsWithChildren } from 'react';
import { useSetRecoilState } from 'recoil';
import { withSkeletonLoading } from '../../hocs/withLoading';
import { NavLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { StyleVariables, Text } from '@alcumus/components';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ReportOptionsColumn from '../ReportTable/ReportOptionsColumn';
import { updateFolderModalVisibleState } from '../FoldersPage/UpdateFolderModal';

export interface Route {
  displayName: string;
  path: string;
}
const useStyles = makeStyles((theme) => ({
  navLink: {
    color: StyleVariables.colors.black,
  },
  container: {
    minHeight: '94%',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(3),
    backgroundColor: StyleVariables.colors.white,
  },
  subSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  children: {
    margin: theme.spacing(3),
  },
  back: {
    borderRadius: 205,
    color: StyleVariables.colors.black,
    padding: '8px 24px 8px 20px',
    '&:hover': {
      backgroundColor: StyleVariables.colors.grey2,
    },
    '&:active': {
      backgroundColor: StyleVariables.colors.border.default,
    },
  },
  backIcon: {
    marginRight: theme.spacing(1),
    color: StyleVariables.colors.grey4,
  },
  breadcrumb: {
    fontWeight: StyleVariables.fonts.weight.medium,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
  },
  backText: {
    lineHeight: StyleVariables.fonts.lineHeight.regular,
  },
  panelSettings: {
    marginLeft: 'auto',
    order: 2,
  },
  subTitle: {
    lineHeight: StyleVariables.fonts.lineHeight.regular,
    padding: '16px 0',
  },
  kebabMenu: {
    marginRight: 4,
  },
}));

export interface PanelSectionProps {
  children?: React.ReactNode;
  isLoading?: boolean | undefined;
  panelSettings?: React.ReactNode;
  subTitle?: React.ReactNode;
  footer?: React.ReactNode;
  enableGoBack?: boolean;
  disableBreadCrumb?: boolean;
  routes?: Route[];
  enableEdit?: boolean;
  enableDelete?: boolean;
  currentFolderId?: number;
}

const PanelSection: FunctionComponent<PanelSectionProps> = ({
  routes,
  children,
  panelSettings,
  footer,
  isLoading,
  enableGoBack,
  disableBreadCrumb,
  subTitle,
  enableEdit,
  enableDelete,
  currentFolderId,
}: PanelSectionProps) => {
  const panelBodyWithLoading = withSkeletonLoading(PanelBodyChildren);
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation('AriaLabels');

  const setUpdateFolderVisibility = useSetRecoilState(
    updateFolderModalVisibleState
  );

  const handleEditClick = () => {
    setUpdateFolderVisibility(true);
  };

  const getBackButton = () => {
    if (enableGoBack && history.length > 1) {
      return (
        <IconButton
          aria-label="back"
          onClick={history.goBack}
          className={classes.back}
          disableRipple
        >
          <KeyboardBackspaceIcon className={classes.backIcon} />
          <Text as="h6" className={classes.backText}>
            Back
          </Text>
        </IconButton>
      );
    }
    return null;
  };

  const getBreadcrumbs = () => {
    return routes?.map((route: Route, i) => {
      const last = routes.indexOf(route) === routes.length - 1;
      return last ? (
        <span className={classes.navLink} key={i}>
          <Text
            as="h5"
            className={classes.breadcrumb}
            data-testid={route.displayName}
          >
            {route.displayName}
          </Text>
        </span>
      ) : (
        <NavLink to={route.path} key={i} className={classes.navLink}>
          <Text
            as="h5"
            className={classes.breadcrumb}
            data-testid={route.displayName}
          >
            {route.displayName}
          </Text>
        </NavLink>
      );
    });
  };
  return (
    <section className={classes.container}>
      <div className={classes.subSection}>
        {routes && !disableBreadCrumb && (
          <>
            <Breadcrumbs
              separator={<ChevronRightOutlinedIcon />}
              aria-label={t('breadcrumb')}
              data-testid="breadcrumb"
            >
              {getBreadcrumbs()}
            </Breadcrumbs>
            {(enableEdit || enableDelete) && (
              <ReportOptionsColumn
                showEdit={enableEdit}
                showDelete={enableDelete}
                editFunction={handleEditClick}
                className={classes.kebabMenu}
                enableDelete={enableDelete}
                currentFolderId={currentFolderId}
              />
            )}
          </>
        )}
        {getBackButton()}
        <div className={classes.panelSettings}>{panelSettings}</div>
        {footer}
      </div>
      <Text className={classes.subTitle}>{subTitle}</Text>
      {children && (
        <section>
          {panelBodyWithLoading({
            children: children,
            isLoading: isLoading ?? false,
          })}
        </section>
      )}
    </section>
  );
};

export const PanelBodyChildren: FunctionComponent = ({
  children,
}: PropsWithChildren<unknown>) => {
  return <>{children}</>;
};

export default PanelSection;
