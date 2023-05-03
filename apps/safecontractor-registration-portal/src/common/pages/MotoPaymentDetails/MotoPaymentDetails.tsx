import React, { useEffect, useState } from 'react';
import { Grid, Checkbox } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import { LoadingPage, Page, StyleVariables } from '@alcumus/components';
import MotoAboutSection from '../../components/MotoAboutSection';
import MotoSidePanel from '../../components/MotoSidePanel';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import MotoFooterSection from '../../components/MotoFooterSection';
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
import MotoMobileFooterSection from '../../components/MotoMobileFooterSection';
import { REFERENCE } from '../../components/constants';
import MotoStepper from '../../components/MotoStepper';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { createTheme} from '@mui/material';

interface PaymentDetailsPageProps {
  register: Function;
  updateRegistrationPayment: Function;
  isFetching?: boolean;
  error?: string;
  messageFromApi?: string;
}
const STEPPER_DOTS = 5;
const Breakpoints = createTheme().breakpoints;
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
    color: StyleVariables.colors.text.default,
    marginBottom: '1rem',
  },
  paymentDetailsContainer: {
    [Breakpoints.down('sm')]: {
      marginLeft: '16px',
      marginRight: '16px',
    },
    [Breakpoints.up('sm')]: {
      marginLeft: '117px',
      marginRight: '117px',
    },
    [Breakpoints.up('md')]: {
      marginLeft: '14%',
      marginRight: '-43px',
    },
    [Breakpoints.up('xl')]: {
      marginLeft: '23%',
      marginRight: '-104px',
    },
  },
  paymentContainerAlign: {
    [Breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'inherit',
    },
    [Breakpoints.up('xs')]: {
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
    [Breakpoints.down('sm')]: {
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
    marginRight: '26px',
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.regular,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
  },
  check: {
    width: '18px',
    height: '18px',
    marginTop: '8px',
  },
  blueCheck: {
    color: `${StyleVariables.colors.base.interactive} !important`,
    display: 'flow-root',
  },
  scrollablediv: {
    height: 'calc(100vh - 80px)',
    overflow: 'auto',
    scrollbarWidth: 'none',
    [Breakpoints.down('sm')]: {
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
    [Breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  checkboxTitle: {
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.regular,
    color: StyleVariables.colors.text.default,
  },
  footerVisibility: {
    [Breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  cardContainer: {
    [Breakpoints.down('md')]: {
      display: 'none',
    },
  },
  cardContainermd: {
    [Breakpoints.up('md')]: {
      display: 'none',
    },
  },
  checkboxContainer: {
    marginTop: '0.55rem',
    marginLeft: '7px',
  },
  checkboxDetails: {
    marginTop: '1.5rem',
    marginBottom: '1rem',
    marginLeft: '-6px',
    [Breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'inherit',
    },
    [Breakpoints.up('md')]: {
      marginLeft: '-0.5rem',
    },
    [Breakpoints.up('lg')]: {
      marginLeft: '-0.4rem',
    },
    [Breakpoints.up('xl')]: {
      marginLeft: '-0.4rem',
    },
  },
  helpertext: {
    width: '100%',
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.small,
    color: StyleVariables.colors.text.subdued,
  },
  errorContainer: {
    marginTop: '1rem',
  },
  paymentContainer: {
    marginTop: '1.5rem',
    [Breakpoints.down('sm')]: {
      marginTop: '0.875rem',
      marginBottom: '0.875rem',
    },
  },
  paymentText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    [Breakpoints.up('xl')]: {
      fontSize: StyleVariables.fonts.size.h6,
      lineHeight: StyleVariables.fonts.lineHeight.regular,
    },
  },
  marginLeft: {
    marginLeft: '4px',
    [Breakpoints.up('xl')]: {
      fontSize: StyleVariables.fonts.size.h6,
      lineHeight: StyleVariables.fonts.lineHeight.regular,
    },
  },
  flex: {
    display: 'flex',
    marginTop: '8px',
  },
  subTitlePayment: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.h6,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
    marginTop: '1.5rem',
    [Breakpoints.down('sm')]: {
      marginTop: '12px',
      marginBottom: '12px',
    },
    [Breakpoints.up('xl')]: {
      fontWeight: StyleVariables.fonts.weight.regular,
      fontSize: StyleVariables.fonts.size.h6,
      lineHeight: StyleVariables.fonts.lineHeight.regular,
      marginTop: '2rem',
      marginBottom: '2rem',
    },
  },
}));
export default function MotoPaymentDetailsPage(
  paymentDetailsPageProps: PaymentDetailsPageProps
) {
  const [nextText, setnextText] = useState('Complete registration & pay now');
  const [nextPage, setnextPage] = useState('/moto/orderConfirmation');
  const [selected, setSelected] = useState(paymentOptions.CARD);
  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = React.useState(false);
  const createAccountValue = useSelector((state: any) => state.motoCreateAccount);
  const referralValue = useSelector((state: any) => state.motoReferral);
  const [registerRequest, setRegisterRequest] = useState<RegisterRequest>();
  const [errorMessage, setErrorMessage] = React.useState<string[]>([]);
  const [sendInviteWhenSaving, setSendInviteWhenSaving] = useState(false);
  const [sendInviteWhenSaving1, setSendInviteWhenSaving1] = useState(false);
  const dispatch = useDispatch();
  const employeeCardValue = useSelector((state: any) => state.motoEmployee);
  const companyTypeValue = useSelector((state: any) => state.motoCompanyType);
  const choosePlansSelector = useSelector((state: any) => state.motoChoosePlans);
  const registerPaymentSelector = useSelector((state: any) => state.motoPayment);
  const companyDetailsSelector = useSelector(
    (state: any) => state.motoCompanyDetails
  );
  const responseTimeSelector = useSelector((state: any) => state.motoResponseTime);
  const needSupportSelector = useSelector((state: any) => state.motoNeedSupport);
  const subsidiaryListSelector = useSelector((state: any) => state.motoSubsidiary);
  const basketSelector = useSelector((state: any) => state.motoBasket);
  const [basketSelected, setBasketSelected] = useState(undefined);

  const FooterProps = {
    footerSectionProps: {
      from: 'moto/companyDetails',
      impaired: sendInviteWhenSaving1,
      text: nextText,
      mobileText: nextText,
      prevText: 'Previous',
      type: 'payment',
      page: 'motoPayment',
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
        type: 'motoFetchDataCompleted',
        payload: {
          register_request: JSON.stringify(registerRequest),
        },
      });
    }
  }, [selected, basketSelected]);

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
                type: 'motoRegisterDetails',
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
          type: 'motoRegisterDetails',
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
                    type: 'motoRegisterDetails',
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
              type: 'motoRegisterDetails',
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
      setnextPage('/moto/orderConfirmation');
      selectedValue = 'CARD';
    } else {
      setnextText('Complete registration');
      setnextPage('/moto/registrationComplete');
      selectedValue = 'BACS';
    }
    dispatch({
      type: 'motoPaymentDetails',
      payload: {
        PaymentCard: JSON.stringify(value),
        paymentcard_Value: selectedValue,
      },
    });
    setIsChecked(!isChecked);
    setSelected(value);
  };

  const classes = useStyles();

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
            <MotoAboutSection count={STEPPER_DOTS} />
            <Grid className={classes.stepper}>
              <MotoStepper count={STEPPER_DOTS}></MotoStepper>
            </Grid>
            <Typography className={classes.title}>Payment details</Typography>
            <Typography className={classes.subtitle}>
              Final step to completing your SafeContractor registration. Simply
              check your price and choose your payment method
            </Typography>
            <Grid item xs={12} md={1} className={classes.cardContainermd}>
              <MotoSidePanel />
            </Grid>
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
                    <input
                      type="radio"
                      aria-label="Credit / Debit card"
                      value="1"
                      title="Click here for CARD"
                      data-testid="creditCardSelected"
                      checked={isChecked}
                      onChange={() => {
                        choosePaymentSelection(PaymentMethod[0].key);
                      }}
                      name="card"
                      className={classes.radioDetailContainer}
                    />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.textCard}>
                      Credit / Debit card
                    </Typography>
                  </Grid>
                  <Grid item>
                    <input
                      type="radio"
                      aria-label="BACS"
                      value="2"
                      title="Click here for BACS"
                      data-testid="bacsSelected"
                      checked={!isChecked}
                      onChange={() => {
                        choosePaymentSelection(PaymentMethod[1].key);
                      }}
                      name="card"
                      className={classes.radioDetailContainer}
                    />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.textCard}>BACS</Typography>{' '}
                  </Grid>
                </Grid>
                {selected === 2 && (
                  <Grid container>
                    <Grid item lg={12}>
                      <Typography className={classes.subTitlePayment}>
                        Please make note of our company BACS details in order
                        for you to make the required payment.
                      </Typography>
                    </Grid>
                    <Grid item lg={12} className={classes.paymentContainer}>
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
                <Grid container className={classes.checkboxDetails}>
                  <Checkbox
                    inputProps={{
                      'aria-label': 'SafeContractor member discounts',
                      // @ts-ignore
                      'data-testid': 'SafeContractorMemberDiscounts',
                    }}
                    className={classes.blueCheck}
                    checked={sendInviteWhenSaving}
                    title="Click here for SafeContractor member discounts"
                    required={true}
                    onChange={(e) => setSendInviteWhenSaving(e.target.checked)}
                  />
                  <Grid item xs={10} className={classes.checkboxContainer}>
                    <Typography className={classes.checkboxTitle}>
                      SafeContractor member discounts
                    </Typography>
                    <Typography className={classes.helpertext}>
                      Please tick this box if you would like to hear from us
                      about exclusive discounts that could save you money. Your
                      details will be shared with our carefully selected
                      corporate partners who may contact you by telephone, email
                      and/or post regarding their services. You can withdraw
                      consent at any time
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className={classes.checkboxDetails}>
                  <Checkbox
                    inputProps={{
                      'aria-label': 'I agree to the Terms and Conditions',
                      // @ts-ignore
                      'data-testid': 'agreeTerms',
                    }}
                    className={classes.blueCheck}
                    checked={sendInviteWhenSaving1}
                    title="Click here for I agree to the Terms and Conditions"
                    required={true}
                    onChange={(e) => setSendInviteWhenSaving1(e.target.checked)}
                  />
                  <Grid item xs={10} className={classes.checkboxContainer}>
                    <Typography className={classes.checkboxTitle}>
                      I agree to the Terms and Conditions
                    </Typography>
                    <Typography className={classes.helpertext}>
                      By proceeding to place your order and enter into a legally
                      binding agreement, you agree to the website{' '}
                      <a
                        className={classes.subText}
                        href={REFERENCE.TERMS_OF_SERVICE}
                        target="_blank"
                        title="Click here for Terms and Conditions"
                        rel="noreferrer noopener"
                      >
                        Terms and Conditions
                      </a>{' '}
                      and our{' '}
                      <a
                        className={classes.subText}
                        href={REFERENCE.PRIVACY_POLICY}
                        target="_blank"
                        title="Click here for Privacy Policy"
                        rel="noreferrer noopener"
                      >
                        Privacy Policy.
                      </a>{' '}
                      This product is non-refundable.
                    </Typography>
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

              <Grid item xs={2} md={1} className={classes.cardContainer}>
                <MotoSidePanel />
              </Grid>
            </Grid>
          </Grid>
          <div className={classes.stepper}>
            <MotoMobileFooterSection register={registration} {...FooterProps} />
          </div>
          <div className={classes.footerVisibility}>
            <MotoFooterSection register={registration} {...FooterProps} />
          </div>
        </>
      )}
    </Page>
  );
}
