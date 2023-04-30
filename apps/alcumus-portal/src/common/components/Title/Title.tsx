import React from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { StyleVariables, Text } from '@alcumus/components';

interface TitleStyleProps {
  verticalBarColor?: string;
}

interface TitleProps {
  title: string;
  verticalBarColor?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '30px',
    verticalAlign: 'middle',
    marginBottom: theme.spacing(1),
  },
  verticalBar: {
    width: '8px',
    height: '30px',
    backgroundColor: (props: TitleStyleProps) => props.verticalBarColor,
    marginRight: theme.spacing(1),
  },
  title: {
    color: StyleVariables.colors.text.subdued,
  },
}));

export default function Title({ title, verticalBarColor }: TitleProps) {
  const classes = useStyles({ verticalBarColor });
  return (
    <div className={classes.titleContainer}>
      {!!verticalBarColor && <div className={classes.verticalBar} />}
      <Text as="h6" component="h3" className={classes.title}>
        {title}
      </Text>
    </div>
  );
}
