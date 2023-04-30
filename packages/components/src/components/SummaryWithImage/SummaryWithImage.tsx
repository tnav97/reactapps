import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { SplitWithImage, ImageProps } from '../SplitWithImage/SplitWithImage';
import styleVariables from '../../styles/variables';
import Text from '../Text';

export interface SummaryWithImageProps extends ImageProps {
  iconUrl: string;
  header: string;
  subHeader: string;
  body: string;
}

const useStyles = makeStyles({
  icon: {
    width: styleVariables.spacing(10),
    height: styleVariables.spacing(10),
  },
  iconWrapper: { marginBottom: styleVariables.spacing(2) },
  header: {
    fontWeight: styleVariables.fonts.weight.semiBold,
    marginBottom: styleVariables.spacing(0.5),
    wordWrap: 'break-word',
  },
  subHeader: {
    fontWeight: styleVariables.fonts.weight.medium,
    marginBottom: styleVariables.spacing(4),
    color: styleVariables.colors.text.info,
  },
  defaultTextColor: { color: styleVariables.colors.text.default },
});

export default function SummaryWithImage({
  iconUrl,
  header,
  subHeader,
  body,
  imageAltText,
  imageUrl,
}: SummaryWithImageProps) {
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
      <>
        <div className={classes.iconWrapper}>
          <img className={classes.icon} src={iconUrl} alt={`${header} icon`} />
        </div>
        <Text
          as="h1"
          className={clsx(classes.header, classes.defaultTextColor)}
        >
          {header}
        </Text>
        <Text as="h3" className={classes.subHeader}>
          {subHeader}
        </Text>
        <Text className={classes.defaultTextColor}>{body}</Text>
      </>
    </SplitWithImage>
  );
}
