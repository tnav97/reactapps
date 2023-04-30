import React, { useContext, useState } from 'react';
import { Theme, Typography, Avatar, Grid, FormControl, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Button, StyleVariables, Text } from '@alcumus/components';
import { useTranslation } from 'react-i18next';
import {
  useApplicationCategories,
  useApplications,
} from '../../hooks/useApplications';
import { sendRequestForProductCategory } from './requestProductCategoryInvitation';
import { ToastContext } from '../../context/ToastContext';
import Analytics from '@alcumus/analytics-package';
import FeaturedApp from '../HomePageRecommendedApps/FeaturedApp';
import { RECOMMENDED_APPLICATIONS } from '../HomePageRecommendedApps/recommendedApps';

const useStyles = makeStyles((theme: Theme) => ({
  allAppsContainer: {
    marginBottom: '1rem',
  },
  title: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    [theme.breakpoints.up('xs')]: {
      fontWeight: StyleVariables.fonts.weight.medium,
      fontSize: StyleVariables.fonts.size.h4,
      lineHeight: StyleVariables.fonts.lineHeight.h4,
    },
    [theme.breakpoints.down('xs')]: {
      fontWeight: StyleVariables.fonts.weight.medium,
      fontSize: StyleVariables.fonts.mobile.size.h4,
      lineHeight: StyleVariables.fonts.mobile.lineHeight.h4,
    },
  },
  smallText: {
    color: StyleVariables.colors.text.default,
    fontSize: StyleVariables.fonts.size.small,
    fontWeight: StyleVariables.fonts.weight.regular,
    marginBottom: '2px',
  },
  formControl: {
    marginBottom: '12px',
    width: '100%',
  },
  field: {
    backgroundColor: StyleVariables.colors.surface.default,
    fontFamily: StyleVariables.fonts.family.heading,
  },
  error: {
    color: StyleVariables.colors.text.critical,
  },
  gridItem: {
    display: 'grid',
  },
  topBanner: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

const ALL_CATEGORIES = 'All categories';

interface HomePageAllAppsProps {
  user: any;
  tenantName?: string;
}

export default function HomePageAllApps({
  user,
  tenantName = '',
}: HomePageAllAppsProps) {
  const classes = useStyles();
  const { t } = useTranslation('AllApplications');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setToast } = useContext(ToastContext);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await sendRequestForProductCategory({
        sendersName: `${user.firstName} ${user.lastName}`,
        tenantName,
        productCategory: category,
        useremail: user.email,
        location: user.location || 'Not available',
      });
      setIsSubmitting(false);
      if (setToast) {
        setToast({
          message: t('requestSuccessMessage'),
          severity: 'success',
        });
      }
    } catch (e: any) {
      setIsSubmitting(false);
      if (setToast) {
        setToast({
          message: t('requestErrorMessage'),
          severity: 'error',
        });
      }
      throw e;
    } finally {
      Analytics.getInstance().track('Request Sent To Learn More', {
        category: category,
        organization: tenantName,
      });
    }
  };

  const {
    data: applicationsResponse,
    error,
    isValidating: isLoading,
  } = useApplications();
  const applications = applicationsResponse?.applications;
  const { data: categoriesResponse } = useApplicationCategories();
  const productCategories = categoriesResponse?.categories;

  // Dropdown
  const [category, setCategory] = useState<string>(ALL_CATEGORIES);
  const handleCategorySelect = (event) => {
    const chosenOption = event.target?.value;
    setCategory(chosenOption);
  };

  const filteredApplications: any = applications?.filter((application) => {
    return category === ALL_CATEGORIES
      ? true
      : application.applicationCategories.filter(
          (x) => x.applicationCategoryName === category
        ).length > 0;
  });

  filteredApplications?.forEach((app) => {
    Object.keys(RECOMMENDED_APPLICATIONS).forEach((value) => {
      if (
        RECOMMENDED_APPLICATIONS[value].applicationLookupKey ===
        app.applicationLookupKey
      ) {
        app.imageUrl = RECOMMENDED_APPLICATIONS[value].imageUrl;
        app.applicationDescription =
          RECOMMENDED_APPLICATIONS[value].applicationDescription;
        app.applicationUrl = RECOMMENDED_APPLICATIONS[value].applicationUrl;
      }
    });
  });

  return (
    <div className={classes.allAppsContainer}>
      <Text className={classes.title}>{t('allApplications')}</Text>
      <br></br>
      <Grid item xs={12} className={classes.topBanner}>
        <Avatar
          variant={'rounded'}
          alt="banner-image"
          src="/images/applications_banner_image.png"
          style={{
            width: '100%',
            height: 200,
          }}
        />
      </Grid>
      <br></br>
      <Text className={classes.smallText}>{t('filterCategories')}</Text>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={5} lg={4}>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              variant="standard"
              labelId="categories-label"
              id="categories"
              className={classes.field}
              value={category}
              onChange={handleCategorySelect}>
              <MenuItem value={'All categories'}>{t('allCategories')}</MenuItem>
              {productCategories?.map((category) => (
                <MenuItem
                  key={category.applicationCategoryLookupKey}
                  value={category.applicationCategoryName}
                >
                  {t(category.applicationCategoryName)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br />
      {!isLoading &&
        (error ? (
          <Typography variant="h5" className={classes.error}>
            {t('activeAppsError')}
          </Typography>
        ) : filteredApplications?.length ? (
          <Grid container spacing={2}>
            {filteredApplications.map((product) => (
              <Grid
                item
                xs={12}
                lg={6}
                key={product.applicationId}
                className={classes.gridItem}
              >
                <FeaturedApp
                  applicationLookupKey={product.applicationLookupKey}
                  imageUrl={product.imageUrl}
                  title={product.applicationName}
                  content={product.applicationDescription}
                  categories={product.applicationCategories}
                  applicationUrl={product.applicationUrl}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} className={classes.gridItem}>
              <Avatar
                variant={'rounded'}
                alt="globe-image"
                src="/images/international.png"
                style={{
                  width: 200,
                  height: 200,
                }}
              />
            </Grid>
            <Grid item xs={8} className={classes.gridItem}>
              <Typography variant="h4">{t('notAvailableInRegion')}</Typography>
            </Grid>
            <Grid item xs={8} className={classes.gridItem}>
              <Typography>{t('learnMoreProductCategory')}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <Button
                rounded={true}
                variant="contained"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <Text>{t('sendRequest')}</Text>
              </Button>
            </Grid>
          </Grid>
        ))}
    </div>
  );
}
