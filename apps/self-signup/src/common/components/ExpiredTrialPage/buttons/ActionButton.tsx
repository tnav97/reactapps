import { makeStyles } from '@mui/styles';
import React, { ReactNode } from 'react';
import { Button, Text } from '@alcumus/components';

const useStyles = makeStyles({
  button: {
    margin: '0.5rem',
  },
  buttonText: {
    fontWeight: 600,
    marginRight: '0.75rem',
  },
});

export interface ActionButtonProps {
  [key: string]: any;

  text: string;
  icon?: ReactNode;
  onClick: Function;
}

export default function ActionButton({
  text,
  icon,
  onClick,
  ...rest
}: ActionButtonProps) {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      rounded
      size="large"
      variant="contained"
      onClick={onClick}
      {...rest}
    >
      <Text center as="h5" className={classes.buttonText}>
        {text}
      </Text>
      {icon}
    </Button>
  );
}
