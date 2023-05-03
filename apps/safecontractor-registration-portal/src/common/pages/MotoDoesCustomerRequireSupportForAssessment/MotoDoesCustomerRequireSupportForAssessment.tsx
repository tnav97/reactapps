import React, { useEffect } from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Page, StyleVariables, Image } from '@alcumus/components';
import { Trans } from 'react-i18next';
import { TFunction } from 'i18next';
import MotoAboutSection from '../../components/MotoAboutSection';
import MotoFooterSection from '../../components/MotoFooterSection';
import MotoStepper from '../../components/MotoStepper';
import { CardSelected } from '../../constants';
import MotoMobileFooterSection from '../../components/MotoMobileFooterSection';
import clsx from 'clsx';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import ReadMore from '../../components/ReadMore';
import { createTheme} from '@mui/material';

export interface DoesCustomerRequireSupportForAssessmentProps {
  t: TFunction;
}

const STEPPER_DOTS = 2;

const Breakpoints = createTheme().breakpoints;
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    marginTop: '24px',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: '32px',
    [Breakpoints.down('sm')]: {
      marginTop: '14px',
      fontWeight: StyleVariables.fonts.weight.medium,
      fontSize: StyleVariables.fonts.size.h5,
      lineHeight: StyleVariables.fonts.lineHeight.h5,
    },
    fontWeight: StyleVariables.fonts.weight.medium,
    fontSize: StyleVariables.fonts.size.h5,
    lineHeight: StyleVariables.fonts.lineHeight.h5,
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
  cardsContent: {
    height: '208px',
    marginLeft: '8px',
    marginRight: '8px',
    [Breakpoints.down('sm')]: {
      height: '56px',
      margin: 'auto',
      marginBottom: '8px',
    },
    borderRadius: '8px',
    borderWidth: '2px',
    borderColor: StyleVariables.colors.border.default,
    cursor: 'pointer',
  },
  scrollablediv: {
    height: 'calc(100vh - 80px)',
    overflow: 'auto',
    scrollbarWidth: 'none',
    [Breakpoints.down('sm')]: {
      height: 'calc(100vh - 120px)',
    },
  },
  thumbsUp: {
    marginTop: '16px',
    [Breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  thumbsDown: {
    marginTop: '16px',
    [Breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  cardSelect: {
    backgroundColor: '#158BD126',
    borderWidth: '2px',
    borderColor: StyleVariables.colors.base.primary,
  },
  cardContainer: {
    [Breakpoints.down('sm')]: {
      display: 'block',
      marginTop: 0,
      marginLeft: '20px',
      marginRight: '20px',
    },
    justifyContent: 'center',
  },
  titleContainer: {
    margin: 'auto',
  },
  cssPage: {
    [Breakpoints.down('sm')]: {
      padding: 0,
      margin: 0,
    },
  },
  stepper: {
    [Breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  footerVisibility: {
    [Breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  imgCenter: {
    textAlign: 'center',
  },
}));

export function MotoDoesCustomerRequireSupportForAssessment({
  t,
}: DoesCustomerRequireSupportForAssessmentProps) {
  const [selected, setSelected] = React.useState(CardSelected.Not_Selected);
  const [selectedValue, setSelectedValue] = React.useState<string>('');
  const dispatch = useDispatch();
  const needSupportSelector = useSelector((state: any) => state.motoNeedSupport);
  const contents = [
    {
      id: 0,
      value: 'Yes',
    },
    {
      id: 1,
      value: 'No',
    },
  ];
  const images = ['/icons/Vectorup.png', '/icons/Vectordown.png'];
  const submit = (item, index) => {
    setSelected(index);
    setSelectedValue(item);
  };
  useEffect(() => {
    if (selected !== CardSelected.Not_Selected) {
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
    if (needSupportSelector.selected !== undefined) {
      setSelected(needSupportSelector.selected);
      setSelectedValue(needSupportSelector.selectedValue);
    }
  }, [needSupportSelector]);

  const impaired: boolean = selected !== CardSelected.Not_Selected;
  const footerProps = {
    register: () => undefined,
    footerSectionProps: {
      to: 'moto/choosePlan',
      from: 'moto/responseTime',
      mobileText: 'View pricing plans',
      text: 'View pricing plans',
      prevText: 'Go back',
      impaired: impaired,
      page: 'motoSupport',
    },
  };
  const footerPropsDesktop = {
    register: () => undefined,
    footerSectionProps: {
      to: 'moto/choosePlan',
      from: 'moto/responseTime',
      impaired: impaired,
      page: 'motoSupport',
    },
  };

  const classes = useStyles();

  return (
    <Page className={classes.cssPage}>
      <Grid item xs={12} className={classes.scrollablediv}>
        <MotoAboutSection count={STEPPER_DOTS} />
        <Grid className={classes.stepper}>
          <MotoStepper count={STEPPER_DOTS}></MotoStepper>
        </Grid>
        <Grid item md={7} lg={7} className={classes.titleContainer}>
          <Typography className={classes.title}>
            <Trans t={t} i18nKey="doYouRequireSupport">
              Do you need support in completing the Health & Safety Assessment?
            </Trans>
          </Typography>
        </Grid>
        <Grid container className={classes.justifyCenter}>
          <Grid item xs={12}>
            <ReadMore>
              If you require assistance, a dedicated technical expert will be in
              touch within one working day of purchasing your membership. They
              can help guide you through your health and safety assessment from
              start to finish.
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
              className={clsx(classes.cardContainer)}
            >
              <Box title={content.value}>
                <Card
                  variant="outlined"
                  className={clsx(
                    classes.cardsContent,
                    `${selected === index ? classes.cardSelect : ''}`
                  )}
                  data-testid={
                    content.value === 'Yes'
                      ? 'doYouRequireSupportYes'
                      : 'doYouRequireSupportNo'
                  }
                  onClick={() => submit(content.value, index)}
                >
                  <Typography className={classes.text}>
                    {content.value}
                  </Typography>
                  <Grid container className={classes.imgCenter}>
                    <Grid item xs={12}>
                      <Image
                        className={clsx(
                          `${
                            content.value === 'Yes'
                              ? classes.thumbsUp
                              : classes.thumbsDown
                          }`
                        )}
                        data-testid={
                          content.value === 'Yes'
                            ? 'requireAssistanceYes'
                            : 'requireAssistanceNo'
                        }
                        src={images[index]}
                        alt={content.value}
                      />
                    </Grid>
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
        <MotoFooterSection {...footerPropsDesktop} />
      </div>
    </Page>
  );
}
