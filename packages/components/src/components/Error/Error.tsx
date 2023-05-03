import React from 'react';
import { Grid, createTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../Page';
import Text from '../Text';
import { StyleVariables } from '../..';
import Image from '../Image';

export interface ErrorProps {
  header?: string;
  body?: React.ReactNode;
  imgSrc?: string;
  imgAlt?: string;
  children?: React.ReactNode;
}

const Breakpoints = createTheme().breakpoints;
const useStyles = makeStyles((theme) => ({
  page: {
    backgroundColor: StyleVariables.colors.white,
    padding: 0,
  },
  header: {
    fontWeight: 600,
    color: StyleVariables.colors.grey5,
    marginTop: '2rem',
    [Breakpoints.down('sm')]: {
      marginTop: '3rem',
    },
  },
  button: {
    margin: '0.5rem',
    borderRadius: '50px',
    backgroundColor: StyleVariables.colors.action.primary.default,
  },
  buttonText: {
    fontWeight: 600,
    color: StyleVariables.colors.white,
    lineHeight: StyleVariables.fonts.lineHeight.h5,
  },
  buttonsContainer: {
    marginTop: '0.5rem',
  },
  image: {
    width: '60vw',
    maxWidth: '500px',
    margin: '3rem 0',
  },
  gridContainer: {
    padding: '1rem',
  },
}));

export default function Error({
  header,
  body,
  imgSrc,
  imgAlt,
  children,
}: ErrorProps) {
  const classes = useStyles();

  return (
    <Page className={classes.page}>
      <Grid
        container
        direction="column"
        alignContent="center"
        className={classes.gridContainer}
      >
        {imgSrc && (
          <Grid item container direction="column" alignItems="center">
            <Image
              src={imgSrc}
              alt={imgAlt as string}
              className={classes.image}
              data-testid={'img'}
            />
          </Grid>
        )}
        {header && (
          <Grid item>
            <Text
              center
              as="h2"
              className={classes.header}
              data-testid="header"
            >
              {header}
            </Text>
          </Grid>
        )}
        {body && <Grid item>{body}</Grid>}
        {children && (
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            className={classes.buttonsContainer}
          >
            {children}
          </Grid>
        )}
      </Grid>
    </Page>
  );
}
