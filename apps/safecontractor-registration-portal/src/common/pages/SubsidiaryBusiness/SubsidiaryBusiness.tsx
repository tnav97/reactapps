import React, { useEffect, useState } from 'react';
import { Box, Card, FormControl, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import {
  Page,
  StyleVariables,
  Button,
  Input,
  Image,
} from '@alcumus/components';
import AboutSection from '../../components/AboutSection';
import FooterSection from '../../components/FooterSection';
import clsx from 'clsx';
import { DeleteOutline } from '@mui/icons-material';
import { CardSelected } from '../../constants';
import MobileFooterSection from '../../components/MobileFooterSection';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import ReadMore from '../../components/ReadMore';
import { useHistory } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';

const PROGRESS = 45;

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    marginTop: '24px',
    textAlign: 'center',
    marginLeft: '24px',
    marginRight: '24px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '16px',
      marginRight: '16px',
    },
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
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
  formGroup: {
    marginBottom: '1rem',
    textAlign: 'inherit',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0rem',
    },
  },
  inputPosition: {
    display: 'flex',
    margin: 'auto',
    marginTop: '32px',
  },
  businessAdd: {
    margin: 'auto',
    justifyContent: 'space-evenly',
    textAlignLast: 'left',
    [theme.breakpoints.down('md')]: {
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

    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 105px)',
    },
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
  cardSelect: {
    backgroundColor: '#158BD126',
    borderWidth: '2px',
    borderColor: StyleVariables.colors.base.primary,
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
    [theme.breakpoints.down('sm')]: {
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
  inputsContainer: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '16px',
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
    [theme.breakpoints.down('sm')]: {
      marginLeft: '16px',
      marginRight: '16px',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '1rem',
      marginRight: '1rem',
    },
  },
  mobileDeleteContainer: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  desktopDeleteContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  subsidiaryLimit: {
    marginTop: '-3.5rem',
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
}));

