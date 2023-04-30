import React from 'react';
import { Button, StyleVariables, Text } from '@alcumus/components';
import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { TFunction } from 'i18next';

export interface MyAccountSectionProps {
  className?: string;
  editable?: boolean;
  onEdit?: () => void;
  header: string;
  subHeader?: string;
  t: TFunction;
  children: React.ReactNode;
  'data-testid'?: string;
}

export const myAccountDataTestIds = {
  container: 'container',
  header: 'header',
  subHeader: 'subHeader',
  editButton: 'editButton',
};

const useStyles = makeStyles({
  paper: {
    padding: '1.5rem',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: StyleVariables.spacing(1),
  },
  header: { fontWeight: StyleVariables.fonts.weight.medium },
  subHeader: {
    marginTop: StyleVariables.spacing(0.5),
    color: StyleVariables.colors.text.subdued,
  },
  childrenContainer: {
    marginTop: StyleVariables.spacing(4),
  },
});

export default function MyAccountSection({
  className,
  editable = false,
  header,
  subHeader,
  onEdit,
  t,
  children,
  'data-testid': dataTestId,
}: MyAccountSectionProps) {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={clsx([classes.paper, className])}>
      <Grid
        container
        justifyContent="space-between"
        data-testid={myAccountDataTestIds.container}
      >
        <Text
          as="h4"
          className={classes.header}
          data-testid={myAccountDataTestIds.header}
        >
          {header}
        </Text>
        {editable && (
          <Button
            rounded
            variant="outlined"
            onClick={onEdit}
            data-testid={dataTestId || myAccountDataTestIds.editButton}
          >
            {t('edit')}
          </Button>
        )}
      </Grid>
      <Grid>
        {subHeader && (
          <Text
            as="small"
            className={classes.subHeader}
            data-testid={myAccountDataTestIds.subHeader}
          >
            {subHeader}
          </Text>
        )}
      </Grid>
      <div className={classes.childrenContainer}>{children}</div>
    </Paper>
  );
}
