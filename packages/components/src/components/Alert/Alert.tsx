import { lighten } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';
import { StyleVariables } from '../../index';
import { SvgIconProps } from '@mui/material/SvgIcon/SvgIcon';
import { CheckCircle, Close, ErrorOutline } from '@mui/icons-material';
import Text from '../Text';
import { IconButton } from '@mui/material';

const BACKGROUND_OPACITY = 0.9;

const useStyles = makeStyles({
  alert: {
    display: 'flex',
    width: '100%',
    color: StyleVariables.colors.text.default,
    padding: `${StyleVariables.spacing(2)} ${StyleVariables.spacing(
      2
    )} ${StyleVariables.spacing(2)} ${StyleVariables.spacing(1)}`,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderRadius: StyleVariables.spacing(0.5),
    backgroundColor: StyleVariables.colors.surface.default,
    alignItems: 'center',
    '&.primary': {
      borderColor: StyleVariables.colors.action.primary.default,
      backgroundColor: lighten(
        StyleVariables.colors.action.primary.default,
        BACKGROUND_OPACITY
      ),
    },
    '&.success': {
      borderColor: StyleVariables.colors.text.success,
      backgroundColor: lighten(
        StyleVariables.colors.text.success,
        BACKGROUND_OPACITY
      ),
    },
    '&.error': {
      borderColor: StyleVariables.colors.text.critical,
      backgroundColor: lighten(
        StyleVariables.colors.text.critical,
        BACKGROUND_OPACITY
      ),
    },
    '&.info': {
      borderColor: StyleVariables.colors.text.info,
      backgroundColor: lighten(
        StyleVariables.colors.text.info,
        BACKGROUND_OPACITY
      ),
    },
  },
  alertIcon: {
    marginLeft: StyleVariables.spacing(0.5),
    marginRight: StyleVariables.spacing(1),
    '&.primary': {
      color: StyleVariables.colors.action.primary.default,
    },
    '&.success': {
      color: StyleVariables.colors.icon.success,
    },
    '&.error': {
      color: StyleVariables.colors.icon.critical,
    },
    '&.info': {
      color: StyleVariables.colors.icon.info,
    },
    width: StyleVariables.spacing(4),
    height: StyleVariables.spacing(4),
  },
  verticalStrip: {
    width: StyleVariables.spacing(1),
    borderTopLeftRadius: StyleVariables.spacing(0.5),
    borderBottomLeftRadius: StyleVariables.spacing(0.5),
    '&.primary': {
      backgroundColor: StyleVariables.colors.action.primary.default,
    },
    '&.success': {
      backgroundColor: StyleVariables.colors.icon.success,
    },
    '&.error': {
      backgroundColor: StyleVariables.colors.icon.critical,
    },
    '&.info': {
      backgroundColor: StyleVariables.colors.icon.info,
    },
  },
  alertWrapper: {
    borderRadius: StyleVariables.spacing(0.5),
    display: 'flex',
    flexDirection: 'row',
  },
  alertMessage: {
    flexGrow: 1,
    '&.withClose': {
      paddingRight: StyleVariables.spacing(5),
    },
  },
  alertAction: {
    color: StyleVariables.colors.icon.default,
  },
});

function AlertIcon({
  severity,
  ...props
}: { severity: AlertSeverity } & SvgIconProps) {
  switch (severity) {
    case 'success':
      return <CheckCircle {...props} />;
    case 'error':
    case 'info':
    case 'primary':
      return <ErrorOutline {...props} />;
  }
}

export type AlertSeverity = 'primary' | 'success' | 'error' | 'info';

export interface AlertProps {
  className?: string;
  message?: string;
  severity: AlertSeverity;
  onClose?: (event?: any) => void;
  children?: React.ReactNode;
  hideIcon?: boolean;
  dataTestId?: string;
}

export default function Alert({
  className,
  message,
  children,
  hideIcon,
  severity,
  onClose,
  dataTestId,
}: AlertProps) {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.alertWrapper)}>
      <div className={clsx(classes.verticalStrip, severity)} />
      <div className={clsx(classes.alert, severity)}>
        {!hideIcon && (
          <AlertIcon
            severity={severity}
            fontSize="inherit"
            className={clsx(classes.alertIcon, severity)}
          />
        )}

        <Text
          as="h6"
          className={clsx(classes.alertMessage, { withClose: !!onClose })}
          data-testid={dataTestId}
        >
          {children || message}
        </Text>

        {onClose && (
          <IconButton onClick={onClose} size="small">
            <Close className={classes.alertAction} />
          </IconButton>
        )}
      </div>
    </div>
  );
}
