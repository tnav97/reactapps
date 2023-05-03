import React, { useEffect } from 'react';
import { Grid, createTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Text from '../Text';
import Image from '../Image';
import styleVariables from '../../styles/variables';
import DAPage from '../PageWithNavbar/PageWithNavbar';
import clsx from 'clsx';
const Breakpoints = createTheme().breakpoints;

export interface ActionPageProps {
  pageTitle?: string;
  header?: React.ReactNode;
  body?: React.ReactNode;
  imgSrc?: string;
  imgAlt?: string;
  buttons?: React.ReactNode;
  imageClassName?: string;
}

const useStyles = makeStyles((theme) => ({
  page: {
    backgroundColor: styleVariables.colors.white,
    padding: 0,
  },
  header: {
    fontWeight: 600,
    color: styleVariables.colors.grey5,
    margin: '2.25rem 0 1.5rem 0',
    [Breakpoints.down('sm')]: {
      marginTop: '3rem',
    },
  },
  body: {
    fontWeight: 500,
    color: styleVariables.colors.text.default,
  },
  button: {
    margin: '0.5rem',
  },
  buttonText: {
    fontWeight: 600,
  },
  buttonsContainer: {
    marginTop: '2.5rem',
  },
  image: {
    width: '60vw',
    height: '35vh',
    maxWidth: '500px',
    margin: '0.25rem 0 ',
  },
}));

export default function ActionPage({
  pageTitle,
  header,
  body,
  imgSrc,
  imgAlt,
  buttons,
  imageClassName,
}: ActionPageProps) {
  const classes = useStyles();

  useEffect(() => {
    if (pageTitle) {
      window.document.title = pageTitle;
    }
  }, [pageTitle]);

  let bodyToRender = body;
  if (typeof body === 'string')
    bodyToRender = (
      <Text center as="h4" className={classes.body} data-testid="body">
        {body}
      </Text>
    );

  return (
    <DAPage>
      <Grid container direction="column" alignContent="center">
        {imgSrc && (
          <Grid item container direction="column" alignItems="center">
            <Image
              src={imgSrc}
              alt={imgAlt as string}
              className={clsx(classes.image, imageClassName)}
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
        {bodyToRender && <Grid item>{bodyToRender}</Grid>}
        {buttons && (
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            className={classes.buttonsContainer}
          >
            {buttons}
          </Grid>
        )}
      </Grid>
    </DAPage>
  );
}
