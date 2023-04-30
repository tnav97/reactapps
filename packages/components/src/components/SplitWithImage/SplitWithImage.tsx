import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { Grid, GridSize, GridSpacing, Hidden } from '@mui/material';
import { StyleVariables } from '../..';

export interface ImageProps {
  imageUrl: string;
  imageAltText: string;
}
export interface SplitProps extends React.HTMLAttributes<HTMLDivElement> {
  leftGridSize: GridSize;
  rightGridSize: GridSize;
  spacing?: GridSpacing;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  mdDownHide?: boolean;
}

export interface SplitWithImageProps extends SplitProps, ImageProps {
  children: React.ReactNode;
}

const useStyles = makeStyles({
  wrapper: {
    paddingTop: StyleVariables.spacing(3),
    paddingBottom: StyleVariables.spacing(3),
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export function SplitWithImage({
  leftGridSize,
  rightGridSize,
  children,
  className,
  imageUrl,
  imageAltText,
  spacing,
  mdDownHide,
}: SplitWithImageProps) {
  const classes = useStyles();

  return (
    <Split
      leftGridSize={leftGridSize}
      rightGridSize={rightGridSize}
      spacing={spacing}
      className={className}
      mdDownHide={mdDownHide}
    >
      {children}
      <img src={imageUrl} alt={imageAltText} className={classes.image} />
    </Split>
  );
}

function Split({
  leftGridSize,
  rightGridSize,
  children,
  className,
  spacing,
  mdDownHide,
  ...rest
}: SplitProps) {
  const [leftChild, rightChild] = children as React.ReactNode[];
  const classes = useStyles();
  const renderRightChild = (
    rightChild: React.ReactNode,
    mdDownHide = false
  ) => {
    if (mdDownHide)
      return (
        <Hidden lgDown={true}>
          <Grid item sm={rightGridSize}>
            {rightChild}
          </Grid>
        </Hidden>
      );
    return (
      <Grid item sm={rightGridSize}>
        {rightChild}
      </Grid>
    );
  };

  return (
    <div className={clsx(className, classes.wrapper)} {...rest}>
      <Grid
        container
        spacing={spacing}
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item sm={1}>
          {' '}
        </Grid>
        <Grid item sm={leftGridSize}>
          {leftChild}
        </Grid>
        <Grid item sm={1}>
          {' '}
        </Grid>
        {renderRightChild(rightChild, mdDownHide)}
        <Grid item sm={1}>
          {' '}
        </Grid>
      </Grid>
    </div>
  );
}
