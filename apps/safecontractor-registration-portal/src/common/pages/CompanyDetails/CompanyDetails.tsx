import React, { useEffect, useState } from 'react';
import AboutSection from '../../components/AboutSection';
import { Grid, CircularProgress, Divider, IconButton, ListItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import ExpandableCard from '../../components/ExpandableCard';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { getRegionNameFromCode } from '../../../lib/utils/localeUtils';
import FooterSection from '../../components/FooterSection';
import { createTheme} from '@mui/material';
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
import MobileFooterSection from '../../components/MobileFooterSection';
import serialize from 'serialize-javascript';
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
import { Suggestion } from '../../../server/models/postAddressLookup';

interface FormErrors {
  name: boolean;
  registrationYear: boolean;
  registrationNumber: boolean;
  charityNumber: boolean;
  charityYear: boolean;
  website: boolean;
  addressLookup: boolean;
  addressFields?: boolean;
  billingAddressFields?: boolean;
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
const Breakpoints = createTheme().breakpoints;
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
    textAlign: 'left',
    marginTop: '10px',
    paddingLeft: '16px',
  },
  formGroupm: {
    textAlign: 'left',
    marginTop: '16px',
    [Breakpoints.up('sm')]: {
      marginTop: '10px',
      paddingLeft: '16px',
    },
    [Breakpoints.down('md')]: {
      marginTop: '10px',
      paddingLeft: '17px',
    },
  },
  formGroupLandline: {
    textAlign: 'left',
    marginTop: '10px',
    paddingLeft: '17px',
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
    [Breakpoints.down('md')]: {
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
    width: '19px',
    marginTop: '9px',
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
    marginTop: '0.3rem',
    marginLeft: '0.7rem',
  },

  scrollablediv: {
    height: 'calc(100vh - 80px)',
    overflow: 'auto',
    scrollbarWidth: 'none',
    [Breakpoints.down('sm')]: {
      height: 'calc(100vh - 120px)',
    },
  },
  cssPage: {
    padding: 0,
    margin: 0,
  },
  checkBoxContainer: {
    marginLeft: '-0.75rem',
    maxWidth: '3rem',
    marginTop: '6px',
    display: 'contents',
  },
  divider: {
    marginLeft: '16px',
  },
  boxContainer: {
    [Breakpoints.down('lg')]: {
      marginLeft: '7.25rem',
      marginRight: '7.25rem',
    },
    [Breakpoints.down('sm')]: {
      marginLeft: '1rem',
      marginRight: '1rem',
    },
    [Breakpoints.up('xl')]: {
      marginRight: '10rem',
    },
  },
  cardContainer: {
    [Breakpoints.down('lg')]: {
      display: 'none',
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
  errorMessage: {
    color: StyleVariables.colors.text.critical,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.xs,
    lineHeight: StyleVariables.fonts.lineHeight.small,
  },
  BillingAlign: {
    marginTop: '12px',
  },
  blueCheckbox: {
    maxWidth: '2rem',
    textAlign: 'left',
    display: 'contents',
  },
  checklabel: {
    display: 'inline-flex',
  },
  addressArrowIcon: {
    marginRight: '-0.875rem',
    marginBottom: '-0.25rem',
  },
}));
export default function CompanyDetails(companyDetailProps: CompanyDetailProps) {
  const classes = useStyles();
  const [companyDetailsForm, setCompanyDetailsForm] =
    useState<CompanyDetails>();
  const [addressLookup, setAddressLookup] = useState('');
  const [billingAddressLookup, setBillingAddressLookup] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [addressList, setAddressList] = useState<Suggestion[]>([]);
  const [billingAddressList, setBillingAddressList] = useState<Suggestion[]>(
    []
  );
  const dispatch = useDispatch();
  const companyDetailsSelector = useSelector((state: any) => state.companyDetails);
  const referralValueSelector = useSelector((state: any) => state.referral);
  const [billingAddressSuggestions, setBillingAddressSuggestions] = useState<
    string[]
  >([]);
  const [show, setShow] = useState(false);
  const [billingShow, setBillingShow] = useState(false);
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
  const companyTypeValue = useSelector((state: any) => state.companyType);
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
      to: 'paymentDetails',
      from: 'choosePlan',
      text: 'Go to payment',
      mobileText: 'Go to payment',
      prevText: 'Previous',
      page: 'companyDetails',
      impaired: canSubmitForm,
    },
  };
  const billingAddressReset = () => {
    setBillingAddressLookup('');
    setBillingAddressSuggestions([]);
    setBillingShow(false);
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
    const object = addressList?.find((obj) => obj.text === value);
    const key = object?.global_address_key ?? null;
    companyDetailProps.findAddressLookup(key).then((res) => {
      if (res?.payload?.response?.result?.address) {
        const addressLine1 =
          res?.payload?.response?.result?.address.address_line_1 ?? '';
        const addressLine2 =
          res?.payload?.response?.result?.address.address_line_3 === ''
            ? res?.payload?.response?.result?.address.address_line_2
            : `${res?.payload?.response?.result?.address.address_line_2} ,
            ${res?.payload?.response?.result?.address.address_line_3}`;
        const county =
          res?.payload?.response?.result?.address.country === 'UNITED KINGDOM'
            ? County.United_Kingdom
            : County.United_Kingdom;

        const town = res?.payload?.response?.result?.address.locality ?? '';
        const postalCode =
          res?.payload?.response?.result?.address?.postal_code ?? '';
        setCompanyDetailsForm({
          ...companyDetailsForm,
          address: {
            ...companyDetailsForm?.address,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            county: county,
            town: town,
            postCode: postalCode,
          },
        });
      }
    });

    await setAddressLookup(value);
  };

  const handleChangeBillingAddress = async (e, value) => {
    setBillingLoading(false);
    const object = billingAddressList?.find((obj) => obj.text === value);
    const key = object?.global_address_key ?? null;
    companyDetailProps.findAddressLookup(key).then((res) => {
      if (res?.payload?.response?.result?.address) {
        const addressLine1 =
          res?.payload?.response?.result?.address.address_line_1 ?? '';
        const addressLine2 =
          res?.payload?.response?.result?.address.address_line_3 === ''
            ? res?.payload?.response?.result?.address.address_line_2
            : `${res?.payload?.response?.result?.address.address_line_2} ,
              ${res?.payload?.response?.result?.address.address_line_3}`;
        const county =
          res?.payload?.response?.result?.address.country === 'UNITED KINGDOM'
            ? County.United_Kingdom
            : County.United_Kingdom;
        const town = res?.payload?.response?.result?.address.locality ?? '';
        const postalCode =
          res?.payload?.response?.result?.address?.postal_code ?? '';
        setCompanyDetailsForm({
          ...companyDetailsForm,
          billingAddress: {
            ...companyDetailsForm?.billingAddress,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            county: county,
            town: town,
            postCode: postalCode,
          },
        });
      }
    });
    await setBillingAddressLookup(value);
  };
  const handleClick = (e) => {
    setCompanyDetailsForm({
      ...companyDetailsForm,
      registrationYear: e.target.value,
    });
  };

  const handleIncorporationRegistrationYear = (e) => {
    setCompanyDetailsForm({
      ...companyDetailsForm,
      charityYear: e.target.value,
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
      const newArr = 'Please enter a valid Landline Number';
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
    if ((year >= 1000 && year <= new Date().getFullYear()) || year === '') {
      setCharityYearMessage('');
      setCharityYearError(false);
    } else {
      setCharityYearMessage('Please enter a valid four-digit year');
      setCharityYearError(true);
    }
  };

  const validateRegistrationYear = (year) => {
    const currentYear = new Date().getFullYear();
    if ((year >= 1000 && year <= currentYear) || year === '') {
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
      addressLookup: !companyDetailsForm?.address,
      addressFields: show
        ? Object.values(addressErrors).filter(Boolean).length > 0
        : false,
      billingAddressFields: billingShow
        ? Object.values(billingAddressErrors).filter(Boolean).length > 0
        : false,
      sendInviteWhenSaving: sendInviteWhenSaving
        ? Object.values(billingAddressErrors).filter(Boolean).length > 0
        : false,

      charityNumber: false,
      charityYear: false,
      website: false,
    };
    if (
      Object.values(companyBasicDetailsErrors).filter(Boolean).length ||
      !addressLookup ||
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
        if (companyDetailsSelector.addressLookup) {
          setAddressLookup(companyDetailsSelector.addressLookup);
        }
      }
      if (companyDetails?.billingAddress?.addressLine1) {
        setSendInviteWhenSaving(true);
        setBillingShow(true);
        if (companyDetailsSelector.billingAddressLookup) {
          setBillingAddressLookup(companyDetailsSelector.billingAddressLookup);
        }
      }
      validateForm();
    } else {
      setCompanyDetailsForm({
        ...companyDetailsForm,
        address: {
          ...companyDetailsForm?.address,
          county: County.United_Kingdom,
        },
      });
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
        setAddressList([]);
        for (let i = 0; i < responsePlan.length; i++) {
          setAddressSuggestions((current) => [
            ...current,
            responsePlan[i].text,
          ]);
          setAddressList((prevState) => [...prevState, responsePlan[i]]);
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
        setBillingAddressList([]);
        for (let i = 0; i < responsePlan.length; i++) {
          setBillingAddressSuggestions((current) => [
            ...current,
            responsePlan[i].text,
          ]);
          setBillingAddressList((prevState) => [...prevState, responsePlan[i]]);
        }
      }
    });
    setBillingShow(true);
  };

  useEffect(() => {
    validateForm();
    if (companyDetailsForm) {
      dispatch({
        type: footerProps.footerSectionProps.page,
        payload: {
          companyDetails: serialize(companyDetailsForm),
          addressLookup: addressLookup,
          billingAddressLookup: billingAddressLookup,
        },
      });
    }
  }, [companyDetailsForm, addressLookup, sendInviteWhenSaving]);

  return (
    <Page className={classes.cssPage}>
      <Grid item xs={12} className={classes.scrollablediv}>
        <AboutSection count={STEPPER_DOTS} />
        <Grid className={classes.stepper}>
          <Stepper count={STEPPER_DOTS}></Stepper>
        </Grid>
        <Grid item md={12} className={classes.boxContainer}>
          <Typography className={classes.title} variant="h1" component="h1">
            Company details
          </Typography>
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
              <form method="post" className={classes.formContainer}>
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
                              validateRegistrationYear(e.target.value);
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
                    <Grid container>
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
                              validateRegistrationYear(e.target.value);
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
                    <Grid container>
                      <Grid item xs={12} sm={6}>
                        <FormControl variant="standard" fullWidth className={classes.formGroup}>
                          <Input
                            type="text"
                            label="Charity number"
                            placeholder="e.g. 12345678"
                            required={false}
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
                            label="Charity incorporating/reg year"
                            placeholder="YYYY"
                            required={false}
                            maxLength={4}
                            value={companyDetailsForm?.charityYear || ''}
                            data-testid="charityIncorporationYearInput"
                            onChange={(e) => {
                              console.log('-->', e.target.value);

                              handleIncorporationRegistrationYear(e);
                              validateCharityYear(e.target.value);
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
                          <label>
                            <Select
                              items={countryOptions}
                              label="County"
                              required={true}
                              inputProps={{
                                'data-testid': 'countyInput',
                              }}
                              value={companyDetailsForm?.address?.county}
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
                          </label>
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
                      <Grid container>
                        <Grid item xs={12} sm={6}>
                          <FormControl variant="standard" fullWidth className={classes.formGroupLandline}>
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
                          <FormControl variant="standard" fullWidth className={classes.formGroupm}>
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
                          xs={2}
                          className={clsx(classes.checkBoxContainer)}
                        >
                          <FormControl variant="standard" className={classes.formGroup}>
                            <Grid
                              item
                              xs={2}
                              className={clsx(classes.blueCheckbox)}
                            >
                              <label className={classes.checklabel}>
                                <input
                                  type="checkbox"
                                  className={clsx(
                                    classes.check,
                                    classes.blueCheck
                                  )}
                                  checked={sendInviteWhenSaving}
                                  title="Select here if your billing address is different from your address added above"
                                  required={true}
                                  onChange={(e) => {
                                    setSendInviteWhenSaving(e.target.checked);
                                    billingAddressReset();
                                  }}
                                  data-testid="isBillingAddress"
                                />
                                <Grid item xs={12}>
                                  <Text className={classes.checkboxText}>
                                    Select here if your billing address is
                                    different from your address added above
                                  </Text>
                                </Grid>
                              </label>
                            </Grid>
                          </FormControl>
                        </Grid>
                      </Grid>
                      {sendInviteWhenSaving && (
                        <Grid item xs={12}>
                          
                        </Grid>
                      )}
                      {billingShow && sendInviteWhenSaving && (
                        <Grid container>
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
                              <label>
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
                              </label>
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
              <ExpandableCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.stepper}>
        <MobileFooterSection {...footerProps} />
      </div>
      <div className={classes.footerVisibility}>
        <FooterSection {...footerProps} />
      </div>
    </Page>
  );
}
