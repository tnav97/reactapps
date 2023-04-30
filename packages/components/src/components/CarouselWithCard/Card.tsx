import { Card as BaseCard, CardHeader, CardContent, CardMedia } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import styleVariables from '../../styles/variables';
import Text from '../Text';

export interface CardProps {
  image?: string | '';
  title?: string;
  description?: string;
  name?: string;
  designation?: string;
}
const useStyles = makeStyles(() => ({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: styleVariables.colors.base.white,
    listStyle: 'none',
    flexWrap: 'wrap',
    padding: '24px',
  },
  image: {
    maxWidth: '50%',
    height: 'auto',
    position: 'absolute',
    margin: 'auto',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageContainer: {
    width: '50%',
    height: '120px',
    margin: '0 auto',
    position: 'relative',
  },
}));
export default function Card({
  image,
  title,
  description,
  name,
  designation,
}: CardProps): JSX.Element {
  const classes = useStyles();
  return (
    <BaseCard className={classes.card}>
      <div className={classes.imageContainer}>
        <CardMedia component="img" image={image} className={classes.image} />
      </div>
      <CardHeader
        title={title}
        style={{ color: styleVariables.colors.base.info }}
      />
      <CardContent>
        <Text as="p">{description}</Text>
        <Text as="p" style={{ lineHeight: styleVariables.fonts.lineHeight.h1 }}>
          {name}
        </Text>
        <Text as="p">{designation}</Text>
      </CardContent>
    </BaseCard>
  );
}
