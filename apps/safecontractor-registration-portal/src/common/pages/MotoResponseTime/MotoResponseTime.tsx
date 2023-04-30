import React, { useEffect } from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Page, StyleVariables, Image } from '@alcumus/components';
import MotoAboutSection from '../../components/MotoAboutSection';
import MotoFooterSection from '../../components/MotoFooterSection';
import MotoMobileFooterSection from '../../components/MotoMobileFooterSection';
import clsx from 'clsx';
import { responseTime } from '../../constants';
import MotoStepper from '../../components/MotoStepper';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import ReadMore from '../../components/ReadMore';

const STEPPER_DOTS = 2;

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    marginTop: '24px',
    textAlign: 'center',
    marginLeft: '12rem',
    marginRight: '12rem',
    [theme.breakpoints.down('lg')]: {
      marginLeft: '24px',
      marginRight: '24px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '16px',
      marginRight: '16px',
      marginBottom: '16px',
    },
  },
  cards: {
    margin: 'auto',
    justifyContent: 'space-evenly',
    textAlign: 'center',
    display: 'flex',
    marginTop: '28px',
  },
  cssPage: {
    padding: 0,
    margin: 0,
  },
  stepper: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  footerVisibility: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  marginTop: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginTop: 0,
      marginLeft: '20px',
      marginRight: '20px',
    },
    justifyContent: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  cardsContent: {
    height: '208px',
    marginLeft: '8px',
    marginRight: '8px',
    marginTop: '12px',
    [theme.breakpoints.down('sm')]: {
      height: '56px',
      margin: 'auto',
      marginBottom: '8px',
    },
    borderRadius: '8px',
    borderWidth: '2px',
    borderColor: StyleVariables.colors.border.default,
    cursor: 'pointer',
  },
  thumbsUp: {
    marginTop: '16px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  cardSelect: {
    backgroundColor: '#158BD126',
    borderWidth: '2px',
    borderColor: StyleVariables.colors.base.primary,
  },
  text: {
    textAlign: 'center',
    marginTop: '32px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '14px',
      fontWeight: StyleVariables.fonts.weight.medium,
      fontSize: StyleVariables.fonts.size.h5,
      lineHeight: StyleVariables.fonts.lineHeight.h5,
    },
    fontWeight: StyleVariables.fonts.weight.medium,
    fontSize: StyleVariables.fonts.size.h5,
    lineHeight: StyleVariables.fonts.lineHeight.h5,
  },
  cardContainerCenter: {
    justifyContent: 'center',
  },
  imageCenterText: {
    top: '21%',
    left: '35%',
    width: '30%',
    textAlign: 'center',
    marginTop: '1.5rem',
    position: 'absolute',
    color: StyleVariables.colors.action.primary.default,
    fontWeight: StyleVariables.fonts.weight.medium,
    fontSize: StyleVariables.fonts.size.h1,
    lineHeight: StyleVariables.fonts.lineHeight.h1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    textAlign: 'center',
  },
  scrollablediv: {
    height: 'calc(100vh - 80px)',
    overflow: 'auto',
    scrollbarWidth: 'none',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 120px)',
    },
  },
  subtitle: {
    fontFamily: StyleVariables.fonts.family.body,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.xs,
    lineHeight: StyleVariables.fonts.lineHeight.xs,
    textAlign: 'center',
    marginTop: '12px',
    color: StyleVariables.colors.text.subdued,
    marginBottom: '1rem',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
}));

export default function MotoResponseTime() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(responseTime.Not_Selected);
  const [selectedValue, setSelectedValue] = React.useState('');
  const dispatch = useDispatch();
  const responseTimeSelector = useSelector((state: any) => state.motoResponseTime);

  const contents = [
    {
      key: '2_DAYS',
      value: '2 Working Days',
    },
    {
      key: '5_DAYS',
      value: '5 Working Days',
    },
    {
      key: '20_DAYS',
      value: '20 Working Days',
    },
  ];
  const images = [
    '/icons/calendar.png',
    '/icons/calendar.png',
    '/icons/calendar.png',
  ];
  const imagesContent = ['2', '5', '20'];

  const submit = (item, index) => {
    setSelected(index);
    setSelectedValue(item);
  };

  useEffect(() => {
    if (selected !== responseTime.Not_Selected) {
      dispatch({
        type: footerProps.footerSectionProps.page,
        payload: {
          selected: selected,
          selectedValue: selectedValue,
        },
      });
    }
  }, [selected, selectedValue]);

  useEffect(() => {
    if (responseTimeSelector.selected !== undefined) {
      setSelected(responseTimeSelector.selected);
      setSelectedValue(responseTimeSelector.selectedValue);
    }
  }, [responseTimeSelector]);

  const impaired: boolean = selected !== responseTime.Not_Selected;
  const footerProps = {
    register: () => undefined,
    footerSectionProps: {
      to: 'moto/needSupport',
      from: 'moto/subsidiaryBusiness',
      page: 'motoResponseTime',
      impaired: impaired,
    },
  };

  return (
    <Page className={classes.cssPage}>
      <Grid item xs={12} className={classes.scrollablediv}>
        <MotoAboutSection count={STEPPER_DOTS} />
        <Grid className={classes.stepper}>
          <MotoStepper count={STEPPER_DOTS}></MotoStepper>
        </Grid>
        <Typography className={classes.title}>
          Once your Health & Safety Assessment has been submitted, how quickly
          do you require a response?
        </Typography>
        <Grid container className={classes.justifyCenter}>
          <Grid item xs={12}>
            <ReadMore>
              After you have submitted your health and safety assessment, a
              member of our technical support team will contact you to begin
              processing your form. If you need to be accredited quickly, bear
              this in mind when selecting your preferred response time.
            </ReadMore>
          </Grid>
          <Grid item md={3} lg={2}></Grid>
        </Grid>
        <Grid container className={classes.justifyCenter}>
          {contents?.map((content, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              lg={2}
              xl={2}
              key={index}
              className={clsx(classes.marginTop)}
            >
              <Box title={content.value}>
                <Card
                  variant="outlined"
                  className={clsx(
                    classes.cardsContent,
                    `${selected === index ? classes.cardSelect : ''}`
                  )}
                  data-testid={content.key}
                  onClick={() => submit(content.key, index)}
                >
                  <Typography className={classes.text}>
                    {content.value}
                  </Typography>
                  <Grid className={clsx(classes.imageContainer)}>
                    <Grid item xs={12}>
                      <Image
                        className={clsx(classes.thumbsUp)}
                        src={images[index]}
                        alt={content.value}
                      />
                    </Grid>
                    <Typography className={clsx(classes.imageCenterText)}>
                      {imagesContent[index]}
                    </Typography>
                  </Grid>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <div className={classes.stepper}>
        <MotoMobileFooterSection {...footerProps} />
      </div>
      <div className={classes.footerVisibility}>
        <MotoFooterSection {...footerProps} />
      </div>
    </Page>
  );
}
