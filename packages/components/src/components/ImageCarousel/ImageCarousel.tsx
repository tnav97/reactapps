import React, { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import ImageCarouselItem from './ImageCarouselItem';
import { OutlinedIcon, StyleVariables } from '../../index';
import { useWindowSize } from '@alcumus/hooks';

export interface ImageCarouselProps {
  images: string[];
  maxItemsToDisplay?: number;
  imageWidth?: string;
}

const useStyles = makeStyles(() => ({
  carouselWrap: {
    display: 'flex',
  },
  carouselContainer: {
    whiteSpace: 'nowrap',
    transition: 'transform 0.3s',
    overflow: 'hidden',
  },
  carouselInner: {
    position: 'relative',
    width: '100%',
  },
  carouselButtonPrev: {
    position: 'absolute',
    top: '50%',
    left: '0%',
    border: StyleVariables.colors.base.white,
    background: 'transparent',
  },
  carouselButtonNext: {
    position: 'absolute',
    top: '50%',
    right: '0%',
    border: StyleVariables.colors.base.white,
    background: 'transparent',
  },
}));

export default function ImageCarousel({
  images,
  maxItemsToDisplay = 4,
  imageWidth = '50%',
}: ImageCarouselProps): JSX.Element {
  const classes = useStyles();
  const size = useWindowSize();
  const length = images.length;
  const [itemsToDisplay, setItemsToDisplay] = useState(3);
  const [maxLength, setMaxLength] = useState(1);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [imagePadding, setImagePadding] = useState(100 / maxLength);

  useEffect(() => {
    if (size.width === undefined) {
      setItemsToDisplay(1);
    } else if (size.width <= 600) {
      setItemsToDisplay(1);
    } else if (size.width > 600 && size.width <= 900) {
      setItemsToDisplay(2);
    } else {
      setItemsToDisplay(maxItemsToDisplay);
    }
    setMaxLength(length < itemsToDisplay ? length : itemsToDisplay);
    setImagePadding(100 / maxLength);
  });

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = length - 1;
    }
    if (newIndex >= length) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  const generateImages = () => {
    const displayImages: JSX.Element[] = [];
    for (let i = activeIndex; i < activeIndex + maxLength; i++) {
      let displayIndex = i;
      if (i >= length) {
        displayIndex = i % length;
      }

      displayImages.push(
        <ImageCarouselItem
          imageUrl={images[displayIndex]}
          key={displayIndex}
          padding={imagePadding}
          imageWidth={imageWidth}
        />
      );
    }
    return displayImages;
  };
  return (
    <>
      <div className={classes.carouselWrap}>
        <div className={classes.carouselInner}>
          <button
            className={classes.carouselButtonPrev}
            onClick={() => {
              updateIndex(activeIndex - 1);
            }}
          >
            <OutlinedIcon icon={'arrow_back_ios'} />
          </button>
          <div className={classes.carouselContainer}>{generateImages()}</div>
          <button
            className={classes.carouselButtonNext}
            onClick={() => {
              updateIndex(activeIndex + 1);
            }}
          >
            <OutlinedIcon icon={'arrow_forward_ios'} />
          </button>
        </div>
      </div>
    </>
  );
}
