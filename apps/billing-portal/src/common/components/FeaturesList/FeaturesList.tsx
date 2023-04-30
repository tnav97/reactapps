import React from 'react';
import FeatureListItem from './FeaturesListItem';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

export interface FeaturesListProps {
  featureItems: Array<string>;
  className?: string | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
  featuresList: {
    flexGrow: 1,
    marginTop: '1.5rem',
    alignSelf: 'start',
    [theme.breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
  listItem: {
    margin: '0.406rem 0rem',
    [theme.breakpoints.down('xs')]: {
      margin: '0.281rem 0rem',
    },
  },
}));
export default function FeaturesList({
  featureItems,
  className,
  ...props
}: FeaturesListProps) {
  const classes = useStyles();
  return (
    <div className={clsx(className, classes.featuresList)} {...props}>
      {featureItems.map((item, index) => (
        <FeatureListItem
          featureText={item}
          key={index}
          className={classes.listItem}
        />
      ))}
    </div>
  );
}
