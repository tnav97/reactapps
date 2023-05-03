import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { StyleVariables } from '@alcumus/components';
import { createTheme} from '@mui/material';

interface ReadMoreProps {
  children: string;
}
const Breakpoints = createTheme().breakpoints;
const useStyles = makeStyles((theme) => ({
  subtitle: {
    fontFamily: StyleVariables.fonts.family.body,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.xs,
    lineHeight: StyleVariables.fonts.lineHeight.xs,
    textAlign: 'center',
    marginTop: '12px',
    color: StyleVariables.colors.icon.default,
    marginBottom: '1rem',
    marginLeft: '15rem',
    marginRight: '15rem',
    [Breakpoints.only('md')]: {
      marginLeft: '6rem',
      marginRight: '6rem',
    },
    [Breakpoints.down('md')]: {
      marginLeft: '1.5rem',
      marginRight: '1.5rem',
      display: 'none',
    },
  },
  subtitleReadText: {
    fontFamily: StyleVariables.fonts.family.body,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.xs,
    lineHeight: StyleVariables.fonts.lineHeight.xs,
    textAlign: 'center',
    marginTop: '12px',
    color: StyleVariables.colors.text.subdued,
    marginBottom: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    [Breakpoints.up('md')]: {
      display: 'none',
    },
  },
  readText: {
    color: StyleVariables.colors.base.primary,
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function ReadMore(props: ReadMoreProps) {
  const text = props.children;
  const classes = useStyles();
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Typography className={classes.subtitle}>{text}</Typography>
      <Typography className={classes.subtitleReadText}>
        {isReadMore ? text.slice(0, 100) : text}
        <span
          onClick={() => {
            toggleReadMore();
          }}
          className={classes.readText}
        >
          {isReadMore ? '...Read more' : ' Show less'}
        </span>
      </Typography>
    </Grid>
  );
}
