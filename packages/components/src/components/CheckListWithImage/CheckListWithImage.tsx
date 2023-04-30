import React from 'react';
import { makeStyles } from '@mui/styles';

import { SplitWithImage, ImageProps } from '../SplitWithImage/SplitWithImage';
import CheckedItem, { CheckedItemProps } from './CheckedItem';
import styleVariables from '../../styles/variables';

export interface CheckListWithImageProps extends ImageProps {
  items: Array<CheckedItemProps>;
}

const useStyles = makeStyles({
  checkItem: { marginBottom: styleVariables.spacing(5) },
});

export default function CheckListWithImage({
  items,
  imageAltText,
  imageUrl,
}: CheckListWithImageProps) {
  const classes = useStyles();
  return (
    <SplitWithImage
      leftGridSize={5}
      rightGridSize={4}
      spacing={3}
      imageAltText={imageAltText}
      imageUrl={imageUrl}
      mdDownHide
    >
      <div>
        {items.map(({ header, details }) => (
          <CheckedItem
            key={header}
            header={header}
            details={details}
            className={classes.checkItem}
          />
        ))}
      </div>
    </SplitWithImage>
  );
}
