import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Image from '../Image';

export interface ImageCarouselItemProps {
  imageUrl: string;
  padding: number;
  imageWidth: string;
}

const useStyles = makeStyles(() => ({
  carouselItem: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: (props: ImageCarouselItemProps) => `${props.padding}%`,
    height: 'auto',
  },
  image: {
    width: (props: ImageCarouselItemProps) => `${props.imageWidth}`,
    height: 'auto',
  },
}));

export default function ImageCarouselItem({
  imageUrl,
  padding,
  imageWidth,
}: ImageCarouselItemProps): JSX.Element {
  const classes = useStyles({ imageUrl, padding, imageWidth });

  return (
    <div className={classes.carouselItem}>
      <Image src={imageUrl} alt={imageUrl} className={classes.image} />
    </div>
  );
}
