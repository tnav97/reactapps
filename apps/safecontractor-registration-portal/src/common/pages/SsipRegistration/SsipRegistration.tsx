import React, { useEffect, useState } from 'react';
import { Box, Card, FormControl, Grid, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Page, StyleVariables, Select, Image } from '@alcumus/components';
import AboutSection from '../../components/AboutSection';
import FooterSection from '../../components/FooterSection';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import clsx from 'clsx';
import { CardSelected } from '../../constants';
import MobileFooterSection from '../../components/MobileFooterSection';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import ReadMore from '../../components/ReadMore';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import ProgressBar from '../../components/ProgressBar';
import { SSIPData, SSIPRegistrationDetails } from '../../types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const PROGRESS = 44;

interface SsipRegistrationSection {
  getSsipData: Function;
  messageFromApi?: string;
  isFetching: boolean;
  error?: string;
}

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    marginTop: '24px',
    textAlign: 'center',
    marginLeft: '24px',
    marginRight: '24px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '16px',
      marginRight: '16px',
    },
  },
  text: {
    textAlign: 'center',
    marginTop: '32px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '14px',
      fontWeight: StyleVariables.fonts.weight.medium,
      fontSize: StyleVariables.fonts.size.h5,
      lineHeight: StyleVariables.fonts.lineHeight.h5,
    },
    fontWeight: StyleVariables.fonts.weight.medium,
    fontSize: StyleVariables.fonts.size.h5,
    lineHeight: StyleVariables.fonts.lineHeight.h5,
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
  formGroup: {
    textAlign: 'left',
    marginTop: '10px',
  },
  inputPosition: {
    display: 'flex',
    marginLeft: '1rem',
    marginRight: '1rem',
    marginTop: '32px',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '1.5rem',
      marginRight: '1.5rem',
    },
  },
  businessAdd: {
    margin: 'auto',
    justifyContent: 'space-evenly',
    textAlignLast: 'left',
    [theme.breakpoints.down('sm')]: {
      marginTop: '24px',
    },
  },
  regcode: {
    margin: 'auto',
    justifyContent: 'space-evenly',
    textAlignLast: 'left',
    marginTop: '8px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '24px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '0px',
    },
  },
  deleteicon: {
    justifyContent: 'space-evenly',
    cursor: 'pointer',
  },
  addButton: {
    display: 'flex',
    margin: 'auto',
    marginTop: '1rem',
    marginBottom: '5rem',
  },
  cardsContent: {
    height: '208px',
    marginLeft: '8px',
    marginRight: '8px',

    [theme.breakpoints.down('xs')]: {
      height: '56px',
      margin: 'auto',
      marginBottom: '8px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '200px',
    },
    borderRadius: '8px',
    borderWidth: '2px',
    borderColor: StyleVariables.colors.border.default,
    cursor: 'pointer',
  },
  imgCenter: {
    textAlign: 'center',
  },
  scrollablediv: {
    height: 'calc(100vh - 80px)',
    overflow: 'auto',
    scrollbarWidth: 'none',
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 105px)',
    },
  },
  thumbsUp: {
    marginTop: '16px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  thumbsDown: {
    marginTop: '16px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  cardSelect: {
    backgroundColor: '#158BD126',
    borderWidth: '2px',
    borderColor: StyleVariables.colors.base.primary,
  },
  cardContainer: {
    marginTop: '16px',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      marginTop: 0,
      marginLeft: '20px',
      marginRight: '20px',
    },
    justifyContent: 'center',
  },
  buttonBorder: {
    borderRadius: '100px',
  },
  deleteIcon: {
    color: StyleVariables.colors.text.subdued,
    cursor: 'pointer',
  },
  registrationInput: {
    justifyContent: 'space-evenly',
    margin: 'auto',
    borderRadius: '8px',
  },
  subsidaryInput: {
    justifyContent: 'space-evenly',
    margin: 'auto',
    marginRight: '16px',
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
    borderRadius: '8px',
  },
  formMarginBottom: {
    marginBottom: '16px',
  },
  displayBlock: {
    display: 'block',
  },
  displayNone: {
    display: 'none',
  },
  errorMessage: {
    color: StyleVariables.colors.text.critical,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.xs,
    lineHeight: StyleVariables.fonts.lineHeight.small,
  },
  cssPage: {
    padding: 0,
    margin: 0,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  formGroupm: {
    textAlign: 'left',
    marginTop: '16px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '10px',
      paddingLeft: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
    },
  },
  formContainer: {
    textAlign: 'left',
    alignContent: 'center',
  },
  inputsContainer: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: '16px',
    },
  },
  stepper: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  footerVisibility: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
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
    marginLeft: '42px',
    marginRight: '42px',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '16px',
      marginRight: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '1rem',
      marginRight: '1rem',
    },
  },

  leftBoxContainer: {
    direction: 'rtl',
  },
  deleteButtonIcon: {
    border: 'none',
    backgroundColor: StyleVariables.colors.base.white,
    marginTop: '53px',
    marginLeft: '7px',
    paddingTop: '8px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '54px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '30px',
    },
  },
  dateContainer: {
    marginBottom: '3rem',
  },
  span: {
    color: '#C50000',
  },
  dateinput: {
    marginBottom: '4px',
  },
  customDate: {
    '& input[type=text]': {
      padding: '9px',
    },
    '& fieldset': {
      borderRadius: '10px',
    },
  },
}));

