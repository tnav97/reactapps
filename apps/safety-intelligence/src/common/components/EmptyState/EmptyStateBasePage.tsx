import React, { FunctionComponent } from 'react';
import { Image, StyleVariables, Text } from '@alcumus/components';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
interface Props {
  body?: string;
  imgSrc?: string;
  children?: React.ReactNode;
}

const useStyles = makeStyles(() => ({
  body: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    color: StyleVariables.colors.grey5,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
    marginBottom: 40,
    whiteSpace: 'pre-line',
  },
  image: {
    width: 232,
    margin: '72px 0 40px 0',
  },
}));

export const EmptyStateBasePage: FunctionComponent<Props> = ({
  body,
  imgSrc,
  children,
}: Props) => {
  const classes = useStyles();
  return (
    <Grid item container direction="column" alignItems="center">
      <Image
        src={imgSrc}
        className={classes.image}
        data-testid="img"
        alt={imgSrc as string}
      />
      <Text as="h5" center data-testid="body" className={classes.body}>
        {body}
      </Text>
      {children}
    </Grid>
  );
};
