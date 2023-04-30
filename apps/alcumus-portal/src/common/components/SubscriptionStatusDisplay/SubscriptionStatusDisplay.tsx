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

type statusTypes = 'active' | 'disabled';

export interface StatusDisplayProps {
  status: statusTypes;
  t: TFunction;
}
function getStylesFromStatus(status: statusTypes): {
  icon: OutlinedIconType;
  iconColor: string;
  containerBackgroundColor: string;
} {
  switch (status) {
    case 'active':
      return {
        icon: 'check',
        iconColor: StyleVariables.colors.icon.success,
        containerBackgroundColor: '#EDFFEE',
      };
    case 'disabled':
      return {
        icon: 'do_disturb',
        iconColor: StyleVariables.colors.icon.default,
        containerBackgroundColor: StyleVariables.colors.surface.hover,
      };
  }
}

export function SubscriptionStatusDisplay({ t, status }: StatusDisplayProps) {
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
