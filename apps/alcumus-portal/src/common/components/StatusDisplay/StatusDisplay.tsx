import React from 'react';
import {
  OutlinedIcon,
  Text,
  StyleVariables,
  OutlinedIconType,
} from '@alcumus/components';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TFunction } from 'i18next';
import { MemberStatus } from '../../constants';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    padding: '4px 12px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: (prop: {
      iconColor: string;
      containerBackgroundColor: string;
    }) => prop.containerBackgroundColor,
  },
  icon: {
    marginRight: StyleVariables.spacing(1),
    color: (prop: { iconColor: string; containerBackgroundColor: string }) =>
      prop.iconColor,
  },
  text: { color: StyleVariables.colors.text.default },
});

export interface StatusDisplayProps {
  status: MemberStatus;
  t: TFunction;
}

function getStylesFromStatus(status: MemberStatus): {
  icon: OutlinedIconType;
  iconColor: string;
  containerBackgroundColor: string;
} {
  switch (status) {
    case MemberStatus.ACTIVE:
      return {
        icon: 'check',
        iconColor: StyleVariables.colors.icon.success,
        containerBackgroundColor: StyleVariables.colors.surface.success,
      };
    case MemberStatus.DISABLED:
      return {
        icon: 'do_disturb',
        iconColor: StyleVariables.colors.icon.default,
        containerBackgroundColor:
          StyleVariables.colors.surface.neutral.disabled,
      };
    case MemberStatus.PENDING_INVITE:
      return {
        icon: 'hourglass_empty',
        iconColor: StyleVariables.colors.icon.warningSecondary,
        containerBackgroundColor:
          StyleVariables.colors.surface.warningSecondary,
      };
    case MemberStatus.CANCELED:
      return {
        icon: 'cancel',
        iconColor: StyleVariables.colors.icon.critical,
        containerBackgroundColor: StyleVariables.colors.surface.critical,
      };
    case MemberStatus.INVITE_EXPIRED:
      return {
        icon: 'access_time',
        iconColor: StyleVariables.colors.icon.warning,
        containerBackgroundColor: StyleVariables.colors.surface.warning,
      };
    case MemberStatus.PENDING_ACCEPTANCE:
      return {
        icon: 'mail',
        iconColor: StyleVariables.colors.icon.info,
        containerBackgroundColor: StyleVariables.colors.surface.highlight,
      };
    default:
      return {
        icon: 'do_disturb',
        iconColor: StyleVariables.colors.icon.default,
        containerBackgroundColor: StyleVariables.colors.surface.hover,
      };
  }
}

export function StatusDisplay({ t, status }: StatusDisplayProps) {
  const styles = getStylesFromStatus(status);
  const classes = useStyles(styles);

  return (
    <Box display="inline-block">
      <div className={classes.container}>
        <OutlinedIcon
          icon={styles.icon}
          className={classes.icon}
          data-testid={styles.icon}
        />
        <Text className={classes.text} data-testid={`${status}-text`}>
          {t(status)}
        </Text>
      </div>
    </Box>
  );
}
