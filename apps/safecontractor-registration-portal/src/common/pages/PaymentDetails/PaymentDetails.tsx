import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import { LoadingPage, Page, StyleVariables } from '@alcumus/components';
import clsx from 'clsx';
import AboutSection from '../../components/AboutSection';
import SidePanel from '../../components/SidePanel';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import FooterSection from '../../components/FooterSection';
import { CompanyDetails, RegisterRequest, Subsidiaries } from '../../types';
import {
  DefaultBrand,
  DefaultPaymentCard,
  DefaultSourcePortal,
  PaymentAccount,
  PaymentCompany,
  PaymentIBAN,
  PaymentMethod,
  paymentOptions,
  PaymentSortCode,
  PaymentSwift,
  responseTimeSelected,
} from '../../constants';
import { useHistory } from 'react-router-dom';
import MobileFooterSection from '../../components/MobileFooterSection';
import { REFERENCE } from '../../components/constants';
import Stepper from '../../components/Stepper';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import serialize from 'serialize-javascript';
interface PaymentDetailsPageProps {
  register: Function;
  updateRegistrationPayment: Function;
  isFetching?: boolean;
  error?: string;
  messageFromApi?: string;
}
const STEPPER_DOTS = 5;
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    marginTop: '16px',
    textAlign: 'center',
  },
  subtitle: {
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.smaller,
    lineHeight: StyleVariables.fonts.lineHeight.smaller,
    textAlign: 'center',
    marginTop: '12px',
    marginLeft: '1rem',
    marginRight: '1rem',
    color: StyleVariables.colors.text.default,
    marginBottom: '1rem',
  },
  paymentDetailsContainer: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '16px',
      marginRight: '16px',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '117px',
      marginRight: '117px',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '14%',
      marginRight: '-43px',
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '23%',
      marginRight: '-73px',
    },
  },
  paymentContainerAlign: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'inherit',
    },
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      flexWrap: 'inherit',
    },
  },
  radioDetailContainer: {
    marginRight: '8px',
    marginTop: '7px',
  },
  paymentDetailMargin: {
    marginTop: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'inherit',
    },
  },
  paymentTextMargin: {
    marginTop: '24px',
    marginLeft: '4px',
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.regular,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
  },
  textCard: {
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.regular,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
    [theme.breakpoints.up('md')]: {
      marginRight: '26px',
    },
  },
  check: {
    width: '2.125rem',
    height: '1.125rem',
    marginTop: '13px',
    marginLeft: '26px',
  },
  blueCheck: {
    color: `${StyleVariables.colors.base.interactive} !important`,
    display: 'flex',
  },
  checklabel: {
    display: 'inline-flex',
    marginLeft: '-11px',
  },
  checklabeldemo: {
    display: 'inline-flex',
    marginLeft: '20px',
  },
  blueCheckbox: {
    maxWidth: '2rem',
    textAlign: 'left',
    display: 'contents',
  },
  scrollablediv: {
    height: 'calc(100vh - 80px)',
    overflow: 'auto',
    scrollbarWidth: 'none',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 120px)',
    },
  },
  errorMessage: {
    color: StyleVariables.colors.text.critical,
    fontWeight: StyleVariables.fonts.weight.regular,
    lineHeight: StyleVariables.fonts.lineHeight.xs,
    textAlign: 'center',
    fontSize: StyleVariables.fonts.size.small,
    marginBottom: '2px',
  },
  subText: {
    color: StyleVariables.colors.base.primary,
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
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
  checkboxTitle: {
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.regular,
    color: StyleVariables.colors.text.default,
  },
  footerVisibility: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  cardContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  cardContainermd: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  checkboxContainer: {
    marginTop: '0.55rem',
    marginLeft: '7px',
  },
  checkboxContainerdemo: {
    marginTop: '0.55rem',
    marginLeft: '7px',
  },
  checkboxDetails: {
    marginTop: '1.5rem',
    marginBottom: '1rem',
    marginLeft: '-6px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'inherit',
      display: 'block',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '-0.5rem',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '-0.4rem',
    },
  },
  helpertext: {
    width: '100%',
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.small,
    color: StyleVariables.colors.icon.default,
  },
  errorContainer: {
    marginTop: '1rem',
  },
  paymentContainer: {
    marginTop: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0.875rem',
      marginBottom: '0.875rem',
    },
  },
  paymentText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    [theme.breakpoints.up('xl')]: {
      fontSize: StyleVariables.fonts.size.h6,
      lineHeight: StyleVariables.fonts.lineHeight.regular,
    },
  },
  marginLeft: {
    marginLeft: '4px',
    [theme.breakpoints.up('xl')]: {
      fontSize: StyleVariables.fonts.size.h6,
      lineHeight: StyleVariables.fonts.lineHeight.regular,
    },
  },
  flex: {
    display: 'flex',
    marginTop: '8px',
  },
  sideboxContainer: {
    marginLeft: '1rem',
  },
  subTitlePayment: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.h6,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
    marginTop: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '12px',
      marginBottom: '12px',
    },
    [theme.breakpoints.up('xl')]: {
      fontWeight: StyleVariables.fonts.weight.regular,
      fontSize: StyleVariables.fonts.size.h6,
      lineHeight: StyleVariables.fonts.lineHeight.regular,
      marginTop: '2rem',
      marginBottom: '2rem',
    },
  },
  fieldsetBorder: {
    border: 'none',
  },
}));
export default function PaymentDetailsPage(
  paymentDetailsPageProps: PaymentDetailsPageProps
) {
  const [nextText, setnextText] = useState('Complete registration & pay now');
  const [nextPage, setnextPage] = useState('/orderConfirmation');
  const [selected, setSelected] = useState(paymentOptions.CARD);
  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = React.useState(false);
  const createAccountValue = useSelector((state: any) => state.createAccount);
  const referralValue = useSelector((state: any) => state.referral);
  const [registerRequest, setRegisterRequest] = useState<RegisterRequest>();
  const [errorMessage, setErrorMessage] = React.useState<string[]>([]);
  const [sendInviteWhenSaving, setSendInviteWhenSaving] = useState(false);
  const [sendInviteWhenSaving1, setSendInviteWhenSaving1] = useState(false);
  const dispatch = useDispatch();
  const employeeCardValue = useSelector((state: any) => state.employee);
  const companyTypeValue = useSelector((state: any) => state.companyType);
  const choosePlansSelector = useSelector((state: any) => state.choosePlans);
  const registerPaymentSelector = useSelector((state: any) => state.payment);
  const companyDetailsSelector = useSelector((state: any) => state.companyDetails);
  const responseTimeSelector = useSelector((state: any) => state.responseTime);
  const needSupportSelector = useSelector((state: any) => state.needSupport);
  const subsidiaryListSelector = useSelector((state: any) => state.subsidiary);
  const basketSelector = useSelector((state: any) => state.basket);
  const [basketSelected, setBasketSelected] = useState(undefined);

  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDimenion]);

  const FooterProps = {
    footerSectionProps: {
      from: 'companyDetails',
      impaired: sendInviteWhenSaving1,
      text: nextText,
      mobileText: nextText,
      prevText: 'Previous',
      type: 'payment',
      page: 'payment',
    },
  };

  useEffect(() => {
    if (basketSelector.total !== undefined) {
      setBasketSelected(basketSelector.total);
    }
  });
  useEffect(() => {
    const scProductVersion = referralValue.scProductVersion;
    const referralCode = referralValue.referralcode_value;
    const noOfEmployees = employeeCardValue.selectedValue;
    const organisationType = companyTypeValue.selectedValue;
    const otherOrganisationType = companyTypeValue.companyType;
    const choosePlan = choosePlansSelector.selectedValue;
    const responseTime = responseTimeSelector.selectedValue;
    const requireAssistance = needSupportSelector.selectedValue;
    const subsidiaryList = subsidiaryListSelector.companyList;
    const subsidiaries: Subsidiaries[] = subsidiaryList ?? [];
    const noOfSubsidiaries = subsidiaries.length;
    const companyDetailsValue = companyDetailsSelector.companyDetails;

    if (companyDetailsValue !== undefined && companyDetailsValue !== null) {
      const companyDetails: CompanyDetails = JSON.parse(companyDetailsValue);
      if (companyDetails) {
        setRegisterRequest({
          scProductVersion: scProductVersion ?? '',
          referral: {
            referralCode: referralCode ?? '',
          },
          company: {
            ...companyDetails,
            billingAddress: {
              addressLine1: companyDetails.billingAddress?.addressLine1 ?? '',
              addressLine2: companyDetails.billingAddress?.addressLine2 ?? '',
              addressLine3: companyDetails.billingAddress?.addressLine3 ?? '',
              county: companyDetails.billingAddress?.county ?? '',
              postCode: companyDetails.billingAddress?.postCode ?? '',
              town: companyDetails.billingAddress?.town ?? '',
            },
            contactPerson: {
              ...companyDetails.contactPerson,
              firstName: referralCode
                ? companyDetails?.contactPerson?.firstName
                : createAccountValue.firstName,
              surname: referralCode
                ? companyDetails?.contactPerson?.surname
                : createAccountValue.lastName,
              emailAddress: referralCode
                ? companyDetails?.contactPerson?.emailAddress
                : createAccountValue.email,
            },
            noOfEmployees: noOfEmployees ? parseInt(noOfEmployees) : 0,
            organisationType: organisationType ?? '',
            otherOrganisationType: otherOrganisationType ?? '',
            noOfSubsidiaries: noOfSubsidiaries,
            subsidiaries: subsidiaries,
            password: createAccountValue.password ?? '',
            preventExternalMarketing: sendInviteWhenSaving,
          },
          productSelection: {
            brands: [
              {
                brand: DefaultBrand,
                memberships: choosePlan ? [choosePlan] : [],
                requireAssistance: !!requireAssistance,
                responseTime: responseTime ?? responseTimeSelected.TWO_DAYS,
                discountCodes: basketSelector.discountCode
                  ? [basketSelector.discountCode]
                  : [],
                total: basketSelected ?? 0,
              },
            ],
            total: basketSelected ?? 0,
          },
        });
      }

      dispatch({
        type: 'FetchDataCompleted',
        payload: {
          register_request: serialize(registerRequest),
        },
      });
    }
  }, [selected, basketSelected, sendInviteWhenSaving]);

  const history = useHistory();
  const registration = () => {
    setLoading(true);
    const contractorID = registerPaymentSelector?.contractorId;
    const membershipID = registerPaymentSelector?.membershipId;
    if (contractorID && membershipID) {
      const updateRegisterRequest = {
        contractorId: contractorID,
        paymentMethod: DefaultPaymentCard,
        sourcePortal: DefaultSourcePortal,
      };
      if (selected === paymentOptions.CARD) {
        paymentDetailsPageProps
          .updateRegistrationPayment(updateRegisterRequest)
          .then((res) => {
            if (res?.payload?.response?.success) {
              const cartIdExist = res?.payload?.response?.success;
              dispatch({
                type: 'registerDetails',
                payload: {
                  contractorId: contractorID,
                  membershipId: membershipID,
                  cartIdExist: cartIdExist,
                  isRegistered: false,
                  to: nextPage,
                },
              });
              if (!res?.payload?.response?.paymentUrl) {
                setLoading(false);
                setErrorMessage([
                  'Redirection to Payment Gateway is not currently working',
                ]);
              } else {
                window.location.href = res?.payload?.response?.paymentUrl;
              }
            } else {
              setLoading(false);
              setErrorMessage(['Payment is Not working']);
            }
          });
      } else {
        dispatch({
          type: 'registerDetails',
          payload: {
            contractorId: contractorID,
            membershipId: membershipID,
            isRegistered: true,
            to: nextPage,
          },
        });
        history.push(nextPage);
      }
    } else {
      paymentDetailsPageProps.register(registerRequest).then((res) => {
        if (res?.payload?.response?.success) {
          const contractorId = res?.payload?.response?.company?.id;
          const membershipId = res?.payload?.response?.company?.coref;
          const updateRegisterRequest = {
            contractorId: contractorId,
            paymentMethod: DefaultPaymentCard,
            sourcePortal: DefaultSourcePortal,
          };
          if (selected === paymentOptions.CARD) {
            paymentDetailsPageProps
              .updateRegistrationPayment(updateRegisterRequest)
              .then((res) => {
                if (res?.payload?.response?.success) {
                  const cartIdExist = res?.payload?.response?.success;
                  dispatch({
                    type: 'registerDetails',
                    payload: {
                      contractorId: contractorId,
                      membershipId: membershipId,
                      cartIdExist: cartIdExist,
                      isRegistered: false,
                      to: nextPage,
                    },
                  });
                  if (!res?.payload?.response?.paymentUrl) {
                    setLoading(false);
                    setErrorMessage([
                      'Redirection to Payment Gateway is not currently working',
                    ]);
                  } else {
                    window.location.href = res?.payload?.response?.paymentUrl;
                  }
                } else {
                  setLoading(false);
                  setErrorMessage(['Payment is Not working']);
                }
              });
          } else {
            dispatch({
              type: 'registerDetails',
              payload: {
                contractorId: contractorId,
                membershipId: membershipId,
                isRegistered: true,
                to: nextPage,
              },
            });
            history.push(nextPage);
          }
        } else {
          setLoading(false);
          if (res?.payload?.response?.errors?.length > 0) {
            setErrorMessage(res?.payload?.response?.errors);
          } else {
            setErrorMessage(['Unable to register']);
          }
        }
      });
    }
  };

  const choosePaymentSelection = (value) => {
    let selectedValue;

    if (value === paymentOptions.CARD) {
      setnextText('Complete registration & pay now');
      setnextPage('/orderConfirmation');
      selectedValue = 'CARD';
    } else {
      setnextText('Complete registration');
      setnextPage('/registrationComplete');
      selectedValue = 'BACS';
    }
    dispatch({
      type: 'paymentDetails',
      payload: {
        PaymentCard: serialize(value),
        paymentcard_Value: selectedValue,
      },
    });
    setIsChecked(!isChecked);
    setSelected(value);
  };
  interface paymProps {
    key?: number;
    value?: string;
  }
  const classes = useStyles();
  const bacsKey = Object.values(PaymentMethod).find(
    (bac: paymProps) => bac.value === 'BACS'
  )?.key;
  const cardKey = Object.values(PaymentMethod).find(
    (card: paymProps) => card.value === 'CARD'
  )?.key;
  return (
    <Page className={classes.cssPage}>
      {loading ? (
        <LoadingPage
          message="Loading ..."
          logoImageUrl="/images/alcumus-logo-with-tagline.svg"
        ></LoadingPage>
      ) : (
        <>
          <Grid item xs={12} className={classes.scrollablediv}>
            <header>
              <AboutSection count={STEPPER_DOTS} />
            </header>
            <Grid className={classes.stepper}>
              <Stepper count={STEPPER_DOTS}></Stepper>
            </Grid>
            <Typography className={classes.title} variant="h1" component="h1">
              Payment details
            </Typography>
            <Typography className={classes.subtitle}>
              Final step to completing your SafeContractor registration. Simply
              check your price and choose your payment method
            </Typography>
            {windowDimenion.winWidth < 960 && (
              <Grid item xs={12} md={1} className={classes.cardContainermd}>
                <SidePanel />
              </Grid>
            )}
            <Grid container className={classes.paymentContainerAlign}>
              <Grid
                item
                lg={6}
                xl={6}
                md={6}
                className={classes.paymentDetailsContainer}
              >
                <Typography className={classes.paymentTextMargin}>
                  Payment method:
                </Typography>
                <Grid container className={classes.paymentDetailMargin}>
                  <Grid item>
                    <fieldset className={classes.fieldsetBorder}>
                      <legend></legend>
                      <label className={classes.textCard}>
                        <input
                          type="radio"
                          value="1"
                          title="Click here for card"
                          data-testid="creditCardSelected"
                          checked={isChecked}
                          onChange={() => {
                            choosePaymentSelection(bacsKey);
                          }}
                          name="card"
                          className={classes.radioDetailContainer}
                        />
                        Credit / Debit card
                      </label>
                    </fieldset>
                  </Grid>

                  <Grid item>
                    <fieldset className={classes.fieldsetBorder}>
                      <legend></legend>
                      <label className={classes.textCard}>
                        <input
                          type="radio"
                          value="2"
                          title="Click here for BACS"
                          data-testid="bacsSelected"
                          checked={!isChecked}
                          onChange={() => {
                            choosePaymentSelection(cardKey);
                          }}
                          name="card"
                          className={classes.radioDetailContainer}
                        />
                        BACS
                      </label>
                    </fieldset>
                  </Grid>
                </Grid>
                {selected === 2 && (
                  <Grid container>
                    <Grid item md={11} lg={11}>
                      <Typography className={classes.subTitlePayment}>
                        Please make note of our company BACS details in order
                        for you to make the required payment.
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      md={10}
                      lg={12}
                      className={classes.paymentContainer}
                    >
                      <Grid container>
                        <Grid item xs={12} sm={6}>
                          <Grid container>
                            <Grid item xs={12} className={classes.flex}>
                              <Grid item>
                                <Typography className={classes.paymentText}>
                                  Payment transfers to:
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography className={classes.marginLeft}>
                                  {PaymentCompany}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} className={classes.flex}>
                              <Grid item>
                                <Typography className={classes.paymentText}>
                                  Sort code:
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography className={classes.marginLeft}>
                                  {PaymentSortCode}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} className={classes.flex}>
                              <Grid item>
                                <Typography className={classes.paymentText}>
                                  Account:
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography className={classes.marginLeft}>
                                  {PaymentAccount}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Grid container>
                            <Grid item xs={12} className={classes.flex}>
                              <Grid item>
                                <Typography className={classes.paymentText}>
                                  IBAN:
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography className={classes.marginLeft}>
                                  {PaymentIBAN}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} className={classes.flex}>
                              <Grid item>
                                <Typography className={classes.paymentText}>
                                  SWIFT:
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography className={classes.marginLeft}>
                                  {PaymentSwift}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={10}>
                      <Typography className={classes.subTitlePayment}>
                        Please note: If you continue to pay by BACS you
                        won&apos;t be able to access your SafeContractor account
                        until we receive payment.
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                <Grid
                  container
                  className={classes.checkboxDetails}
                  aria-hidden="false"
                >
                  <Grid item xs={1} className={clsx(classes.blueCheckbox)}>
                    <label className={classes.checklabel}>
                      <input
                        type="checkbox"
                        className={clsx(classes.check, classes.blueCheck)}
                        checked={sendInviteWhenSaving}
                        title="Click here for SafeContractor member discounts"
                        required={true}
                        onChange={(e) =>
                          setSendInviteWhenSaving(e.target.checked)
                        }
                        // @ts-ignore
                        data-testid="SafeContractorMemberDiscounts"
                      />
                      <Grid
                        item
                        xs={10}
                        className={classes.checkboxContainer}
                        aria-hidden="false"
                      >
                        <Typography
                          className={classes.checkboxTitle}
                          aria-hidden="false"
                        >
                          SafeContractor member discounts
                        </Typography>
                        <Typography
                          className={classes.helpertext}
                          aria-hidden="false"
                        >
                          Please tick this box if you would like to hear from us
                          about exclusive discounts that could save you money.
                          Your details will be shared with our carefully
                          selected corporate partners who may contact you by
                          telephone, email and/or post regarding their services.
                          You can withdraw consent at any time
                        </Typography>
                      </Grid>
                    </label>
                  </Grid>
                </Grid>

                <Grid container className={classes.checkboxDetails}>
                  <Grid item xs={1} className={clsx(classes.blueCheckbox)}>
                    <label className={classes.checklabel}>
                      <input
                        type="checkbox"
                        className={clsx(classes.check, classes.blueCheck)}
                        checked={sendInviteWhenSaving1}
                        title="Click here for SafeContractor member discounts"
                        required={true}
                        onChange={(e) =>
                          setSendInviteWhenSaving1(e.target.checked)
                        }
                        // @ts-ignore
                        data-testid="agreeTerms"
                      />

                      <Grid item xs={10} className={classes.checkboxContainer}>
                        <Typography className={classes.checkboxTitle}>
                          Terms and Conditions
                        </Typography>
                        <Typography className={classes.helpertext}>
                          Please carefully read the{' '}
                          <a
                            className={classes.subText}
                            href={REFERENCE.TERMS_OF_SERVICE}
                            target="_blank"
                            title="Click here for Terms and Conditions"
                            rel="noreferrer noopener"
                            tabIndex={-1}
                          >
                            Terms and Conditions
                          </a>{' '}
                          that will apply to this legally binding contract
                          before ticking the box below to accept you are happy
                          to proceed on this basis. Please note that this
                          product is non-refundable. This does not affect your
                          statutory rights. The membership is a continuous
                          service billed annually. You have the right to opt out
                          of auto-renewal by providing us with notice at least
                          14 days prior to the renewal.
                        </Typography>
                        <Typography className={classes.helpertext}>
                          I confirm that I have read and understand the terms
                          and conditions and agree that they shall govern the
                          contractual relationship.
                        </Typography>
                      </Grid>
                    </label>
                  </Grid>
                </Grid>
                <Grid container className={classes.errorContainer}>
                  <Grid item xs={12}>
                    {errorMessage.length > 0 &&
                      errorMessage.map((error, index) => (
                        <Typography
                          data-testid="registerCummalativeError"
                          key={index}
                          className={classes.errorMessage}
                        >
                          {error}
                        </Typography>
                      ))}
                  </Grid>
                  <Grid item xs={12}>
                    {errorMessage.length > 0 && (
                      <Typography
                        data-testid="registerError"
                        className={classes.errorMessage}
                      >
                        Please try again modifying your previous responses.
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.sideboxContainer} />
              <Grid item xs={2} md={1} className={classes.cardContainer}>
                <SidePanel />
              </Grid>
            </Grid>
          </Grid>
          <div className={classes.stepper}>
            <MobileFooterSection register={registration} {...FooterProps} />
          </div>
          <div className={classes.footerVisibility}>
            <FooterSection register={registration} {...FooterProps} />
          </div>
        </>
      )}
    </Page>
  );
}
