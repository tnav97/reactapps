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
import MotoAboutSection from '../../components/MotoAboutSection';
import MotoFooterSection from '../../components/MotoFooterSection';
import DoneIcon from '@mui/icons-material/Done';
import clsx from 'clsx';
import MotoStepper from '../../components/MotoStepper';
import MotoMobileFooterSection from '../../components/MobileFooterSection';
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
import { createTheme} from '@mui/material';

interface ReferralProps {
  validateReferralCode: Function;
  messageFromApi?: string;
  isFetching: boolean;
  error?: string;
}

const STEPPER_DOTS = 2;

const Breakpoints = createTheme().breakpoints;
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    marginTop: '24px',
    [Breakpoints.down('sm')]: {
      marginTop: '16px',
      marginLeft: '1rem',
      marginRight: '1rem',
    },
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
    [Breakpoints.down('sm')]: {
      marginLeft: '16px',
      marginRight: '16px',
      paddingLeft: '4px',
      paddingRight: '4px',
      marginBottom: '24px',
    },
    color: StyleVariables.colors.text.subdued,
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
  },
  cardsContent: {
    height: '208px',
    marginLeft: '8px',
    marginRight: '8px',
    [Breakpoints.down('sm')]: {
      height: '56px',
      margin: 'auto',
      marginTop: '0.8rem',
    },
    borderRadius: '8px',
    borderWidth: '2px',
    borderColor: StyleVariables.colors.border.default,
    cursor: 'pointer',
  },
  verifyButton: {
    marginTop: '8px',
    marginLeft: '1rem',
    marginRight: '1rem',
    [Breakpoints.down('sm')]: {
      marginBottom: '1rem',
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
    backgroundColor: StyleVariables.colors.background.primary,
    borderWidth: '2px',
    borderColor: StyleVariables.colors.base.primary,
  },
  marginTop: {
    marginTop: '16px',
    [Breakpoints.down('sm')]: {
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
    [Breakpoints.down('sm')]: {
      height: 'calc(100vh - 80px)',
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
  pageContainer: {
    padding: 0,
    margin: 0,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  button: {
    [Breakpoints.up('xl')]: {
      paddingLeft: '82px',
    },
    [Breakpoints.down('xl')]: {
      paddingLeft: '-10px',
    },
  },
  imgCenter: {
    textAlign: 'center',
  },
}));

export default function MotoReferralCodePage(referralProps: ReferralProps) {
  const [selected, setSelected] = React.useState(CardSelected.Not_Selected);
  const [referralcode, setReferralcode] = useState('');
  const [referralMessage, setreferralMessage] = useState('');
  const referralValue = useSelector((state: any) => state.motoReferral);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [appear, setAppear] = useState(true);
  const [referralError, setReferralError] = useState(false);
  const [loading, setLoading] = useState(false);
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

          const companyDetail = JSON.stringify(companyDetails) ?? '';

          dispatch({
            type: 'motoReferral',
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
                type: 'motoEmployee',
                payload: {
                  selected: index,
                  selectedValue: employeeValue,
                },
              });
            }
          }
          if (otherOrganisationTypeValue !== (null || ' ')) {
            dispatch({
              type: 'motoCompanyType',
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
                  type: 'motoCompanyType',
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
      to: 'moto/employee',
      impaired: impaired,
      selected: selected,
      page: 'motoReferralCode',
    },
  };
  useEffect(() => {
    setSelected(referralValue.ReferralCode);
    setReferralcode(referralValue.referralcode_value);
  }, [referralValue]);

  const classes = useStyles();
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
  const submit = (index) => {
    setSelected(index);
    if (index === CardSelected.No) {
      dispatch({
        type: 'motoReferral',
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
        <MotoAboutSection count={STEPPER_DOTS} />
        <Grid className={classes.stepper}>
          <MotoStepper count={STEPPER_DOTS}></MotoStepper>
        </Grid>
        <Typography className={classes.title}>
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
              className={clsx(classes.marginTop)}
            >
              <Box title={content.value}>
                <Card
                  variant="outlined"
                  className={clsx(
                    classes.cardsContent,
                    `${selected === index ? classes.cardSelect : ''}`
                  )}
                  data-testid={
                    content.value === 'Yes' ? 'referralYes' : 'referralNo'
                  }
                  onClick={() => submit(index)}
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
          <MotoMobileFooterSection {...FooterProps} />
        </div>
        <div className={classes.footerVisibility}>
          <MotoFooterSection {...FooterProps} />
        </div>
      </Grid>
    </Page>
  );
}
