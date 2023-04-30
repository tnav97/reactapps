import { FormControl, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Image, StyleVariables, Input } from '@alcumus/components';
import FooterSection from '../../components/FooterSection';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { TypeData } from '../../../server/models/questionnarie';
import MobileFooterSection from '../MobileFooterSection';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
  companyTypeSelected,
  companyTypeSelection,
  DefaultOther,
  empolyeeCountSelection,
} from '../constants';
import { useHistory } from 'react-router-dom';

interface CardProps {
  height?: string;
  imageHeight?: string;
  marginLeft?: string;
  marginTop?: string;
  marginImage?: string;
  contents?: TypeData[];
  images?: string[];
  imagesContent?: string[];
  to?: string;
  from?: string;
  visibility?: string;
  impaired?: boolean;
  type?: string;
  page?: string;
  gridSizeDesktop?: number;
}

const useStyles = makeStyles((theme) => ({
  cardContent: {
    height: '70px',
    display: 'flex',
    fontWeight: StyleVariables.fonts.weight.medium,
    fontSize: StyleVariables.fonts.size.h5,
    lineHeight: StyleVariables.fonts.lineHeight.h5,
    color: StyleVariables.colors.base.text,
  },
  imageContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  othersText: {
    paddingLeft: '8px',
    paddingRight: '8px',
    height: '20px',
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.body,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.h4,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    textAlign: 'left',
    marginTop: '26px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0',
      paddingRight: '0',
    },
  },
  detailsContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  formGroup: {
    marginBottom: '1rem',
    textAlign: 'inherit',
  },
  imageCenterText: {
    top: '40%',
    marginTop: '1.5rem',
    position: 'absolute',
    color: StyleVariables.colors.action.primary.default,
    fontWeight: StyleVariables.fonts.weight.medium,
    fontSize: StyleVariables.fonts.size.h1,
    lineHeight: StyleVariables.fonts.lineHeight.h1,
  },
  cardContainerCenter: {
    justifyContent: 'center',
  },
  boxContainer: {
    justifyContent: 'center',
    marginBottom: '8px',
    height: '114px',
    marginTop: '16px',
    [theme.breakpoints.down('sm')]: {
      height: '56px',
    },
    [theme.breakpoints.up('sm')]: {
      height: '114px',
      marginLeft: '10px',
    },

    cursor: 'pointer',
    background: StyleVariables.colors.base.white,
    border: `2px solid ${StyleVariables.colors.border.default}`,
    boxSizing: 'border-box',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    fontWeight: StyleVariables.fonts.weight.medium,
    fontSize: StyleVariables.fonts.size.h5,
    lineHeight: StyleVariables.fonts.lineHeight.h5,
    color: StyleVariables.colors.base.text,
    padding: '10px',
  },
  cardSelect: {
    backgroundColor: '#158BD126',
    borderColor: StyleVariables.colors.base.primary,
  },
  alignText: {
    width: '100%',
    textAlign: 'center',
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
  itemsContainer: {},
  inputContainer: {
    marginBottom: '1rem',
  },
  errorMessage: {
    color: StyleVariables.colors.text.critical,
    fontWeight: StyleVariables.fonts.weight.regular,
    lineHeight: StyleVariables.fonts.lineHeight.xs,
    textAlign: 'center',
    fontSize: StyleVariables.fonts.size.xs,
    marginTop: '4rem',
  },
  detailContainerAlign: {
    marginLeft: '5%',
    marginRight: '5%',
    [theme.breakpoints.up('lg')]: {
      marginLeft: 0,
      marginRight: 0,
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '15%',
      marginRight: '15%',
    },
  },
}));

