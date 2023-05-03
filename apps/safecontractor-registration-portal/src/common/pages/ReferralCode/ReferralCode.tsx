import React, { useState, useEffect } from 'react';
import { Box, Card, CircularProgress, FormControl, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  Page,
  StyleVariables,
  Button,
  Input,
  Image,
} from '@alcumus/components';
import AboutSection from '../../components/AboutSection';
import FooterSection from '../../components/FooterSection';
import DoneIcon from '@mui/icons-material/Done';
import clsx from 'clsx';
import Stepper from '../../components/Stepper';
import MobileFooterSection from '../../components/MobileFooterSection';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
  CardSelected,
  companyTypeSelected,
  companyTypeSelection,
  County,
  mobileLiveChatContainerBox,
} from '../../constants';
import { empolyeeCountSelection } from '../../components/constants';
import serialize from 'serialize-javascript';
import { useHistory } from 'react-router-dom';
interface ReferralProps {
  validateReferralCode: Function;
  messageFromApi?: string;
  isFetching: boolean;
  error?: string;
}

const STEPPER_DOTS = 2;

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    marginTop: '24px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '16px',
      marginLeft: '1rem',
      marginRight: '1rem',
    },
    textAlign: 'center',
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

  subtitle: {
    fontFamily: StyleVariables.fonts.family.body,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.xs,
    lineHeight: StyleVariables.fonts.lineHeight.xs,
    textAlign: 'center',
    marginTop: '12px',
    marginBottom: '1rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '16px',
      marginRight: '16px',
      paddingLeft: '4px',
      paddingRight: '4px',
      marginBottom: '24px',
    },
    color: StyleVariables.colors.icon.default,
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
  formGroup: {
    textAlign: 'left',
  },
  inputPosition: {
    display: 'flex',
    marginLeft: '1rem',
    marginRight: '1rem',
    marginTop: '32px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '1.5rem',
      marginRight: '1.5rem',
    },
  },
  cardsContent: {
    height: '208px',
    marginLeft: '8px',
    marginRight: '8px',
    [theme.breakpoints.down('sm')]: {
      height: '56px',
      margin: 'auto',
      marginTop: '8px',
    },
    borderRadius: '8px',
    borderWidth: '2px',
    borderColor: StyleVariables.colors.border.default,
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      width: '200px',
    },
  },
  verifyButton: {
    marginTop: '8px',
    marginLeft: '1rem',
    marginRight: '1rem',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1rem',
      marginLeft: '1.3rem',
    },
  },
  errorMessage: {
    color: StyleVariables.colors.text.critical,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.smaller,
    lineHeight: StyleVariables.fonts.lineHeight.small,
  },
  greentickMarkIcon: {
    position: 'absolute',
    color: StyleVariables.colors.base.success,
    top: '35px',
    right: '10px',
  },
  thumbsUp: {
    marginTop: '16px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  thumbsDown: {
    marginTop: '16px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  buttonBorder: {
    borderRadius: '100px',
  },
  referralInput: {
    borderRadius: '8px',
  },
  referralCard: {
    marginLeft: '7px',
    borderRadius: '8px',
    borderWidth: '2px',
    borderColor: StyleVariables.colors.border.default,
  },
  displayBlock: {
    display: 'block',
  },
  displayNone: {
    display: 'none',
  },
  cardSelect: {
    backgroundColor: '#158BD126',
    borderWidth: '2px',
    borderColor: StyleVariables.colors.base.primary,
  },
  marginTop: {
    marginTop: '16px',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginTop: '-3px',
      marginLeft: '20px',
      marginRight: '20px',
    },
    justifyContent: 'center',
  },
  scrollablediv: {
    height: 'calc(100vh - 80px)',
    overflow: 'auto',
    scrollbarWidth: 'none',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 80px)',
    },
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
  pageContainer: {
    padding: 0,
    margin: 0,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  button: {
    [theme.breakpoints.up('xl')]: {
      paddingLeft: '82px',
    },
    [theme.breakpoints.down('xl')]: {
      paddingLeft: '-10px',
    },
  },
  cardContainer: {
    marginTop: '16px',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginTop: 0,
      marginLeft: '20px',
      marginRight: '20px',
    },
    justifyContent: 'center',
  },
  imgCenter: {
    textAlign: 'center',
  },
  leftBoxContainer: {
    direction: 'rtl',
  },
}));

