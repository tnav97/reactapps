import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Text,
  OutlinedIcon,
  StyleVariables,
  OutlinedIconType,
} from '@alcumus/components';
import { UserDetails } from '../../types';
import { Box } from '@mui/material';

interface DisplayMemberInfoProps {
  member: UserDetails;
  className?: string;
}

const useStyles = makeStyles({
  icon: {
    height: '1rem',
    width: '1rem',
    paddingRight: '2rem',
    color: StyleVariables.colors.icon.default,
  },
  email: {
    textDecoration: 'underline',
  },
});

const DisplayMemberInfo = ({
  className,
  icon,
  data,
  textStyles,
}: {
  className?: string;
  textStyles?: string;
  icon: OutlinedIconType;
  data: string;
}) => {
  const classes = useStyles();
  return (
    <Box display={'flex'} className={className}>
      <OutlinedIcon icon={icon} className={classes.icon} />
      <Text as="small" className={textStyles} data-testid={data}>
        {data}
      </Text>
    </Box>
  );
};

export const DisplayUserName = ({
  member,
  className,
}: DisplayMemberInfoProps) => (
  <DisplayMemberInfo
    icon="person"
    className={className}
    data={
      member?.username !== '' && member?.username !== null
        ? member.username
        : 'Not available'
    }
  />
);

export const DisplayEmail = ({ member, className }: DisplayMemberInfoProps) => {
  const classes = useStyles();

  return (
    <DisplayMemberInfo
      icon="email"
      className={className}
      data={
        member?.emailAddress !== '' && member?.emailAddress !== null
          ? member.emailAddress
          : 'Not available'
      }
      textStyles={classes.email}
    />
  );
};

export const DisplayPhoneNumber = ({
  member,
  className,
}: DisplayMemberInfoProps) => (
  <DisplayMemberInfo
    icon="phone"
    className={className}
    data={
      member?.phoneNumber !== '' && member?.phoneNumber !== null
        ? member.phoneNumber
        : 'Not available'
    }
  />
);

export const DisplayMFA = ({ className }: DisplayMemberInfoProps) => (
  <DisplayMemberInfo
    icon="lock"
    className={className}
    // TODO pass member.MFA
    data="MFA: Off"
  />
);
