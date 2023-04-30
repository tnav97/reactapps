import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import DoneIcon from '@mui/icons-material/Done';
import Typography from '@mui/material/Typography';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import clsx from 'clsx';
import CardContent from '@mui/material/CardContent';
import { CompanyDetails, BasketRequest, Subsidiaries } from '../../types';
import { Grid, CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { CardSelected, DefaultBrand } from '../../constants';
import { StyleVariables, Input, Button } from '@alcumus/components';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
  basketDetail,
  Memberships,
  Discount,
} from '../../../server/models/basketCode';

interface SidePanelProps {
  basketCode: Function;
  messageFromApi?: string;
  isFetching: boolean;
  error?: string;
}

const useStyles = makeStyles((theme) => ({
  separator: {
    background: StyleVariables.colors.border.default,
    height: '0.1em',
    fontSize: StyleVariables.fonts.size.smaller,
    marginLeft: '1px',
    marginRight: '1px',
    marginBottom: '1rem',
    [theme.breakpoints.down('md')]: {
      marginTop: '3px',
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '0px',
      marginRight: '6px',
    },
  },
  separator1: {
    background: StyleVariables.colors.border.default,
    height: '0.1em',
    marginBottom: '1rem',
    fontSize: StyleVariables.fonts.size.smaller,
    marginLeft: '1px',
    marginRight: '1px',
    [theme.breakpoints.up('xl')]: {
      width: '100%',
      marginBottom: '1rem',
    },
  },
  circular: {
    marginTop: '30%',
    marginLeft: '50%',
    marginBottom: '30%',
  },
  title: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: StyleVariables.fonts.weight.bold,
    fontSize: StyleVariables.fonts.size.h5,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
  },
  detailstitle: {
    fontSize: StyleVariables.fonts.size.regular,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  spacingDetails: {
    marginBottom: '0.5rem',
  },
  greentickMarkIcon: {
    position: 'absolute',
    color: StyleVariables.colors.base.success,
    top: '8px',
    float: 'right',
    left: '130%',
    [theme.breakpoints.down('md')]: {
      left: '130%',
    },
    [theme.breakpoints.up('md')]: {
      top: '8px',
      left: '86%',
      color: '#3F8627',
      position: 'absolute',
    },
  },
  subtitle: {
    fontSize: StyleVariables.fonts.size.small,
  },
  cardContainer: {
    background: StyleVariables.colors.surface.neutral.selected,
  },
  showDetails: {
    marginTop: '0.1rem',
    float: 'right',
  },
  showDetails1: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '0.5rem',
    marginLeft: '4px',
  },
  card: {
    background: StyleVariables.colors.surface.neutral.selected,
    marginTop: '1rem',
    border: 'none',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '16px',
      marginRight: '16px',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '117px',
      marginRight: '117px',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '0px',
      marginRight: '0px',
    },
  },
  subText: {
    color: StyleVariables.colors.text.subdued,
  },
  iconDetails: {
    color: StyleVariables.colors.base.primary,
  },
  discountContainer: {
    color: `${StyleVariables.colors.base.primary} !important`,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  discountDetails: {},
  displayInput: {
    position: 'relative',
    width: '100%',
  },
  inputTextAlign: {
    [theme.breakpoints.down('md')]: {
      width: '150%',
    },
  },
  cardContentContainer: {
    padding: '1px 1px',
    marginTop: '5px',
    [theme.breakpoints.up('xl')]: {
      padding: '0rem',
      marginTop: '5px',
    },
    [theme.breakpoints.down('lg')]: {
      paddingBottom: 0,
    },
  },
  applyButton: {
    marginTop: '1rem',
    marginLeft: '0px',
    borderRadius: '6.25rem',
    [theme.breakpoints.down('md')]: {
      marginLeft: '1rem',
      marginTop: '0',
    },
  },
  applyButtonAlign: {
    [theme.breakpoints.down('lg')]: {
      marginTop: '8px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '-5px',
    },
  },
  discountAlign: {
    display: 'contents',
  },
  errorMessage: {
    color: StyleVariables.colors.text.critical,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.xs,
    lineHeight: StyleVariables.fonts.lineHeight.small,
  },
  expandDetails: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  removeCode: {
    width: '100%',
    marginTop: '-1.9rem',
    marginLeft: '8rem',
    fontSize: StyleVariables.fonts.size.small,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  totalText: {
    fontWeight: StyleVariables.fonts.weight.bold,
  },
}));
export default function SidePanel(SidePanelProps: SidePanelProps) {
  const [show, setShow] = useState(true);
  const [discountShow, setDiscountShow] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<basketDetail>();
  const [undependentselectedPlan, setUndependentSelectedPlan] =
    useState<basketDetail>();
  const [discountPlan, setDiscountPlan] = useState<Discount>();
  const [planDetails, setPlanDetails] = useState<Memberships>();
  const [subscriberQty, setSubscriberQty] = useState(0);
  const dispatch = useDispatch();
  const [discountError, setDiscountError] = useState(false);
  const [subscriptionCount, setSubscriptionCount] = useState(0);

  const [detailsShow, setDetailsShow] = useState(true);

  const [discountDetails, setDiscountDetails] = useState('');
  const [showdiscount, setShowDiscount] = useState(false);
  const [basketRequest, setBasketRequest] = useState<BasketRequest>();
  const [total, setTotal] = useState(0);
  const [undependentTotal, setUndependentTotal] = useState(0);
  const [discountErrorMessage, setDiscountErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const referralValue = useSelector((state: any) => state.referral);
  const employeeCardValue = useSelector((state: any) => state.employee);
  const companyTypeValue = useSelector((state: any) => state.companyType);
  const choosePlansSelector = useSelector((state: any) => state.choosePlans);
  const companyDetailsSelector = useSelector((state: any) => state.companyDetails);
  const subsidiaryListSelector = useSelector((state: any) => state.subsidiary);
  const basketSelector = useSelector((state: any) => state.basket);
  let subscriptionValue = 0;
  const classes = useStyles();

  const handleShow = () => {
    setShow((value) => !value);
  };

  const handleClick = () => {
    setDetailsShow((value) => !value);
  };

  useEffect(() => {
    const organisationType = companyTypeValue.selectedValue;
    const otherOrganisationType = companyTypeValue.companyType;

    const choosePlan = choosePlansSelector.selectedValue;

    const subsidiaryList = subsidiaryListSelector.companyList;
    const subsidiaries: Subsidiaries[] =
      subsidiaryListSelector.selected === CardSelected.Yes
        ? subsidiaryList
        : [];
    const noOfSubsidiaries = subsidiaries.length;

    const companyDetailsValue = companyDetailsSelector.companyDetails;

    if (companyDetailsValue !== undefined && companyDetailsValue !== null) {
      const companyDetails: CompanyDetails = JSON.parse(companyDetailsValue);
      if (companyDetails) {
        setBasketRequest({
          scProductVersion: referralValue.scProductVersion ?? '',
          company: {
            noOfEmployees: parseInt(employeeCardValue.selectedValue),
            noOfSubsidiaries,
            organisationType,
            otherOrganisationType,
          },
          productSelection: [
            {
              brand: DefaultBrand,
              memberships: choosePlan ? [choosePlan] : [],
            },
          ],
        });
      }
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (basketRequest) {
      SidePanelProps?.basketCode(basketRequest).then((res) => {
        setLoading(false);
        if (res?.payload?.response?.success) {
          const planDetails = res?.payload?.response?.brands[0].memberships;

          planDetails.map((value, index) => {
            if (index) {
              subscriptionValue = value.qty * value.price.value;
              setSubscriptionCount(subscriptionValue);
              setSubscriberQty(value.qty);
            } else {
              setPlanDetails(value);
            }
            return value;
          });

          const responsePlan = res?.payload?.response?.total || 0;
          const total = responsePlan?.value + responsePlan?.vatAmount || 0;
          setTotal(total);
          setUndependentTotal(total);
          setSelectedPlan(responsePlan);
          setUndependentSelectedPlan(responsePlan);
          dispatch({
            type: 'basketDetails',
            payload: {
              total: responsePlan?.value + responsePlan?.vatAmount || 0,
              discountCode: basketSelector.discountCode ?? undefined,
              basketApiSuccess: basketSelector.basketApiSuccess ?? undefined,
            },
          });

          if (
            !basketSelector.basketApiSuccess &&
            basketSelector.discountCode.length
          ) {
            setDetailsShow(false);
            setDiscountDetails(basketSelector.discountCode);
            setShowDiscount(true);
          }

          if (
            basketSelector.discountCode !== undefined &&
            basketSelector.basketApiSuccess
          ) {
            setDiscountDetails(basketSelector.discountCode);
            setDetailsShow(false);
            setShowDiscount(true);
            setShow(true);
            const discountBasketRequest: BasketRequest = {
              ...basketRequest,
              productSelection: [
                {
                  ...basketRequest?.productSelection?.[0],
                  discountCodes: [basketSelector.discountCode],
                },
              ],
            };

            SidePanelProps?.basketCode(discountBasketRequest).then((res) => {
              setLoading(false);

              if (res?.payload?.response?.success) {
                const discountplanDetails =
                  res?.payload?.response?.brands[0].discounts;
                const total = res?.payload?.response?.total;
                if (discountplanDetails[0].type !== 'INVALID') {
                  setDiscountPlan(discountplanDetails);
                  setDiscountShow(true);
                  setSelectedPlan(total);
                  setDiscountErrorMessage('');
                  setDiscountError(false);

                  const totalCount = total?.value + total?.vatAmount || 0;
                  setTotal(totalCount);
                  dispatch({
                    type: 'basketDetails',
                    payload: {
                      total: totalCount,
                      discountCode: basketSelector.discountCode,
                      basketApiSuccess: true,
                    },
                  });
                } else {
                  dispatch({
                    type: 'basketDetails',
                    payload: {
                      discountCode: basketSelector.discountCode,
                      basketApiSuccess: false,
                    },
                  });
                  setDiscountErrorMessage('Invalid or expired discount code');
                  setDiscountError(true);
                  setDiscountShow(false);
                }
              }
            });
          }
        }
      });
    }
  }, [basketRequest]);
  const apply = () => {
    const discountBasketRequest: BasketRequest = {
      ...basketRequest,
      productSelection: [
        {
          ...basketRequest?.productSelection?.[0],
          discountCodes: [discountDetails],
        },
      ],
    };

    SidePanelProps?.basketCode(discountBasketRequest).then((res) => {
      setLoading(false);

      if (res?.payload?.response?.success) {
        const discountplanDetails = res?.payload?.response?.brands[0].discounts;
        const total = res?.payload?.response?.total;
        if (discountplanDetails[0].type !== 'INVALID') {
          setDiscountPlan(discountplanDetails);
          setDiscountShow(true);
          setSelectedPlan(total);
          setDiscountErrorMessage('');
          setDiscountError(false);

          const totalCount = total?.value + total?.vatAmount || 0;
          setTotal(totalCount);
          dispatch({
            type: 'basketDetails',
            payload: {
              total: totalCount,
              discountCode: discountDetails,
              basketApiSuccess: true,
            },
          });
        } else {
          dispatch({
            type: 'basketDetails',
            payload: {
              discountCode: discountDetails,
              basketApiSuccess: false,
            },
          });
          setDiscountErrorMessage('Invalid or expired discount code');
          setDiscountError(true);
          setDiscountShow(false);
        }
      }
    });
  };
  const handleRemove = () => {
    setDiscountDetails('');
    handleValidate();
  };
  const handleValidate = () => {
    setDiscountShow(false);
    setTotal(undependentTotal);
    setSelectedPlan(undependentselectedPlan);
    setDiscountErrorMessage('');
    setDiscountError(false);
  };
  const handleDiscountCode = (e) => {
    dispatch({
      type: 'basketDetails',
      payload: {
        discountCode: e.target.value,
        basketApiSuccess: false,
      },
    });
    setDiscountDetails(e.target.value);
    handleValidate();
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleShow();
    }
  };
  const handleDiscount = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };
  const handleRemoveCode = (event) => {
    if (event.key === 'Enter') {
      handleRemove();
    }
  };
  return (
    <>
      {loading ? (
        <CircularProgress
          className={classes.circular}
          color="inherit"
          size={50}
        />
      ) : (
        <Box sx={{ minWidth: 266 }}>
          <Card variant="outlined" className={classes.card}>
            <CardContent>
              <Typography variant="inherit" className={classes.subtitle}>
                Order summary:
              </Typography>

              <Grid container>
                <Grid item xs={7}>
                  <Typography variant="inherit" className={classes.title}>
                    {planDetails?.label} Plan
                  </Typography>
                </Grid>
                <Grid item xs={2} sm={3} md={1} />
                <Box
                  onClick={handleShow}
                  onKeyDown={handleKeyDown}
                  tabIndex={-1}
                  title={
                    show === true
                      ? 'Click here to Collpase'
                      : 'Click here to Expand'
                  }
                  className={classes.showDetails1}
                >
                  <Grid item>
                    <Typography
                      className={clsx(
                        classes.expandDetails,
                        classes.iconDetails
                      )}
                    >
                      {show ? (
                        <ExpandLessOutlinedIcon
                          data-testid="minimize"
                          aria-hidden="false"
                        />
                      ) : (
                        <ExpandMoreOutlinedIcon
                          data-testid="expand"
                          aria-hidden="false"
                        />
                      )}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      variant="inherit"
                      className={clsx(
                        classes.detailstitle,
                        classes.iconDetails
                      )}
                    >
                      Details
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
              {show && (
                <div>
                  <div>
                    <Box className={classes.separator} />
                  </div>
                  <Grid container>
                    <Grid
                      item
                      xs={9}
                      className={clsx(classes.spacingDetails, classes.title)}
                    >
                      <Typography>{planDetails?.label} Plan:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        variant="inherit"
                        data-testid="planValue"
                        className={clsx(
                          classes.subtitle,
                          classes.showDetails,
                          classes.spacingDetails
                        )}
                      >
                        £{planDetails?.price?.value}
                      </Typography>
                    </Grid>

                    {discountShow && (
                      <Grid
                        container
                        className={clsx(
                          classes.discountContainer,
                          classes.spacingDetails
                        )}
                      >
                        <Grid item xs={9}>
                          <Typography>Discount applied:</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="inherit"
                            data-testid="discountValue"
                            className={clsx(
                              classes.subtitle,
                              classes.showDetails
                            )}
                          >
                            -£{discountPlan?.[0].price?.value}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                    {subscriptionCount > 0 && (
                      <Grid container>
                        <Grid item xs={9}>
                          <Typography>Subsidiaries:</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="inherit"
                            data-testid="subsidiaryValue"
                            className={clsx(
                              classes.subtitle,
                              classes.showDetails
                            )}
                          >
                            £{subscriptionCount}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            data-testid="subtextValue"
                            className={clsx(
                              classes.spacingDetails,
                              classes.subText
                            )}
                          >
                            {subscriberQty}x £329.00 each
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                    <Grid item xs={9} className={classes.spacingDetails}>
                      <Typography>Sub Total:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        data-testid="subtotalValue"
                        variant="inherit"
                        className={clsx(classes.subtitle, classes.showDetails)}
                      >
                        £{selectedPlan?.value}
                      </Typography>
                    </Grid>

                    <Grid item xs={9} className={classes.spacingDetails}>
                      <Typography>VAT:</Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography
                        variant="inherit"
                        data-testid="vatValue"
                        className={clsx(classes.subtitle, classes.showDetails)}
                      >
                        £{selectedPlan?.vatAmount?.toFixed(2)}
                      </Typography>
                    </Grid>

                    <Grid item xs={9} className={classes.spacingDetails}>
                      <Typography className={classes.totalText}>
                        Total price
                      </Typography>
                    </Grid>

                    <Grid item xs={3} className={classes.totalText}>
                      <Typography
                        data-testid="totalValue"
                        variant="inherit"
                        className={clsx(classes.subtitle, classes.showDetails)}
                      >
                        £{total?.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid className={classes.cardContentContainer}>
                    <Box className={classes.separator1} />
                  </Grid>

                  {detailsShow ? (
                    <div>
                      <Grid>
                        <Typography
                          className={clsx(
                            classes.discountDetails,
                            classes.discountContainer
                          )}
                          title="Click here for a discount code"
                          onClick={handleClick}
                          onKeyDown={handleDiscount}
                          tabIndex={0}
                        >
                          Got a discount code?
                        </Typography>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className={classes.discountAlign}>
                      <Grid
                        xs={8}
                        md={12}
                        lg={12}
                        xl={12}
                        className={classes.displayInput}
                      >
                        {showdiscount ? (
                          <Grid>
                            <Grid className={classes.inputTextAlign}>
                              <Input
                                type="text"
                                state={discountError ? 'error' : 'default'}
                                required={true}
                                value="SSIP Discount"
                                data-testid="discountDetails"
                                placeholder="Paste discount code here"
                                onChange={handleDiscountCode}
                                tabIndex={0}
                                readOnly={true}
                              />
                              <Typography className={classes.errorMessage}>
                                {discountErrorMessage}
                              </Typography>
                              <div className={classes.greentickMarkIcon}>
                                {discountShow ? (
                                  <DoneIcon />
                                ) : loading ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : (
                                  ''
                                )}
                              </div>
                            </Grid>
                          </Grid>
                        ) : (
                          <Grid>
                            <Grid className={classes.inputTextAlign}>
                              <Input
                                type="text"
                                state={discountError ? 'error' : 'default'}
                                required={true}
                                value={discountDetails}
                                data-testid="discountDetails"
                                placeholder="Paste discount code here"
                                onChange={handleDiscountCode}
                                tabIndex={0}
                              />
                              <Typography className={classes.errorMessage}>
                                {discountErrorMessage}
                              </Typography>
                              <div className={classes.greentickMarkIcon}>
                                {discountShow ? (
                                  <DoneIcon />
                                ) : loading ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : (
                                  ''
                                )}
                              </div>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                      {showdiscount ? (
                        <Grid></Grid>
                      ) : (
                        <Grid>
                          <Grid
                            item
                            xs={4}
                            className={classes.applyButtonAlign}
                          >
                            <Button
                              className={classes.applyButton}
                              disabled={
                                !discountDetails ||
                                discountShow ||
                                discountErrorMessage !== ''
                              }
                              onClick={apply}
                            >
                              Apply
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                      {showdiscount ? (
                        <Grid></Grid>
                      ) : (
                        <Grid>
                          {(discountShow || discountError) && (
                            <Grid item xs={6}>
                              <Typography
                                className={classes.removeCode}
                                onClick={handleRemove}
                                title="Remove code"
                                onKeyDown={handleRemoveCode}
                                tabIndex={0}
                              >
                                Remove code
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                      )}
                    </Grid>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}
