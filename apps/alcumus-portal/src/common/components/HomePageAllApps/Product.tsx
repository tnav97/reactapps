import React from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Link,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Button, StyleVariables, Text } from '@alcumus/components';
import { ApplicationCategory, MyOrganizationDetails } from '../../types';
import Analytics from '@alcumus/analytics-package';
import useSWR from 'swr';
import { CURRENT_ORGANIZATION_PROFILE_URL } from '../MyOrganization';

interface ProductProps {
  key: number;
  productId: number;
  title: string;
  url: string;
  content: string;
  categories?: ApplicationCategory[];
  isActive: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    borderWidth: '1px',
    borderColor: StyleVariables.colors.border.default,
    borderStyle: 'solid',
    alignContent: 'center',
    borderRadius: '8px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.up('xs')]: {
      height: '100%',
    },
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'end',
    justifyContent: 'space-between',
    width: '100%',
  },
  content: {
    color: StyleVariables.colors.text.default,
    fontSize: StyleVariables.fonts.size.small,
    fontWeight: StyleVariables.fonts.weight.regular,
    lineHeight: StyleVariables.fonts.lineHeight.small,
    fontFamily: StyleVariables.fonts.family.body,
    flexShrink: 1,
  },
  title: {
    color: StyleVariables.colors.text.default,
    fontSize: StyleVariables.fonts.size.h5,
    lineHeight: StyleVariables.fonts.lineHeight.h5,
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: StyleVariables.fonts.weight.semiBold,
  },
  buttonText: {
    color: StyleVariables.colors.text.default,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.regular,
  },
  cardContent: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    alignSelf: 'center',
  },
  cardActions: {
    justifyContent: 'flex-end',
    flexShrink: 0,
    alignItems: 'center',
    padding: 0,
    paddingRight: theme.spacing(2),
  },
  icon: {
    alignSelf: 'center',
    height: '64px',
    width: '64px',
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  learnMoreButton: {
    zIndex: 1,
    display: 'inline-block',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
    [theme.breakpoints.up(1500)]: {
      display: 'flex',
    },
  },
  learnMoreArrow: {
    zIndex: 2,
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
    [theme.breakpoints.up(1500)]: {
      display: 'none',
    },
  },
}));

export default function Product({
  title,
  url,
  categories,
  isActive = false,
}: ProductProps) {
  const classes = useStyles();
  const categoriesDisplay = categories
    ?.map((e) => e.applicationCategoryName)
    .join(', ');
  const { data: myOrganizationDetails } = useSWR<MyOrganizationDetails>(
    CURRENT_ORGANIZATION_PROFILE_URL
  );
  return (
    <Card className={classes.card} elevation={4}>
      <CardMedia
        component="img"
        image={
          'https://media-exp1.licdn.com/dms/image/C560BAQEDSx-GaeFFZg/company-logo_200_200/0/1625126290307?e=2159024400&v=beta&t=FwFsH68TvG5q_pj40BbdiCBQd4o-tRgOnJhwaKst7_0'
        }
        alt={`${title} icon`}
        className={classes.icon}
        aria-label={`${title} icon`}
      />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <CardContent className={classes.cardContent}>
          <Text className={classes.title}>{title}</Text>
          <Text className={classes.content}>{categoriesDisplay}</Text>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            component="a"
            variant="outlined"
            rounded={true}
            className={classes.learnMoreButton}
            href={url}
            target={`${isActive ? '_blank' : '_self'}`}
            aria-label={`${isActive ? 'Open' : 'Learn more about'} ${title}`}
            onClick={() => {
              if (isActive === true) {
                Analytics.getInstance().track('Active Product Launched', {
                  organization: myOrganizationDetails?.tenantName,
                  product: title,
                });
              }
            }}
          >
            <Text className={classes.buttonText} align="center">
              {isActive ? 'Open' : 'Learn more'}
            </Text>
          </Button>
          <Link
            href={url}
            target={`${isActive ? '_blank' : '_self'}`}
            underline="none"
          >
            <IconButton
              color="inherit"
              aria-label="notifications"
              className={classes.learnMoreArrow}
              data-testid="notificationsIcon"
            >
              <div style={{ overflow: 'hidden' }} className="material-icons">
                open_in_new
              </div>
            </IconButton>
          </Link>
        </CardActions>
      </Box>
    </Card>
  );
}
