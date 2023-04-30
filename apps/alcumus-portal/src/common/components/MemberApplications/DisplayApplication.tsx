import React from 'react';
import { makeStyles } from '@mui/styles';
import { Text } from '@alcumus/components';
import { Box } from '@mui/material';

const useStyles = makeStyles({
  alcumusLogo: {
    marginRight: '0.5rem',
  },
});

export const DisplayApplication = ({
  appName,
  className,
}: {
  appName: string;
  className?: string;
}) => {
  const classes = useStyles();
  return (
    <Box display="flex" className={className}>
      <img
        src="/images/alcumus-logo.svg"
        alt="alcumus logo"
        className={classes.alcumusLogo}
      />
      <Text data-testid={appName}>{appName}</Text>
    </Box>
  );
};
