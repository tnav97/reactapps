import React from 'react';
import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Button, StyleVariables, Text } from '@alcumus/components';

const useStyles = makeStyles((theme: Theme) => ({
  featureTitle: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
  },
  actionButton: {
    padding: '6px 16px',
  },
  footerSectionDescriptionText: {
    padding: '16px 0',
  },
  divider: {
    margin: '0 24px',
    [theme.breakpoints.down('sm')]: {
      margin: '24px 0',
      width: '100%',
      height: '1px',
    },
  },
  imageWrapper: {
    flexBasis: '20%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mainWrapper: {
    backgroundColor: StyleVariables.colors.surface.neutral?.disabled,
    padding: 24,
    minHeight: 370,
    marginBottom: 36,
  },
  footerWrapper: {
    backgroundColor: StyleVariables.colors.surface.default,
    width: '100%',
    padding: '0 40px',
  },
}));

interface Props {
  title: string;
  buttonText: string;
  onClick: () => void;
  startIcon: JSX.Element;
  description: JSX.Element;
}

export function ActionButton({
  title,
  buttonText,
  description,
  ...props
}: Props) {
  const classes = useStyles();

  return (
    <Grid item md={5}>
      <Text as="h5" className={classes.featureTitle}>
        {title}:
      </Text>
      <Text className={classes.footerSectionDescriptionText}>
        {description}
      </Text>
      <Button
        className={classes.actionButton}
        variant="outlined"
        size="small"
        {...props}
        rounded
      >
        {buttonText}
      </Button>
    </Grid>
  );
}
