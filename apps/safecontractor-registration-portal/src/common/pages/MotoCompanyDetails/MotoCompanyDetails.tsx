import React, { useEffect, useState } from 'react';
import MotoAboutSection from '../../components/MotoAboutSection';
import { Grid, Checkbox, CircularProgress, Divider, IconButton, ListItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import MotoExpandableCard from '../../components/MotoExpandableCard';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { getRegionNameFromCode } from '../../../lib/utils/localeUtils';
import MotoFooterSection from '../../components/MotoFooterSection';
import {
  Page,
  StyleVariables,
  RegularIcon,
  Input,
  Select,
  Text,
} from '@alcumus/components';
import clsx from 'clsx';
import Stepper from '../../components/Stepper';
import MotoMobileFooterSection from '../../components/MotoMobileFooterSection';

import {
  CountryCode,
  CountryDataSets,
  County,
  allowedListRegistration,
  allowedListCharity,
  allowedListRegistrationNumber,
  registerRegex,
  ukPhoneRegex,
} from '../../constants';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { postcodeValidator } from 'postcode-validator';
import { Address, CompanyDetails } from '../../types';
import Autocomplete from '@mui/material/Autocomplete';

interface FormErrors {
  name: boolean;
  registrationYear: boolean;
  registrationNumber: boolean;
  charityNumber: boolean;
  charityYear: boolean;
  website: boolean;
  addressLookup: boolean;
  addressFields?: boolean;
  address?: AddressFormErrors;
  sendInviteWhenSaving?: boolean;
  billingAddress?: AddressFormErrors;
}
interface AddressFormErrors {
  addressLine1: boolean;
  addressLine2?: boolean;
  town: boolean;
  county: boolean;
  postCode: boolean;
  landline?: boolean;
  mobileNumber?: boolean;
}

interface CompanyDetailProps {
  currentAddress?: Address;
  findAddressLookup: Function;
  postAddressLookup: Function;
  messageFromApi?: string;
  isFetching: boolean;
  error?: string;
}

const STEPPER_DOTS = 4;
const useStyles = makeStyles((theme) => ({
  title: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    marginTop: '16px',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: '12px',
    marginBottom: '16px',
    textAlign: 'center',
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.small,
    lineHeight: StyleVariables.fonts.lineHeight.h6,
  },
  formGroup: {
    marginBottom: '1rem',
    textAlign: 'left',
  },

  companyDetailsContainer: {
    justifyContent: 'center',
    display: 'inline-flex',
    gap: '1em',
  },
  findAddress: {
    marginTop: '10px',
    borderRadius: '8em',
    paddingTop: '8px',
    paddingBottom: '8px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
      paddingRight: 0,
      height: '40px',
    },
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  formContainer: {
    textAlign: 'left',
    alignContent: 'center',
  },
  check: {
    height: '18px',
    marginTop: '8px',
  },
  blueCheck: {
    color: `${StyleVariables.colors.base.interactive} !important`,
    justifyContent: 'start',
  },
  addressLink: {
    color: StyleVariables.colors.base.primary,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    marginBottom: '1em',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  checkboxText: {
    fontSize: StyleVariables.fonts.size.smaller,
    marginTop: '0.6rem',
    marginLeft: '1rem',
  },

  scrollablediv: {
    height: 'calc(100vh - 80px)',
    overflow: 'auto',
    scrollbarWidth: 'none',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 120px)',
    },
  },
  cssPage: {
    padding: 0,
    margin: 0,
  },
  checkBoxContainer: {
    marginLeft: '-0.75rem',
    maxWidth: '2rem',
    marginTop: '6px',
  },
  divider: {
    marginLeft: '16px',
  },

  boxContainer: {
    [theme.breakpoints.down('lg')]: {
      marginLeft: '7.25rem',
      marginRight: '7.25rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '1rem',
      marginRight: '1rem',
    },
    [theme.breakpoints.up('xl')]: {
      marginRight: '10rem',
    },
  },
  cardContainer: {
    [theme.breakpoints.down('lg')]: {
      display: 'none',
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
  errorMessage: {
    color: StyleVariables.colors.text.critical,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.xs,
    lineHeight: StyleVariables.fonts.lineHeight.small,
  },
  charityContainer: {
    paddingTop: '1rem',
  },
  hiddenContainer: {
    display: 'none',
  },
  BillingAlign: {
    marginTop: '12px',
  },
}));
export default function MotoCompanyDetails(
  companyDetailProps: CompanyDetailProps
) {
  const classes = useStyles();
  const [companyDetailsForm, setCompanyDetailsForm] =
    useState<CompanyDetails>();
  const [addressLookup, setAddressLookup] = useState('');
  const [billingAddressLookup, setBillingAddressLookup] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const dispatch = useDispatch();
  const companyDetailsSelector = useSelector(
    (state: any) => state.motoCompanyDetails
  );
  const referralValueSelector = useSelector((state: any) => state.motoReferral);
  const [billingAddressSuggestions, setBillingAddressSuggestions] = useState<
    string[]
  >([]);
  const [show, setShow] = useState(true);

  const [loading, setLoading] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [billingOpen, billingSetOpen] = useState(false);
  const [showRegistrationDetails, setShowRegistrationDetails] = useState(false);
  const [showRegistrationNumberDetails, setShowRegistrationNumberDetails] =
    useState(false);
  const [showCharityDetails, setShowCharityDetails] = useState(false);
  const [canSubmitForm, setCanSubmitForm] = useState(false);
  const [sendInviteWhenSaving, setSendInviteWhenSaving] = useState(false);
  const companyTypeValue = useSelector((state: any) => state.motoCompanyType);
  const [registrationError, setRegistrationError] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [landlineError, setLandlineError] = useState(false);
  const [landlineErrorMessage, setLandlineErrorMessage] = useState('');
  const [mobileError, setMobileError] = useState(false);
  const [mobileErrorMessage, setMobileErrorMessage] = useState('');
  const [charityError, setCharityError] = useState(false);
  const [charityMessage, setCharityMessage] = useState('');
  const [charityYearError, setCharityYearError] = useState(false);
  const [charityYearMessage, setCharityYearMessage] = useState('');
  const [registrationYearError, setRegistrationYearError] = useState(false);
  const [registrationYearMessage, setRegistrationYearMessage] = useState('');
  const [contactAddressError, setContactAddressError] = useState(false);
  const [contactAddressErrorMessage, setContactAddressErrorMessage] =
    useState('');
  const [billingAddressError, setBillingAddressError] = useState(false);
  const [billingAddressErrorMessage, setBillingAddressErrorMessage] =
    useState('');

  const footerProps = {
    register: () => undefined,
    footerSectionProps: {
      to: 'moto/paymentDetails',
      from: 'moto/choosePlan',
      text: 'Go to payment',
      mobileText: 'Go to payment',
      prevText: 'Previous',
      page: 'motoCompanyDetails',
      impaired: canSubmitForm,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const billingAddressReset = () => {
    setCompanyDetailsForm({
      ...companyDetailsForm,
      billingAddress: {
        ...companyDetailsForm?.billingAddress,
        addressLine1: '',
        addressLine2: '',
        county: County.United_Kingdom,
        town: '',
        postCode: '',
      },
    });
  };

  const countryOptions = [
    County.United_Kingdom,
    County.Ierland,
    County.France,
  ].map((code) => ({
    id: code,
    name: getRegionNameFromCode(code),
  }));

  const handleChangeAddress = async (e, value) => {
    setLoading(false);

    const addressArray = value.split(',').map((v) => v.trim());
    const splitAddressArray = value
      .split(',')
      .slice(0, addressArray.length - 2);
    const addressText = splitAddressArray.join(',');
    if (postcodeValidator(addressArray[addressArray.length - 1], 'GB')) {
      setCompanyDetailsForm({
        ...companyDetailsForm,
        address: {
          ...companyDetailsForm?.address,
          addressLine1: addressText,
          county: County.United_Kingdom,
          town: addressArray[addressArray.length - 2],
          postCode: addressArray[addressArray.length - 1],
        },
      });
    } else {
      setCompanyDetailsForm({
        ...companyDetailsForm,
        address: {
          ...companyDetailsForm?.address,
          addressLine1: '',
          county: County.United_Kingdom,
          town: '',
          postCode: '',
        },
      });
    }
    await setAddressLookup(value);
  };

  const handleChangeBillingAddress = async (e, value) => {
    setBillingLoading(false);
    const addressArray = value.split(',').map((v) => v.trim());
    const splitAddressArray = value
      .split(',')
      .slice(0, addressArray.length - 2);
    const addressText = splitAddressArray.join(',');
    if (postcodeValidator(addressArray[addressArray.length - 1], 'GB')) {
      setCompanyDetailsForm({
        ...companyDetailsForm,
        billingAddress: {
          ...companyDetailsForm?.billingAddress,
          addressLine1: addressText,
          county: County.United_Kingdom,
          town: addressArray[addressArray.length - 2],
          postCode: addressArray[addressArray.length - 1],
        },
      });
    } else {
      setCompanyDetailsForm({
        ...companyDetailsForm,
        billingAddress: {
          ...companyDetailsForm?.billingAddress,
          addressLine1: '',
          county: County.United_Kingdom,
          town: '',
          postCode: '',
        },
      });
    }
    await setBillingAddressLookup(value);
  };
  const handleClick = (e) => {
    setCompanyDetailsForm({
      ...companyDetailsForm,
      registrationYear: e.target.valueAsNumber,
    });
  };

  const handleIncorporationRegistrationYear = (e) => {
    setCompanyDetailsForm({
      ...companyDetailsForm,
      charityYear: e.target.valueAsNumber,
    });
  };

  const validate = (regNumber) => {
    if (
      (!registerRegex.test(regNumber) && regNumber !== '') ||
      (regNumber.length !== 8 && regNumber.length !== 0)
    ) {
      const newArr = 'Format must be XX123456 or 12345678';
      setRegistrationMessage(newArr);
      setRegistrationError(true);
    } else {
      setRegistrationMessage('');
      setRegistrationError(false);
    }
  };

  const validateLandlinePhone = (phone) => {
    if (!ukPhoneRegex.test(phone) && phone.length !== 0) {
      const newArr = 'Please enter a valid UK mobile number';
      setLandlineErrorMessage(newArr);
      setLandlineError(true);
    } else {
      setLandlineErrorMessage('');
      setLandlineError(false);
    }
  };

  const validateMobilePhone = (phone) => {
    if (!ukPhoneRegex.test(phone) && phone.length !== 0) {
      const newArr = 'Please enter a valid UK mobile number';
      setMobileErrorMessage(newArr);
      setMobileError(true);
    } else {
      setMobileErrorMessage('');
      setMobileError(false);
    }
  };

  const validateCharityNumber = (charityNumber) => {
    if (
      (!registerRegex.test(charityNumber) && charityNumber !== '') ||
      (charityNumber.length !== 8 && charityNumber.length !== 0)
    ) {
      const newArr = 'Please enter a valid registered charity number';
      setCharityMessage(newArr);
      setCharityError(true);
    } else {
      setCharityMessage('');
      setCharityError(false);
    }
  };

  const validateCharityYear = (year) => {
    if (year >= 1000 && year <= new Date().getFullYear()) {
      setCharityYearMessage('');
      setCharityYearError(false);
    } else {
      setCharityYearMessage('Please enter a valid four-digit year');
      setCharityYearError(true);
    }
  };

  const validateRegistrationYear = (year) => {
    const currentYear = new Date().getFullYear();
    if (year >= 1000 && year <= currentYear) {
      setRegistrationYearMessage('');
      setRegistrationYearError(false);
    } else {
      setRegistrationYearMessage('Please enter a valid four-digit year');
      setRegistrationYearError(true);
    }
  };

  const validateAddressPostCode = (postCode) => {
    if (postcodeValidator(postCode, 'GB')) {
      setContactAddressError(false);
      setContactAddressErrorMessage('');
    } else {
      setContactAddressError(true);
      setContactAddressErrorMessage('Please enter a valid UK post code');
    }
  };

  const validateBillingAddressPostCode = (postCode) => {
    if (postcodeValidator(postCode, 'GB')) {
      setBillingAddressError(false);
      setBillingAddressErrorMessage('');
    } else {
      setBillingAddressError(true);
      setBillingAddressErrorMessage('Please enter a valid UK post code');
    }
  };

  const validateForm = () => {
    const billingAddressErrors: AddressFormErrors = {
      addressLine1: !companyDetailsForm?.billingAddress?.addressLine1,
      county: !companyDetailsForm?.billingAddress?.county,
      postCode: !companyDetailsForm?.billingAddress?.postCode,
      town: !companyDetailsForm?.billingAddress?.town,
    };

    const addressErrors: AddressFormErrors = {
      addressLine1: !companyDetailsForm?.address?.addressLine1,
      county: !companyDetailsForm?.address?.county,
      postCode: !companyDetailsForm?.address?.postCode,
      town: !companyDetailsForm?.address?.town,
      landline: !companyDetailsForm?.contactPerson?.telephoneNumber,
      mobileNumber: !companyDetailsForm?.contactPerson?.mobileNumber,
    };

    const companyBasicDetailsErrors: FormErrors = {
      name: !companyDetailsForm?.name,
      registrationYear: showRegistrationDetails
        ? !companyDetailsForm?.registrationYear
        : false,
      registrationNumber: showRegistrationNumberDetails
        ? !companyDetailsForm?.registrationNumber
        : false,
      charityYear: showCharityDetails
        ? !companyDetailsForm?.charityYear
        : false,
      charityNumber: showCharityDetails
        ? !companyDetailsForm?.charityNumber
        : false,
      website: !companyDetailsForm?.website,
      addressLookup: !companyDetailsForm?.address,
      addressFields: show
        ? Object.values(addressErrors).filter(Boolean).length > 0
        : false,
      sendInviteWhenSaving: sendInviteWhenSaving
        ? Object.values(billingAddressErrors).filter(Boolean).length > 0
        : false,
    };
    if (
      Object.values(companyBasicDetailsErrors).filter(Boolean).length ||
      registrationYearError ||
      charityError ||
      charityYearError ||
      registrationError ||
      mobileError ||
      landlineError ||
      contactAddressError ||
      (billingAddressError && sendInviteWhenSaving)
    ) {
      setCanSubmitForm(false);
    } else {
      setCanSubmitForm(true);
    }
  };

  useEffect(() => {
    if (allowedListRegistration.includes(companyTypeValue.selectedValue)) {
      setShowRegistrationDetails(true);
    }
    if (
      allowedListRegistrationNumber.includes(companyTypeValue.selectedValue)
    ) {
      setShowRegistrationNumberDetails(true);
    }
    if (allowedListCharity.includes(companyTypeValue.selectedValue)) {
      setShowCharityDetails(true);
    }
    const companyDetailsValue =
      companyDetailsSelector.companyDetails ??
      referralValueSelector.companyDetails_value;
    if (companyDetailsValue?.length) {
      const companyDetails: CompanyDetails = JSON.parse(companyDetailsValue);
      if (
        !allowedListRegistrationNumber.includes(companyTypeValue.selectedValue)
      ) {
        delete companyDetails?.registrationNumber;
      }
      if (!allowedListCharity.includes(companyTypeValue.selectedValue)) {
        delete companyDetails?.charityNumber;
        delete companyDetails?.charityYear;
      }
      if (companyTypeValue.selectedValue === 'OTHER') {
        delete companyDetails?.registrationNumber;
        delete companyDetails?.registrationYear;
        delete companyDetails?.charityNumber;
        delete companyDetails?.charityYear;
      }
      setCompanyDetailsForm(companyDetails);
      if (companyDetails?.address?.addressLine1) {
        setShow(true);
        setAddressLookup(
          (companyDetails?.address?.addressLine1 ?? '') +
            (companyDetails?.address?.addressLine2 ?? '') +
            (companyDetails?.address?.addressLine3 ?? '') +
            (companyDetails?.address?.town ?? '') +
            ' ' +
            (companyDetails?.address?.postCode ?? '') +
            ' ' +
            County.United_Kingdom
        );
      }
      if (companyDetails?.billingAddress?.addressLine1) {
        setSendInviteWhenSaving(true);
      }
      validateForm();
    }
  }, []);

  const onChangeHandler = (addressLookup) => {
    setLoading(true);
    const request = {
      country_iso: CountryCode,
      components: {
        unspecified: [addressLookup],
      },
      datasets: [CountryDataSets],
    };

    companyDetailProps.postAddressLookup(request).then((res) => {
      if (res?.payload?.response?.result?.more_results_available === true) {
        const responsePlan = res?.payload?.response?.result?.suggestions;
        setAddressSuggestions([]);
        for (let i = 0; i < responsePlan.length; i++) {
          setAddressSuggestions((current) => [
            ...current,
            responsePlan[i].text,
          ]);
        }
      }
    });
    setShow(true);
  };

  const onChangeHandlerBilling = (billingAddressLookup) => {
    setBillingLoading(true);
    const request = {
      country_iso: CountryCode,
      components: {
        unspecified: [billingAddressLookup],
      },
      datasets: [CountryDataSets],
    };
    companyDetailProps.postAddressLookup(request).then((res) => {
      if (res?.payload?.response?.result?.more_results_available === true) {
        const responsePlan = res?.payload?.response?.result?.suggestions;
        setBillingAddressSuggestions([]);
        for (let i = 0; i < responsePlan.length; i++) {
          setBillingAddressSuggestions((current) => [
            ...current,
            responsePlan[i].text,
          ]);
        }
      }
    });
    setShow(true);
  };

  useEffect(() => {
    validateForm();
    if (companyDetailsForm) {
      dispatch({
        type: footerProps.footerSectionProps.page,
        payload: {
          companyDetails: JSON.stringify(companyDetailsForm),
        },
      });
    }
  }, [companyDetailsForm, addressLookup, sendInviteWhenSaving]);

  return (
    <Page className={classes.cssPage}>
      <Grid item xs={12} className={classes.scrollablediv}>
        <MotoAboutSection count={STEPPER_DOTS} />
        <Grid className={classes.stepper}>
          <Stepper count={STEPPER_DOTS}></Stepper>
        </Grid>
        <Grid item md={12} className={classes.boxContainer}>
          <Typography className={classes.title}>Company details</Typography>
          <Typography className={classes.subtitle}>
            Your details will only be used to contact you during your
            accreditation.
          </Typography>

          <Grid container>
            <Grid item xs={2} xl={2}></Grid>

            <Grid
              item
              lg={5}
              xl={5}
              className={classes.companyDetailsContainer}
            >
              <form
                method="post"
                className={classes.formContainer}
                onChange={handleSubmit}
              >
                <Grid container>
                  {!(
                    showRegistrationNumberDetails || showRegistrationDetails
                  ) || showRegistrationNumberDetails ? (
                    <Grid item xs={12}>
                      <FormControl variant="standard" fullWidth className={classes.formGroup}>
                        <Input
                          type="text"
                          label="Company name"
                          placeholder="Company name"
                          required={true}
                          value={companyDetailsForm?.name}
                          data-testid="companyNameInput"
                          onChange={(e) =>
                            setCompanyDetailsForm({
                              ...companyDetailsForm,
                              name: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Grid>
                  ) : (
                    <Grid container>
                      <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth className={classes.formGroup}>
                          <Input
                            type="text"
                            label="Company name"
                            placeholder="Company name"
                            required={showRegistrationDetails}
                            value={companyDetailsForm?.name}
                            data-testid="companyNameInput"
                            onChange={(e) =>
                              setCompanyDetailsForm({
                                ...companyDetailsForm,
                                name: e.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth className={classes.formGroup}>
                          <Input
                            type="number"
                            label="Company registration year"
                            placeholder="YYYY"
                            required={showRegistrationDetails}
                            maxLength={4}
                            value={companyDetailsForm?.registrationYear}
                            data-testid="registrationYearInput"
                            onChange={(e) => {
                              handleClick(e);
                              validateRegistrationYear(e.target.valueAsNumber);
                            }}
                          />
                          <React.Fragment>
                            <Typography
                              data-testid={`registrationYearError`}
                              className={classes.errorMessage}
                            >
                              {registrationYearMessage}
                            </Typography>
                          </React.Fragment>
                        </FormControl>
                      </Grid>
                    </Grid>
                  )}
                  {showRegistrationNumberDetails && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControl variant="standard" fullWidth className={classes.formGroup}>
                          <Input
                            type="text"
                            label="Company registration number"
                            placeholder="e.g. XX123456 or 12345678"
                            required={showRegistrationNumberDetails}
                            value={companyDetailsForm?.registrationNumber}
                            data-testid="companyRegistrationNumberInput"
                            onChange={(e) => {
                              setCompanyDetailsForm({
                                ...companyDetailsForm,
                                registrationNumber: e.target.value,
                              });
                              validate(e.target.value);
                            }}
                          />
                          <React.Fragment>
                            <Typography
                              data-testid={`companyNameError`}
                              className={classes.errorMessage}
                            >
                              {registrationMessage}
                            </Typography>
                          </React.Fragment>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl variant="standard" fullWidth className={classes.formGroup}>
                          <Input
                            type="number"
                            label="Company registration year"
                            placeholder="YYYY"
                            required={showRegistrationDetails}
                            maxLength={4}
                            value={companyDetailsForm?.registrationYear}
                            data-testid="registrationYearInput"
                            onChange={(e) => {
                              handleClick(e);
                              validateRegistrationYear(e.target.valueAsNumber);
                            }}
                          />
                          <React.Fragment>
                            <Typography
                              data-testid={`registrationYearError`}
                              className={classes.errorMessage}
                            >
                              {registrationYearMessage}
                            </Typography>
                          </React.Fragment>
                        </FormControl>
                      </Grid>
                    </Grid>
                  )}
                  {showCharityDetails && (
                    <Grid
                      container
                      spacing={2}
                      className={classes.charityContainer}
                    >
                      <Grid item xs={12} sm={6}>
                        <FormControl variant="standard" fullWidth className={classes.formGroup}>
                          <Input
                            type="text"
                            label="Charity Number"
                            placeholder="e.g. 12345678"
                            required={showCharityDetails}
                            value={companyDetailsForm?.charityNumber}
                            data-testid="companyCharityNumberInput"
                            onChange={(e) => {
                              setCompanyDetailsForm({
                                ...companyDetailsForm,
                                charityNumber: e.target.value,
                              });
                              validateCharityNumber(e.target.value);
                            }}
                          />
                          <React.Fragment>
                            <Typography
                              data-testid={`charityNumberError`}
                              className={classes.errorMessage}
                            >
                              {charityMessage}
                            </Typography>
                          </React.Fragment>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl variant="standard" fullWidth className={classes.formGroup}>
                          <Input
                            type="number"
                            label="Charity incorporation/reg year"
                            placeholder="YYYY"
                            required={showCharityDetails}
                            maxLength={4}
                            value={companyDetailsForm?.charityYear}
                            data-testid="charityIncorporationYearInput"
                            onChange={(e) => {
                              handleIncorporationRegistrationYear(e);
                              validateCharityYear(e.target.valueAsNumber);
                            }}
                          />
                          <React.Fragment>
                            <Typography
                              data-testid={`charityYearError`}
                              className={classes.errorMessage}
                            >
                              {charityYearMessage}
                            </Typography>
                          </React.Fragment>
                        </FormControl>
                      </Grid>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <FormControl variant="standard" fullWidth className={classes.formGroup}>
                      <Input
                        type="text"
                        label="Website"
                        id="website"
                        name="website"
                        placeholder="Website address"
                        required={true}
                        value={companyDetailsForm?.website}
                        data-testid="websiteInput"
                        onChange={(e) =>
                          setCompanyDetailsForm({
                            ...companyDetailsForm,
                            website: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      variant="standard"
                      fullWidth
                      className={clsx(
                        classes.formGroup,
                        classes.hiddenContainer
                      )}>
                      <Autocomplete
                        id="addressLookupInput"
                        options={addressSuggestions}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        loading={loading}
                        disableClearable={true}
                        value={addressLookup}
                        isOptionEqualToValue={(option, value) => option === value}
                        onChange={handleChangeAddress}
                        filterOptions={(options) => options}
                        ListboxProps={{
                          onScroll: () => {
                            <div>
                              {addressSuggestions.map((item) => {
                                return <option key={item}>{item}</option>;
                              })}
                            </div>;
                          },
                        }}
                        renderOption={(option, { selected }) => (
                          <ListItem
                            component="div"
                            key={option}
                            dense
                            className={classes.listItem}
                            onChange={() => {
                              setLoading(false);
                            }}
                          >
                            {option}

                            {selected && (
                              <RegularIcon
                                icon="check"
                                style={{
                                  color: StyleVariables.colors.text.success,
                                }}
                              />
                            )}
                          </ListItem>
                        )}
                        renderInput={(params) => (
                          <div ref={params.InputProps.ref}>
                            <Input
                              {...params.inputProps}
                              type="text"
                              label="Address"
                              placeholder="Start typing an address..."
                              required={false}
                              value={addressLookup}
                              data-testid="addressLookupInput"
                              list="datalist"
                              onChange={(e) => {
                                onChangeHandler(e.target.value);
                              }}
                              adornment={
                                <div>
                                  {loading ? (
                                    <CircularProgress
                                      color="inherit"
                                      size={20}
                                    />
                                  ) : (
                                    <IconButton
                                      size="small"
                                      onClick={() => setOpen(!open)}
                                    >
                                      <ExpandMoreOutlinedIcon />
                                    </IconButton>
                                  )}
                                </div>
                              }
                            />
                            <Divider
                              className={classes.divider}
                              orientation="vertical"
                              flexItem
                            />
                          </div>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  {show && (
                    <Grid container>
                      <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth className={classes.formGroup}>
                          <Input
                            type="text"
                            label="Address line 1"
                            required={true}
                            value={companyDetailsForm?.address?.addressLine1}
                            data-testid="addressLine1"
                            onChange={(e) =>
                              setCompanyDetailsForm({
                                ...companyDetailsForm,
                                address: {
                                  ...companyDetailsForm?.address,
                                  addressLine1: e.target.value,
                                },
                              })
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth className={classes.formGroup}>
                          <Input
                            type="text"
                            label="Address line 2"
                            required={false}
                            value={companyDetailsForm?.address?.addressLine2}
                            data-testid="addressLine2"
                            onChange={(e) =>
                              setCompanyDetailsForm({
                                ...companyDetailsForm,
                                address: {
                                  ...companyDetailsForm?.address,
                                  addressLine2: e.target.value,
                                },
                              })
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth className={classes.formGroup}>
                          <Input
                            type="text"
                            label="City"
                            required={true}
                            value={companyDetailsForm?.address?.town}
                            data-testid="city"
                            onChange={(e) =>
                              setCompanyDetailsForm({
                                ...companyDetailsForm,
                                address: {
                                  ...companyDetailsForm?.address,
                                  town: e.target.value,
                                },
                              })
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth className={classes.formGroup}>
                          <Select
                            items={countryOptions}
                            label="Country"
                            required={true}
                            inputProps={{
                              'data-testid': 'countyInput',
                            }}
                            value={
                              companyDetailsForm?.address?.county ??
                              County.United_Kingdom
                            }
                            onChange={(e) =>
                              setCompanyDetailsForm({
                                ...companyDetailsForm,
                                address: {
                                  ...companyDetailsForm?.address,
                                  county: e.target.value as string,
                                },
                              })
                            }
                          ></Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth className={classes.formGroup}>
                          <Input
                            type="text"
                            label="Postcode"
                            required={true}
                            value={companyDetailsForm?.address?.postCode}
                            data-testid="postCode"
                            onChange={(e) => {
                              setCompanyDetailsForm({
                                ...companyDetailsForm,
                                address: {
                                  ...companyDetailsForm?.address,
                                  postCode: e.target.value,
                                },
                              });
                              validateAddressPostCode(e.target.value);
                            }}
                          />
                          <React.Fragment>
                            <Typography
                              data-testid={`addressPostcodeError`}
                              className={classes.errorMessage}
                            >
                              {contactAddressErrorMessage}
                            </Typography>
                          </React.Fragment>
                        </FormControl>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <FormControl variant="standard" fullWidth className={classes.formGroup}>
                            <Input
                              type="text"
                              label="Landline number"
                              required={true}
                              value={
                                companyDetailsForm?.contactPerson
                                  ?.telephoneNumber
                              }
                              data-testid="landLineInput"
                              onChange={(e) => {
                                setCompanyDetailsForm({
                                  ...companyDetailsForm,
                                  contactPerson: {
                                    ...companyDetailsForm?.contactPerson,
                                    telephoneNumber: e.target.value,
                                  },
                                });
                                validateLandlinePhone(e.target.value);
                              }}
                            />
                            <React.Fragment>
                              <Typography
                                data-testid={`landlinePhoneError`}
                                className={classes.errorMessage}
                              >
                                {landlineErrorMessage}
                              </Typography>
                            </React.Fragment>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl variant="standard" fullWidth className={classes.formGroup}>
                            <Input
                              type="text"
                              label="Mobile number"
                              required={true}
                              value={
                                companyDetailsForm?.contactPerson?.mobileNumber
                              }
                              data-testid="mobilenumberInput"
                              onChange={(e) => {
                                setCompanyDetailsForm({
                                  ...companyDetailsForm,
                                  contactPerson: {
                                    ...companyDetailsForm?.contactPerson,
                                    mobileNumber: e.target.value,
                                  },
                                });
                                validateMobilePhone(e.target.value);
                              }}
                            />
                            <React.Fragment>
                              <Typography
                                data-testid={`mobilePhoneError`}
                                className={classes.errorMessage}
                              >
                                {mobileErrorMessage}
                              </Typography>
                            </React.Fragment>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid
                          item
                          xs={1}
                          className={clsx(classes.checkBoxContainer)}
                        >
                          <FormControl variant="standard" fullWidth className={classes.formGroup}>
                            <Checkbox
                              inputProps={{
                                'aria-label':
                                  'Select here if your billing address is different from your address added above',
                                // @ts-ignore
                                'data-testid': 'isBillingAddress',
                              }}
                              className={clsx(classes.check, classes.blueCheck)}
                              checked={sendInviteWhenSaving}
                              title="Select here if your billing address is different from your address added above"
                              required={true}
                              onChange={(e) => {
                                setSendInviteWhenSaving(e.target.checked);
                                billingAddressReset();
                              }}
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={11}>
                          <Text className={classes.checkboxText}>
                            Select here if your billing address is different
                            from your address added above
                          </Text>
                        </Grid>
                      </Grid>
                      {sendInviteWhenSaving && (
                        <Grid container>
                          <Grid item xs={12}>
                            <FormControl
                              variant="standard"
                              fullWidth
                              className={clsx(
                                classes.formGroup,
                                classes.hiddenContainer
                              )}>
                              <Autocomplete
                                id="billingAddressLookupInput"
                                options={billingAddressSuggestions}
                                open={billingOpen}
                                onOpen={() => billingSetOpen(true)}
                                onClose={() => billingSetOpen(false)}
                                loading={billingLoading}
                                disableClearable={true}
                                value={billingAddressLookup}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                                onChange={handleChangeBillingAddress}
                                filterOptions={(options) => options}
                                ListboxProps={{
                                  onScroll: () => {
                                    <div>
                                      {billingAddressSuggestions.map((item) => (
                                        <option key={item}>{item}</option>
                                      ))}
                                    </div>;
                                  },
                                }}
                                renderOption={(option, { selected }) => (
                                  <ListItem
                                    component="div"
                                    key={option}
                                    dense
                                    className={classes.listItem}
                                    onChange={() => {
                                      setBillingLoading(false);
                                    }}
                                  >
                                    {option}

                                    {selected && (
                                      <RegularIcon
                                        icon="check"
                                        style={{
                                          color:
                                            StyleVariables.colors.text.success,
                                        }}
                                      />
                                    )}
                                  </ListItem>
                                )}
                                renderInput={(params) => (
                                  <div ref={params.InputProps.ref}>
                                    <Input
                                      {...params.inputProps}
                                      type="text"
                                      label="Billing Address"
                                      placeholder="Start typing an address..."
                                      required={false}
                                      value={billingAddressLookup}
                                      data-testid="addressLookupbilling"
                                      list="billingdatalist"
                                      onChange={(e) => {
                                        onChangeHandlerBilling(e.target.value);
                                      }}
                                      adornment={
                                        <div>
                                          {billingLoading ? (
                                            <CircularProgress
                                              color="inherit"
                                              size={20}
                                            />
                                          ) : (
                                            <IconButton
                                              size="small"
                                              onClick={() =>
                                                billingSetOpen(!billingOpen)
                                              }
                                            >
                                              <ExpandMoreOutlinedIcon />
                                            </IconButton>
                                          )}
                                        </div>
                                      }
                                    />
                                    <Divider
                                      className={classes.divider}
                                      orientation="vertical"
                                      flexItem
                                    />
                                  </div>
                                )}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl
                              variant="standard"
                              fullWidth
                              className={clsx(
                                classes.formGroup,
                                classes.BillingAlign
                              )}>
                              <Input
                                type="text"
                                label="Billing address line 1"
                                required={true}
                                value={
                                  companyDetailsForm?.billingAddress
                                    ?.addressLine1
                                }
                                data-testid="billingAddress1"
                                onChange={(e) =>
                                  setCompanyDetailsForm({
                                    ...companyDetailsForm,
                                    billingAddress: {
                                      ...companyDetailsForm?.billingAddress,
                                      addressLine1: e.target.value,
                                    },
                                  })
                                }
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth className={classes.formGroup}>
                              <Input
                                type="text"
                                label="Billing address line 2"
                                required={false}
                                value={
                                  companyDetailsForm?.billingAddress
                                    ?.addressLine2
                                }
                                data-testid="billingAddress2"
                                onChange={(e) =>
                                  setCompanyDetailsForm({
                                    ...companyDetailsForm,
                                    billingAddress: {
                                      ...companyDetailsForm?.billingAddress,
                                      addressLine2: e.target.value,
                                    },
                                  })
                                }
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth className={classes.formGroup}>
                              <Input
                                type="text"
                                label="City"
                                required={true}
                                value={companyDetailsForm?.billingAddress?.town}
                                data-testid="billingCity"
                                onChange={(e) =>
                                  setCompanyDetailsForm({
                                    ...companyDetailsForm,
                                    billingAddress: {
                                      ...companyDetailsForm?.billingAddress,
                                      town: e.target.value,
                                    },
                                  })
                                }
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth className={classes.formGroup}>
                              <Select
                                items={countryOptions}
                                label="County"
                                required={true}
                                value={
                                  companyDetailsForm?.billingAddress?.county
                                }
                                onChange={(e) =>
                                  setCompanyDetailsForm({
                                    ...companyDetailsForm,
                                    billingAddress: {
                                      ...companyDetailsForm?.billingAddress,
                                      county: e.target.value as string,
                                    },
                                  })
                                }
                              ></Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth className={classes.formGroup}>
                              <Input
                                type="text"
                                label="Postcode"
                                required={true}
                                value={
                                  companyDetailsForm?.billingAddress?.postCode
                                }
                                data-testid="billingPostCode"
                                onChange={(e) => {
                                  setCompanyDetailsForm({
                                    ...companyDetailsForm,
                                    billingAddress: {
                                      ...companyDetailsForm?.billingAddress,
                                      postCode: e.target.value,
                                    },
                                  });
                                  validateBillingAddressPostCode(
                                    e.target.value
                                  );
                                }}
                              />
                              <React.Fragment>
                                <Typography
                                  data-testid={`billingAddressPostcodeError`}
                                  className={classes.errorMessage}
                                >
                                  {billingAddressErrorMessage}
                                </Typography>
                              </React.Fragment>
                            </FormControl>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  )}
                </Grid>
              </form>
            </Grid>
            <Grid item xs={1} xl={1} />
            <Grid item xs={2} className={classes.cardContainer}>
              <MotoExpandableCard />
            </Grid>
          </Grid>
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
