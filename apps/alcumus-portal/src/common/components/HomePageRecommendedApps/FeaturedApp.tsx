import React from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Theme } from '@mui/material';
import { Button, StyleVariables, Text } from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import { ApplicationCategory } from '../../types';
import { useTranslation } from 'react-i18next';

interface FeaturedAppProps {
  applicationLookupKey: string;
  imageUrl: string;
  title: string;
  categories?: ApplicationCategory[];
  color?: string;
  content: string[];
  applicationUrl?: string;
  onMoreInfoClick?: (appId: number) => void;
}
// Set the height where apps switch to vertical tiles
const verticalCutoff = 650;
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    [theme.breakpoints.up(verticalCutoff)]: {
      display: 'flex',
    },
    height: '100%',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    borderWidth: '1px',
    borderColor: StyleVariables.colors.border.default,
    borderStyle: 'solid',
    borderRadius: '8px',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'end',
    justifyContent: 'space-between',
    width: '100%',
  },
  image: {
    display: 'flex',
    flexShrink: 1,
    [theme.breakpoints.up(verticalCutoff)]: {
      width: 200,
    },
  },
  appDetails: {
    [theme.breakpoints.up(verticalCutoff)]: {
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.down(verticalCutoff)]: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  title: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.h5,
    fontFamily: StyleVariables.fonts.family.heading,
    lineHeight: StyleVariables.fonts.lineHeight.h4,
  },
  subtitle: {
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.small,
    lineHeight: StyleVariables.fonts.lineHeight.small,
    fontFamily: StyleVariables.fonts.family.body,
  },
  content: {
    fontFamily: StyleVariables.fonts.family.body,
    fontSize: StyleVariables.fonts.size.small,
    fontWeight: StyleVariables.fonts.weight.regular,
    lineHeight: StyleVariables.fonts.lineHeight.small,
  },
  cardActions: {
    [theme.breakpoints.up(verticalCutoff)]: {
      justifyContent: 'flex-end',
      justifySelf: 'flex-end',
    },
    [theme.breakpoints.down(verticalCutoff)]: {
      justifyContent: 'center',
    },
  },
  primaryButton: {
    padding: '6px 12px',
    justifySelf: 'flex-end',
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  buttonText: {
    fontSize: StyleVariables.fonts.size.regular,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    paddingRight: '5px',
    paddingLeft: '5px',
  },
  list: {
    padding: '12px',
  },
}));

export default function FeaturedApp({
  applicationLookupKey,
  imageUrl,
  title,
  categories,
  content,
  applicationUrl,
}: FeaturedAppProps) {
  const classes = useStyles();
  const categoriesDisplay = categories
    ?.map((e) => e.applicationCategoryName)
    .join(', ');
  const { t } = useTranslation(['HomePage']);

  return (
    <div>
      <Card className={classes.card} data-testid={applicationLookupKey}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={title}
          className={classes.image}
          style={{}}
        />
        <Box className={classes.box}>
          <CardContent>
            <div className={classes.appDetails}>
              <Text className={classes.title}>{title}</Text>
              <Text className={classes.subtitle}>{categoriesDisplay}</Text>
              <ul className={classes.list}>
                <Text variant="subtitle2" as="p" className={classes.content}>
                  {content.map((description) => (
                    <li key={content.indexOf(description)}>{description}</li>
                  ))}
                </Text>
              </ul>
            </div>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              rounded={true}
              className={classes.primaryButton}
              variant="outlined"
              href={applicationUrl}
            >
              <Text className={classes.buttonText}>{t('learnMore')}</Text>
            </Button>
            {/*
              <Button rounded={true} className={classes.primaryButton}>
                <Text className={classes.buttonText}>Start free trial</Text>
              </Button>
            */}
          </CardActions>
        </Box>
      </Card>
    </div>
  );
}