export default function SsipRegistration(
  ssipRegistrationSectionProps: SsipRegistrationSection
) {
  const ssipValue = useSelector((state) => state.ssip);
  const [selected, setSelected] = React.useState(
    ssipValue.selected ?? CardSelected.Not_Selected
  );
  const [selectedValue, setSelectedValue] = React.useState(
    ssipValue.selectedValue ?? ''
  );
  const [selectedTabIndexNo, setSelectedTabIndexNo] = React.useState(-1);
  const [selectedTabIndexYes, setSelectedTabIndexYes] = React.useState(0);
  const [expiryMessage, setexpiryMessage] = useState('');
  const [nextPage, setNextPage] = React.useState('subsidiaryBusiness');
  const dispatch = useDispatch();
  const history = useHistory();
  const [ssipClientArray, setSsipClientArray] = useState<SSIPData[]>();
  const [ssipRegistrationForm, setSsipRegistrationForm] =
    useState<SSIPRegistrationDetails>();

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (ssipValue.ssipRegistrationForm) {
      setSsipRegistrationForm(JSON.parse(ssipValue.ssipRegistrationForm));
    }
  }, []);

  useEffect(() => {
    setShow(false);
    if (
      ssipRegistrationForm?.accreditationDate !== undefined &&
      ssipRegistrationForm?.accreditationDate.length &&
      validator.isDate(ssipRegistrationForm?.accreditationDate) &&
      validator.isDate(ssipRegistrationForm?.expirationDate) &&
      ssipRegistrationForm?.expirationDate !== undefined &&
      ssipRegistrationForm?.expirationDate.length &&
      ssipRegistrationForm?.ssipClientId !== undefined
    ) {
      if (
        new Date(ssipRegistrationForm?.accreditationDate) >=
        new Date(ssipRegistrationForm?.expirationDate)
      ) {
        setexpiryMessage('Please Enter Valid Expiry Date');
      } else {
        setexpiryMessage('');
        setShow(true);
      }
    }
    if (ssipRegistrationForm) {
      dispatch({
        type: footerProps.footerSectionProps.page,
        payload: {
          selected: selected,
          selectedValue: selectedValue,
          ssipRegistrationForm: JSON.stringify(ssipRegistrationForm ?? {}),
        },
      });
    }
  }, [ssipRegistrationForm]);

  useEffect(() => {
    ssipRegistrationSectionProps.getSsipData().then((res) => {
      if (res.payload.response?.succes) {
        setSsipClientArray(res.payload.response?.ssipAccreditationBodies);
      }
    });
  }, []);

  const impaired: boolean = (selected === 0 && show) || selected === 1;

  const footerProps = {
    register: () => undefined,
    footerSectionProps: {
      to: nextPage,
      from: 'companyType',
      impaired: impaired,
      page: 'SSIPQuestion',
    },
  };
  const mobilefooterProps = {
    register: () => undefined,
    footerSectionProps: {
      to: nextPage,
      from: 'companyType',
      prevText: 'Go back',
      impaired: impaired,
      page: 'SSIPQuestion',
    },
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' && index === CardSelected.No) {
      history.push(`/${footerProps?.footerSectionProps?.to}`);
    }
  };

  const onPlanChange = (e) => {
    const plan = ssipClientArray?.find(
      (p: SSIPData) => p.id.toString() === e.target.value.toString()
    );

    if (plan) {
      setSsipRegistrationForm({
        ...ssipRegistrationForm,
        ssipClientId: plan?.id,
        ssipClientName: plan?.name,
      });
    }
  };

  const classes = useStyles();
  const contents = [
    {
      id: 0,
      tabIndex: selectedTabIndexYes,
      value: 'Yes',
    },
    {
      id: 1,
      tabIndex: selectedTabIndexNo,
      value: 'No',
    },
  ];
  const images = ['/icons/Vectorup.png', '/icons/Vectordown.png'];
  const SampleDiscountCode = 'SAFESSIP20';
  const submit = (item, index) => {
    setSelected(index);
    setSelectedValue(item);
    if (index === CardSelected.No) {
      setNextPage('subsidiaryBusiness');
      setSelectedTabIndexYes(0);
      dispatch({
        type: 'basketDetails',
        payload: {
          total: 'initialTotalCount',
          discountCode: undefined,
          basketApiSuccess: false,
        },
      });
    } else {
      setSelectedTabIndexNo(1);
      dispatch({
        type: 'basketDetails',
        payload: {
          total: 'initialTotalCount',
          discountCode: SampleDiscountCode,
          basketApiSuccess: true,
        },
      });
    }
    dispatch({
      type: footerProps.footerSectionProps.page,
      payload: {
        selected: selected,
        selectedValue: selectedValue,
        ssipRegistrationForm: JSON.stringify(ssipRegistrationForm ?? {}),
      },
    });
  };

  const handleAccreditationDate = (date) => {
    const accreditationDate = formatDate(date);

    setAccreditation(accreditationDate);
  };
  const returnAccreditationDate = () => {
    return typeof ssipRegistrationForm?.accreditationDate === 'string'
      ? dayjs(ssipRegistrationForm?.accreditationDate)
      : null;
  };
  const returnExpirationDate = () => {
    return typeof ssipRegistrationForm?.expirationDate === 'string'
      ? dayjs(ssipRegistrationForm?.expirationDate)
      : null;
  };
  const handleExpirationDate = (date) => {
    const expirationDate = formatDate(date);

    setExpiration(expirationDate);
  };

  const setAccreditation = (accreditationDate: string) => {
    setSsipRegistrationForm({
      ...ssipRegistrationForm,
      accreditationDate: accreditationDate,
    });
  };

  const setExpiration = (expirationDate: string) => {
    setSsipRegistrationForm({
      ...ssipRegistrationForm,
      expirationDate: expirationDate,
    });
  };

  function formatDate(date) {
    let month, day;

    const formatdate = new Date(date);
    month = '' + (formatdate.getMonth() + 1);
    day = '' + formatdate.getDate();
    const year = formatdate.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  return (
    <Page className={classes.cssPage}>
      <Grid item xs={12} className={classes.scrollablediv}>
        <AboutSection progress={PROGRESS} />
        <Grid className={classes.stepper}>
          <ProgressBar progress={PROGRESS} />
        </Grid>
        <Typography className={classes.title} variant="h1" component="h1">
          Are you Health and Safety accredited by a SSIP member?
        </Typography>

        <ReadMore>
          If you are Health & Safety accredited you will need to add the details
          of the SSIP member. The details will be checked against the SSIP
          Portal.
        </ReadMore>

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
              <Box
                className={clsx(
                  `${content.value === 'Yes' ? classes.leftBoxContainer : ''}`
                )}
                title={`${content.value} SSIP`}
              >
                <Card
                  variant="outlined"
                  className={clsx(
                    classes.cardsContent,
                    `${selected === index ? classes.cardSelect : ''}`
                  )}
                  data-testid={content.value === 'Yes' ? 'ssipYes' : 'ssipNo'}
                  tabIndex={content.tabIndex}
                  onClick={() => submit(content.value, index)}
                  onFocus={() => submit(content.value, index)}
                  onKeyDown={() => handleKeyDown(event, index)}
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
        <Grid
          className={clsx(
            classes.inputPosition,
            `${
              selected === CardSelected.Yes
                ? classes.displayBlock
                : classes.displayNone
            }`
          )}
        >
          <form method="post">
            <Grid container>
              <Grid item sm={2} md={4} lg={4}></Grid>
              <Grid item xs={12} sm={8} md={4} lg={4} xl={4}>
                <FormControl fullWidth className={clsx(classes.formGroup)}>
                  <label>
                    <Select
                      items={[
                        { name: 'Please select', id: '', disabled: true },
                        ...(ssipClientArray ?? []),
                      ]}
                      style={{
                        color:
                          ssipRegistrationForm?.ssipClientName === undefined
                            ? 'rgb(101 103 104)'
                            : 'inherit',
                      }}
                      label="SSIP Client"
                      required={true}
                      inputProps={{
                        'data-testid': 'SSIPClientInput',
                      }}
                      value={ssipRegistrationForm?.ssipClientId}
                      onChange={(e) => {
                        onPlanChange(e);
                      }}
                    ></Select>
                  </label>
                </FormControl>
              </Grid>
              <Grid item sm={2} md={4} lg={4}></Grid>
              <Grid item sm={2} md={4} lg={4}></Grid>
              <Grid item xs={12} sm={8} md={4} lg={4} xl={4}>
                <Grid container className={classes.dateContainer}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth className={classes.formGroup}>
                      <label className={classes.dateinput}>
                        Accreditation Date
                        <span className={classes.span}>*</span>
                      </label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <label>
                          <DateField
                            format="DD/MM/YYYY"
                            onChange={handleAccreditationDate}
                            className={classes.customDate}
                            value={returnAccreditationDate()}
                          />
                        </label>
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth className={classes.formGroupm}>
                      <label className={classes.dateinput}>
                        Expiration Date<span className={classes.span}>*</span>
                      </label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <label>
                          <DateField
                            format="DD/MM/YYYY"
                            onChange={handleExpirationDate}
                            className={classes.customDate}
                            value={returnExpirationDate()}
                          />
                        </label>
                      </LocalizationProvider>
                      <Typography
                        data-testid="reffralCodeError"
                        className={classes.errorMessage}
                      >
                        {expiryMessage}
                      </Typography>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={2} md={4} lg={4}></Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <div className={classes.stepper}>
        <MobileFooterSection {...mobilefooterProps} />
      </div>
      <div className={classes.footerVisibility}>
        <FooterSection {...footerProps} />
      </div>
    </Page>
  );
}
