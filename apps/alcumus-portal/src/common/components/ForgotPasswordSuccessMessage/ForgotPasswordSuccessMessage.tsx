import React from 'react';
import { Icon } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { StyleVariables, Text } from '@alcumus/components';
import InfoRounded from '@mui/icons-material/InfoRounded';
import clsx from 'clsx';
import Link from '../../components/Link';

const useStyles = makeStyles(() => ({
  successMessage: {
    margin: '1rem 0',
  },
  small: {
    fontSize: StyleVariables.fonts.size.xs,
  },
  checkEmailMessage: {
    backgroundColor: StyleVariables.colors.grey,
    padding: '1.5rem',
    margin: '1rem 0',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));

interface SuccessMessageProps {
  email: string;
  onResendLink: () => void;
}

export default function SuccessMessage({
  email,
  onResendLink,
}: SuccessMessageProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={clsx(classes.small, classes.successMessage)}>
      <Text as="p" variant="subtitle2" data-testid="successMessage">
        We&rsquo;ve sent a recovery link to{' '}
        <Text as="small" bold>
          {email}
        </Text>
      </Text>
      <br />
      <Text as="p" variant="subtitle2">
        Didn&rsquo;t receive anything?{' '}
        <Link
          to="/forgot-password"
          onClick={onResendLink}
          className={classes.small}
          data-testid="resendLink"
        >
          Resend link
        </Link>
      </Text>
      <div className={classes.checkEmailMessage}>
        <Icon>
          <InfoRounded />
        </Icon>
        &nbsp;&nbsp;&nbsp;{' '}
        <Text as="small" className={classes.small}>
          Please check your inbox
        </Text>
      </div>
    </div>
  );
}
