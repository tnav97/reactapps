import React from 'react';
import { makeStyles } from '@mui/styles';
import { Image, Text, StyleVariables } from '@alcumus/components';

interface ServiceProps {
  imageUrl: string;
  imageDescription: string;
  id: string;
  descriptionLine1: string;
  descriptionLine2: string;
}

const useStyles = makeStyles(() => ({
  service: {
    maxWidth: '150px',
    textAlign: 'center',
    '& img': {
      marginBottom: '1rem',
    },
  },
  serviceDescription: {
    fontWeight: StyleVariables.fonts.weight.bold,
    fontFamily: StyleVariables.fonts.family.heading,
  },
}));

export default function Service({
  imageUrl,
  imageDescription,
  id,
  descriptionLine1,
  descriptionLine2,
}: ServiceProps) {
  const classes = useStyles();
  return (
    <div className={classes.service}>
      <Image src={imageUrl} alt={imageDescription} />
      <Text
        data-testid={id}
        variant="subtitle2"
        as="span"
        className={classes.serviceDescription}
      >
        {descriptionLine1}
        <br />
        {descriptionLine2}
      </Text>
    </div>
  );
}