export default function SubsidiaryBusiness() {
  const [selected, setSelected] = React.useState(CardSelected.Not_Selected);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [selectedTabIndexNo, setSelectedTabIndexNo] = React.useState(-1);
  const [selectedTabIndexYes, setSelectedTabIndexYes] = React.useState(0);
  const [nextPage, setNextPage] = React.useState('choosePlan');
  const dispatch = useDispatch();
  const history = useHistory();
  const subsidiaryListSelector = useSelector((state: any) => state.subsidiary);
  const initialState = { name: '', registrationNumber: '' };
  const [inputFields, setInputFields] = useState(
    !subsidiaryListSelector.companyList
      ? [initialState]
      : subsidiaryListSelector.companyList
  );
  const [registrationMessage, setRegistrationMessage] = React.useState<
    Array<string>
  >([]);
  const [companyMessage, setCompanyMessage] = React.useState<Array<string>>([]);
  const [show, setShow] = useState(false);
  const [registrationError, setRegistrationError] = React.useState<
    Array<boolean>
  >([]);
  const [companyError, setCompanyError] = React.useState<Array<boolean>>([]);
  const [placeholderName, setplaceholderName] = useState(true);
  const [, setDeleteIconShow] = useState(false);
  const [placeholderReg, setplaceholderReg] = useState(true);
  const [subsidiaryLimitError, setSubsidiaryLimitError] = useState('');
  const [addButton, setAddButton] = useState(false);
  const RegistrationValidate = (name, regNumber, index) => {
    const registerRegex = /[A-Z]{2}\d{6}|[0-9]{8}/;
    const companyErrorMessage = [...companyMessage];
    if (name.length === 0 && name === '') {
      companyErrorMessage[index] = 'This field is required';
      setCompanyMessage(companyErrorMessage);
      companyError[index] = true;
      setCompanyError(companyError);
      setplaceholderName(false);
    } else {
      companyErrorMessage[index] = '';
      setCompanyMessage(companyErrorMessage);
      companyError[index] = false;
      setCompanyError(companyError);
    }
    if (
      (!registerRegex.test(regNumber) && regNumber !== '') ||
      (regNumber.length !== 8 && regNumber.length !== 0)
    ) {
      const newArr = [...registrationMessage];
      newArr[index] = 'Format must be XX123456 or 12345678';
      setRegistrationMessage(newArr);
      setShow(false);
      registrationError[index] = true;
      setRegistrationError(registrationError);
    } else {
      const newArr = [...registrationMessage];
      newArr[index] = '';
      setRegistrationMessage(newArr);
      setShow(true);
      registrationError[index] = false;
      setRegistrationError(registrationError);
      if (regNumber.length === 0 || name.length === 0) {
        setShow(false);
      }

      if (registrationError.includes(true) || companyError.includes(true)) {
        setShow(false);
      }
    }
    const lists = [...inputFields];
    setInputFields(lists);
    lists.forEach((list) => {
      if (list.name === '' && list.registrationNumber === '') {
        setShow(false);
      }
    });
  };
  const handleChangeInput = (event, index) => {
    const list = [...inputFields];
    list[index][event.target.name] = event.target.value;
    setDeleteIconShow(true);
  };

  useEffect(() => {
    if (subsidiaryListSelector.selected === CardSelected.No) {
      setNextPage('responseTime');
    }
    setSelected(subsidiaryListSelector.selected);
    setSelectedValue(subsidiaryListSelector.selectedValue);
    setInputFields(
      !subsidiaryListSelector.companyList
        ? [initialState]
        : subsidiaryListSelector.companyList
    );
  }, [subsidiaryListSelector]);
  useEffect(() => {
    if (subsidiaryListSelector.companyList) {
      const list = subsidiaryListSelector.companyList;
      setInputFields(
        !subsidiaryListSelector.companyList
          ? [initialState]
          : subsidiaryListSelector.companyList
      );
      if (JSON.stringify(list) !== JSON.stringify([initialState])) {
        for (let index = 0; index < list.length; index++) {
          RegistrationValidate(
            list[index].name,
            list[index].registrationNumber,
            index
          );
        }
      }
    }
  }, []);
  useEffect(() => {
    if (selected !== CardSelected.Not_Selected) {
      dispatch({
        type: footerProps.footerSectionProps.page,
        payload: {
          selected: selected,
          selectedValue: selectedValue,
          companyList: inputFields,
        },
      });
    }
  }, [selected, selectedValue, inputFields]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleAddFields = () => {
    setShow(false);
    const list = [...inputFields];
    if (list.length === 25) {
      setShow(true);
      setAddButton(true);
      setSubsidiaryLimitError('You can add maximum 25 subsidiaries');
      return;
    } else {
      setSubsidiaryLimitError('');
    }
    for (let index = 0; index < list.length; index++) {
      if (list[index].name === '' || list[index].registrationNumber === '') {
        RegistrationValidate(
          list[index].name,
          list[index].registrationNumber,
          index
        );
        if (
          list[index].registrationNumber.length === 0 &&
          list[index].registrationNumber === ''
        ) {
          const newArr = [...registrationMessage];
          newArr[index] = 'This field is required';
          setRegistrationMessage(newArr);
          setplaceholderReg(false);
          setShow(false);
          registrationError[index] = true;
          setRegistrationError(registrationError);
        }
        setplaceholderReg(true);
        return;
      }
    }
    setInputFields([...inputFields, initialState]);
  };
  const handleRemoveFields = (index) => {
    setSubsidiaryLimitError('');
    const values = [...inputFields];
    values.splice(index, 1);
    inputFields.splice(index, 1);
    setInputFields(values);
    setShow(true);
  };
  const impaired: boolean = (selected === 0 && show) || selected === 1;
  const footerProps = {
    register: () => undefined,
    footerSectionProps: {
      to: nextPage,
      from: 'SSIPQuestion',
      impaired: impaired,
      page: 'subsidiary',
    },
  };
  const mobilefooterProps = {
    register: () => undefined,
    footerSectionProps: {
      to: nextPage,
      from: 'companyType',
      prevText: 'Go back',
      impaired: impaired,
      page: 'subsidiary',
    },
  };
  const handleReset = () => {
    const list = [...inputFields];
    list[0].name = '';
    list[0].registrationNumber = '';

    RegistrationValidate(list[0].name, list[0].registrationNumber, 0);
    const companyErrorMessage = [...companyMessage];
    companyErrorMessage[0] = '';
    setCompanyMessage(companyErrorMessage);
    companyError[0] = false;
    setCompanyError(companyError);
    const newArr = [...registrationMessage];
    newArr[0] = '';
    setRegistrationMessage(newArr);
    registrationError[0] = false;
    setRegistrationError(registrationError);
    setInputFields(list);
    setplaceholderName(true);
    setplaceholderReg(true);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' && index === CardSelected.No) {
      history.push(`/${footerProps?.footerSectionProps?.to}`);
    }
  };

  const handleKeyReset = (event) => {
    if (event.key === 'Enter') {
      handleReset();
    }
  };

  const handleRemove = (event, index) => {
    if (event.key === 'Enter') {
      handleRemoveFields(index);
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
  const submit = (item, index) => {
    setSelected(index);
    setSelectedValue(item);
    const list = [...inputFields];
    setInputFields(list);
    setNextPage('choosePlan');
    if (index === CardSelected.No) {
      setNextPage('responseTime');
      setSelectedTabIndexYes(0);
    } else {
      setSelectedTabIndexNo(-1);
    }
  };

  return (
    <Page className={classes.cssPage}>
      <Grid item xs={12} className={classes.scrollablediv}>
        <AboutSection progress={PROGRESS} />
        <Grid className={classes.stepper}>
          <ProgressBar progress={PROGRESS} />
        </Grid>
        <Typography className={classes.title} variant="h1" component="h1">
          Would you like to register any subsidiary businesses?
        </Typography>

        <ReadMore>
          Due to legal implications of limited liability, if you are registering
          as a group, please list any limited companies you wish to be included
          in your health and safety assessment.
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
                title={`${content.value} subsidiary`}
              >
                <Card
                  variant="outlined"
                  className={clsx(
                    classes.cardsContent,
                    `${selected === index ? classes.cardSelect : ''}`
                  )}
                  data-testid={
                    content.value === 'Yes' ? 'subsidiaryYes' : 'subsidiaryNo'
                  }
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
          <Grid container>
            <Grid item md={4} sm={2}></Grid>

            <Grid item md={6} sm={9}>
              <form onSubmit={handleSubmit}>
                {inputFields?.map((subsidiary, index) => (
                  <div key={index}>
                    <Grid container className={clsx(classes.inputsContainer)}>
                      <Grid item xs={10} sm={6} md={5} lg={5}>
                        <FormControl
                          variant="standard"
                          fullWidth
                          className={clsx(
                            classes.formGroup,
                            classes.businessAdd
                          )}>
                          <Input
                            placeholder={placeholderName ? 'Company name' : ''}
                            className={classes.subsidaryInput}
                            type="text"
                            state={companyError[index] ? 'error' : 'default'}
                            name="name"
                            label="Subsidiary name"
                            required={false}
                            data-testid={`companyName${index}`}
                            value={subsidiary.name}
                            onChange={(event) => {
                              handleChangeInput(event, index);
                              RegistrationValidate(
                                subsidiary.name,
                                subsidiary.registrationNumber,
                                index
                              );
                            }}
                            onFocus={() => {
                              setSelectedTabIndexNo(0);
                              setSelectedTabIndexYes(-1);
                            }}
                            aria-hidden="false"
                            tabIndex={0}
                          />
                          <React.Fragment key={index}>
                            <Typography
                              data-testid={`companyNameError${index}`}
                              className={classes.errorMessage}
                            >
                              {companyMessage[index]}
                            </Typography>
                          </React.Fragment>
                        </FormControl>
                      </Grid>

                      <Grid
                        item
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        className={clsx(classes.mobileDeleteContainer)}
                      >
                        <FormControl variant='standard'
                          fullWidth
                          className={clsx(
                            classes.formGroup,
                            classes.deleteicon
                          )}
                        >
                          <div
                            title={
                              index === 0
                                ? 'Click here to remove'
                                : 'Click here to remove'
                            }
                          >
                            <button className={clsx(classes.deleteButtonIcon)}>
                              <DeleteOutline
                                className={clsx(classes.deleteIcon)}
                                onClick={() =>
                                  `${
                                    index === 0 && inputFields?.length === 1
                                      ? handleReset()
                                      : handleRemoveFields(index)
                                  }`
                                }
                                onKeyDown={() =>
                                  `${
                                    index === 0 && inputFields?.length === 1
                                      ? handleKeyReset(event)
                                      : handleRemove(event, index)
                                  }`
                                }
                                aria-hidden="false"
                              />
                            </button>
                          </div>
                        </FormControl>
                      </Grid>

                      <Grid item xs={10} sm={5} md={4} lg={4}>
                        <FormControl
                          variant="standard"
                          fullWidth
                          className={clsx(classes.formGroup, classes.regcode)}>
                          <Input
                            className={classes.registrationInput}
                            placeholder={
                              placeholderReg ? 'e.g. XX123456 or 12345678' : ''
                            }
                            state={
                              registrationError[index] ? 'error' : 'default'
                            }
                            type="text"
                            name="registrationNumber"
                            label="Registration number"
                            required={false}
                            data-testid={`registrationNumber${index}`}
                            value={subsidiary.registrationNumber}
                            onChange={(event) => {
                              handleChangeInput(event, index);
                              RegistrationValidate(
                                subsidiary.name,
                                subsidiary.registrationNumber,
                                index
                              );
                            }}
                            onFocus={() => {
                              setSelectedTabIndexNo(0);
                              setSelectedTabIndexYes(-1);
                            }}
                            max={8}
                            aria-hidden="false"
                            tabIndex={0}
                          />
                          <React.Fragment key={index}>
                            <Typography
                              data-testid={`registrationNumberError${index}`}
                              className={classes.errorMessage}
                            >
                              {registrationMessage[index]}
                            </Typography>
                          </React.Fragment>
                        </FormControl>
                      </Grid>

                      <Grid
                        item
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        className={clsx(classes.desktopDeleteContainer)}
                      >
                        <FormControl variant='standard'
                          fullWidth
                          className={clsx(
                            classes.formGroup,
                            classes.deleteicon
                          )}
                        >
                          <div
                            title={
                              index === 0
                                ? 'Click here to remove'
                                : 'Click here to remove'
                            }
                          >
                            <button className={clsx(classes.deleteButtonIcon)}>
                              <DeleteOutline
                                className={clsx(classes.deleteIcon)}
                                data-testid={
                                  index === 0
                                    ? `reset${index}`
                                    : `remove${index}`
                                }
                                onClick={() =>
                                  `${
                                    index === 0 && inputFields?.length === 1
                                      ? handleReset()
                                      : handleRemoveFields(index)
                                  }`
                                }
                                onKeyDown={() =>
                                  `${
                                    index === 0 && inputFields?.length === 1
                                      ? handleKeyReset(event)
                                      : handleRemove(event, index)
                                  }`
                                }
                                aria-hidden="false"
                              />
                            </button>
                          </div>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </form>
            </Grid>
            <Grid item md={3} sm={1}></Grid>
          </Grid>
        </Grid>
        <Grid
          className={clsx(
            classes.addButton,
            `${
              selected === CardSelected.Yes
                ? classes.displayBlock
                : classes.displayNone
            }`
          )}
        >
          <Grid container className={clsx(classes.inputsContainer)}>
            <Grid item sm={2} md={4} lg={4}></Grid>

            <Grid item sm={3} md={4} lg={4}>
              <Typography>
                <Button
                  type="submit"
                  title="Click here to Add another"
                  disabled={!show || addButton}
                  data-testid="addAnotherButton"
                  onClick={() => {
                    handleAddFields();
                    setplaceholderName(true);
                    setplaceholderReg(true);
                  }}
                  className={classes.buttonBorder}
                  tabIndex={0}
                >
                  Add another
                </Button>
              </Typography>
              <React.Fragment>
                <Typography
                  className={clsx(
                    classes.errorMessage,
                    classes.subsidiaryLimit
                  )}
                >
                  {subsidiaryLimitError}
                </Typography>
              </React.Fragment>
            </Grid>
          </Grid>
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
