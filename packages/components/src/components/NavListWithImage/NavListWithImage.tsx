import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { NavList } from '../../index';
import styleVariables from '../../styles/variables';
import { SplitWithImage } from '../SplitWithImage/SplitWithImage';
import Text from '../Text';
import { Grid, Hidden } from '@mui/material';

export interface NavListWithImageItem {
  listItem: string;
  imageUrl: string;
  capabilityDetails: JSX.Element;
}

const useStyles = makeStyles({
  title: {
    marginBottom: styleVariables.spacing(4),
    fontWeight: styleVariables.fonts.weight.semiBold,
    wordWrap: 'break-word',
  },
});

export interface NavListWithImageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<NavListWithImageItem>;
  title: string;
}

export function NavListWithImage({
  title,
  items,
  ...rest
}: NavListWithImageProps) {
  const classes = useStyles();

  const [seletedItemIndex, setSelectedItemIndex] = useState<number>(0);
  return (
    <div {...rest}>
      <SplitWithImage
        leftGridSize={4}
        rightGridSize={5}
        spacing={3}
        data-testid="navlistwithimage-wrapper"
        imageUrl={items[seletedItemIndex].imageUrl}
        imageAltText={items[seletedItemIndex].listItem}
        mdDownHide
      >
        <div>
          <Text as="h3" className={classes.title}>
            {title}
          </Text>
          <NavList
            seletedIndex={seletedItemIndex}
            items={items.map((item) => item.listItem)}
            onItemSelect={setSelectedItemIndex}
            data-testid="navigation-list"
          />
        </div>
      </SplitWithImage>
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        <Grid item sm={1}>
          {' '}
        </Grid>
        <Hidden lgDown={true}>
          <Grid item sm={5}>
            {' '}
          </Grid>
        </Hidden>
        <Grid item sm={5}>
          <div>{items[seletedItemIndex].capabilityDetails}</div>
        </Grid>
        <Grid item sm={1}>
          {' '}
        </Grid>
      </Grid>
    </div>
  );
}