export default function ReferralCodePage(referralProps: ReferralProps) {
  const [selected, setSelected] = React.useState(CardSelected.Not_Selected);
  const [referralcode, setReferralcode] = useState('');
  const [referralMessage, setreferralMessage] = useState('');
  const referralValue = useSelector((state: any) => state.referral);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [appear, setAppear] = useState(true);
  const [referralError, setReferralError] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const referralValidate = () => {
    if (referralcode.length === 0) {
      setShow(true);
    } else {
      setLoading(true);
      referralProps.validateReferralCode(referralcode).then((res) => {
        setLoading(false);
        if (res?.payload?.response?.success) {
          setreferralMessage('');
          const scProductVersion =
            res?.payload?.response?.referral?.scProductVersion ?? '';
          const employeeValue =
            res?.payload?.response?.company?.noOfEmployees ?? '';
          const companyTypeValue =
            res?.payload?.response?.company?.organisationType ||
            res?.payload?.response?.company?.otherOrganisationType ||
            '';
          const otherOrganisationTypeValue =
            res?.payload?.response?.company?.otherOrganisationType || ' ';
          setReferralError(false);
          const companyDetails = {
            ...res?.payload?.response?.company,
            address: {
              ...res?.payload?.response?.company?.address,
              addressLine2:
                (res?.payload?.response?.company?.address?.addressLine2 ?? '') +
                ' ' +
                (res?.payload?.response?.company?.address?.addressLine3 ?? ''),
              county: County.United_Kingdom,
            },
            billingAddress: {
              county: County.United_Kingdom,
            },
          };

          const companyDetail = serialize(companyDetails) ?? '';

          dispatch({
            type: 'referral',
            payload: {
              ReferralCode: selected,
              referralcode_value: referralcode,
              scProductVersion: scProductVersion,
              companyDetails_value: companyDetail,
            },
          });
          for (let index = 0; index < empolyeeCountSelection.length; index++) {
            if (
              empolyeeCountSelection[index].value <= parseInt(employeeValue)
            ) {
              dispatch({
                type: 'employee',
                payload: {
                  selected: index,
                  selectedValue: employeeValue,
                },
              });
            }
          }
          if (otherOrganisationTypeValue !== (null || ' ')) {
            dispatch({
              type: 'companyType',
              payload: {
                selected: companyTypeSelected.OTHER_ORGANISATION,
                selectedValue: '',
                companyType: otherOrganisationTypeValue,
              },
            });
          } else {
            for (let index = 0; index < companyTypeSelection.length; index++) {
              if (companyTypeSelection[index].value === companyTypeValue) {
                dispatch({
                  type: 'companyType',
                  payload: {
                    selected: index,
                    selectedValue: companyTypeValue,
                    companyType: otherOrganisationTypeValue,
                  },
                });
              }
            }
          }
          setShow(false);
          setAppear(true);
          return true;
        } else {
          setreferralMessage('Code not recognised');
          setShow(true);
          setAppear(false);
          setReferralError(true);
          return false;
        }
      });
    }
  };
  const checkValidate = () => {
    if (referralcode?.length === 0) {
      setreferralMessage('');
      setReferralError(false);
      setShow(true);
      setAppear(true);
      return true;
    } else {
      setreferralMessage('');
      setReferralError(false);
      setShow(true);
      setAppear(true);
      return false;
    }
  };
  const impaired: boolean =
    (selected === CardSelected.Yes &&
      referralcode?.length > 0 &&
      show === false) ||
    selected === CardSelected.No;
  const FooterProps = {
    register: () => undefined,
    footerSectionProps: {
      visibility: 'none',
      to: 'employee',
      impaired: impaired,
      selected: selected,
      page: 'referralCode',
    },
  };
  useEffect(() => {
    setSelected(referralValue.ReferralCode);
    setReferralcode(referralValue.referralcode_value);
  }, [referralValue]);

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' && index === CardSelected.No) {
      history.push(`/${FooterProps?.footerSectionProps?.to}`);
    }
  };

  const classes = useStyles();
  const contents = [
    {
      id: 0,
      tabIndex: 1,
      value: 'Yes',
    },
    {
      id: 1,
      tabIndex: 4,
      value: 'No',
    },
  ];
  const images = ['/icons/Vectorup.png', '/icons/Vectordown.png'];
  const submit = (index) => {
    setSelected(index);
    if (index === CardSelected.No) {
      setreferralMessage('');
      setReferralError(false);
      dispatch({
        type: 'referral',
        payload: {
          ReferralCode: index,
          referralcode_value: '',
          scProductVersion: '',
          companyDetails_value: '',
        },
      });
    }
  };
  return (
    <Page className={classes.pageContainer}>
      <style type="text/css">{mobileLiveChatContainerBox}</style>
      <Grid item xs={12} className={classes.scrollablediv}>
        <AboutSection count={STEPPER_DOTS} />
        <Grid className={classes.stepper}>
          <Stepper count={STEPPER_DOTS}></Stepper>
        </Grid>
        <Typography className={classes.title} variant="h1" component="h1">
          Do you have a referral code?
        </Typography>
        <Typography className={classes.subtitle}>
          If you have been sent an invitation to join the scheme you must enter
          a valid code to be included on that client&apos;s list.
        </Typography>
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
                title={`${content.value} referral `}
              >
                <Card
                  variant="outlined"
                  tabIndex={content.tabIndex}
                  className={clsx(
                    classes.cardsContent,
                    `${selected === index ? classes.cardSelect : ''}`
                  )}
                  data-testid={
                    content.value === 'Yes' ? 'referralYes' : 'referralNo'
                  }
                  onClick={() => submit(index)}
                  onFocus={() => submit(index)}
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
          <Grid container>
            <Grid item sm={2} md={4} lg={4}></Grid>
            <Grid item xs={12} sm={8} md={4} lg={4} xl={4}>
              <FormControl variant="standard" fullWidth className={clsx(classes.formGroup)}>
                <Input
                  className={classes.referralInput}
                  state={referralError ? 'error' : 'default'}
                  type="text"
                  label="Enter your referral code"
                  required={false}
                  tabIndex={2}
                  value={referralcode}
                  data-testid="reffralCode"
                  onChange={(e) => setReferralcode(e.target.value)}
                  onKeyUp={checkValidate}
                />
                <Typography
                  data-testid="reffralCodeError"
                  className={classes.errorMessage}
                >
                  {referralMessage}
                </Typography>
                <div className={classes.greentickMarkIcon}>
                  {!show ? (
                    <DoneIcon />
                  ) : loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    ''
                  )}
                </div>
              </FormControl>
            </Grid>
            <Grid item sm={2} md={4} lg={4}></Grid>
          </Grid>
        </Grid>
        <Grid
          className={clsx(
            classes.verifyButton,
            `${selected === 0 ? classes.displayBlock : classes.displayNone}`
          )}
        >
          <Grid container>
            <Grid item sm={2} md={4} lg={4}></Grid>
            <Grid item xs={12} sm={8} md={4} lg={4} xl={4}>
              <Typography>
                <Button
                  type="submit"
                  title="Click here to verify"
                  tabIndex={3}
                  disabled={!(referralcode && show && appear && !loading)}
                  data-testid="verifyButton"
                  onClick={referralValidate}
                  className={classes.buttonBorder}
                >
                  Verify
                </Button>
              </Typography>
            </Grid>
            <Grid item sm={2} md={4} lg={4}></Grid>
          </Grid>
        </Grid>
        <div className={classes.stepper}>
          <MobileFooterSection {...FooterProps} />
        </div>
        <div className={classes.footerVisibility}>
          <FooterSection {...FooterProps} />
        </div>
      </Grid>
    </Page>
  );
}