export default function Card(cardProps: CardProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const employeeCardValue = useSelector((state: any) => state.employee);
  const companyTypeValue = useSelector((state: any) => state.companyType);
  const [selected, setSelected] = React.useState<number>(
    companyTypeSelected.NOT_SELECTED
  );
  const [selectedValue, setSelectedValue] = React.useState<string>('');
  const [companyType, setCompanyType] = React.useState<string>('');
  const {
    contents,
    images,
    to,
    from,
    visibility,
    imagesContent,
    type,
    page,
    gridSizeDesktop,
  } = cardProps;
  const lengthOfContents = contents?.length;
  const impaired: boolean =
    (lengthOfContents !== undefined && selected < lengthOfContents) ||
    (companyType !== '' && selected === lengthOfContents);

  const footerProps = {
    register: () => undefined,
    footerSectionProps: {
      visibility: `${visibility}`,
      to: `${to}`,
      from: `${from}`,
      impaired: impaired,
      page: `${page}`,
    },
  };

  useEffect(() => {
    if (footerProps.footerSectionProps.page === 'employee') {
      setSelected(employeeCardValue.selected);
      setSelectedValue(employeeCardValue.selectedValue);
    } else {
      setSelected(companyTypeValue.selected);
      setSelectedValue(companyTypeValue.selectedValue);
      setCompanyType(companyTypeValue.companyType);
    }
    if (
      footerProps.footerSectionProps.page === 'companyType' &&
      employeeCardValue.selected === empolyeeCountSelection[0].key
    ) {
      setSelected(companyTypeSelection[0].key);
      setSelectedValue(companyTypeSelection[0].value);
      setCompanyType('');
    }
  }, [employeeCardValue, companyTypeValue]);
  useEffect(() => {
    if (selected !== companyTypeSelected.NOT_SELECTED) {
      if (footerProps.footerSectionProps.page === 'companyType') {
        dispatch({
          type: footerProps.footerSectionProps.page,
          payload: {
            selected: selected,
            selectedValue: selectedValue,
            companyType: companyType,
          },
        });
      } else {
        dispatch({
          type: footerProps.footerSectionProps.page,
          payload: {
            selected: selected,
            selectedValue: selectedValue,
          },
        });
      }
    }
  }, [selected, selectedValue, companyType]);

  const handleChange = (e) => {
    setCompanyType(e.target.value);
    if (contents?.length) {
      setSelected(contents?.length);
      setSelectedValue(DefaultOther);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      history.push(`/${footerProps?.footerSectionProps?.to}`);
    }
  };

  const onCardSelect = (content, index) => {
    if (
      footerProps.footerSectionProps.page === 'companyType' &&
      employeeCardValue.selected === empolyeeCountSelection[0].key
    ) {
      setSelected(empolyeeCountSelection[0].key);
      setSelectedValue(empolyeeCountSelection[0].value.toString());
      setCompanyType('');
      setShow(true);
      return;
    }
    setSelected(index);
    setSelectedValue(content.key);
    setCompanyType('');
  };
  return (
    <Grid className={classes.detailContainerAlign}>
      <Grid container className={classes.detailsContainer}>
        {contents?.map((content, index) => {
          return (
            <React.Fragment key={index}>
              {gridSizeDesktop === 5 && index % 5 === 0 && (
                <Grid item lg={1} xl={1}></Grid>
              )}
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                lg={2}
                xl={2}
                className={classes.itemsContainer}
              >
                <Box
                  title={`${content.value} ${page}`}
                  className={clsx(
                    classes.boxContainer,
                    `${selected === index ? classes.cardSelect : ''}`
                  )}
                  data-testid={content.testid}
                  tabIndex={content.tabIndex}
                  onClick={() => onCardSelect(content, index)}
                  onFocus={() => onCardSelect(content, index)}
                  onKeyDown={handleKeyDown}
                >
                  <Grid item className={classes.cardContainerCenter}>
                    <Typography
                      className={clsx(classes.content, classes.alignText)}
                    >
                      {content.value}
                    </Typography>
                    {images && (
                      <Image
                        className={classes.imageContent}
                        src={images[index]}
                        alt={content.value}
                      />
                    )}
                    {imagesContent && (
                      <Grid container className={classes.cardContainerCenter}>
                        <Typography
                          className={clsx(
                            classes.imageContent,
                            classes.imageCenterText
                          )}
                        >
                          {imagesContent[index]}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
      {type === 'list' && (
        <Grid container className={classes.cardContainerCenter}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <FormControl
              variant="standard"
              fullWidth
              className={(classes.formGroup, classes.othersText)}>
              <Input
                type="text"
                id="companyTypeId"
                data-testid="companyTypeId"
                key={contents?.length}
                tabIndex={0}
                label="None of the above? Please specify below"
                required={false}
                placeholder="Insert organisation type"
                className={clsx(
                  classes.inputContainer,
                  `${selected === contents?.length ? classes.cardSelect : ''}`
                )}
                value={companyType}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
        </Grid>
      )}
      {type === 'list' && (
        <Grid container className={classes.cardContainerCenter}>
          {show && (
            <Typography
              data-testid="zeroEmployeeError"
              className={classes.errorMessage}
            >
              Companies with 0 employees can only select Sole Trader or
              Proprietor. To change your number of employees please click
              Previous question.
            </Typography>
          )}
        </Grid>
      )}
      <div className={classes.stepper}>
        <MobileFooterSection {...footerProps} />
      </div>
      <div className={classes.footerVisibility}>
        <FooterSection {...footerProps} />
      </div>
    </Grid>
  );
}
