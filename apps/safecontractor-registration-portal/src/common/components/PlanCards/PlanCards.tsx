import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import AssignmentTurnedInOutlined from '@mui/icons-material/AssignmentTurnedInOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import DoneIcon from '@mui/icons-material/Done';
import CardContent from '@mui/material/CardContent';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { StyleVariables, Button, Image } from '@alcumus/components';
import clsx from 'clsx';
import FooterSection from '../FooterSection';
import { PlanDetail } from '../../../server/models/choosePlan';
import MobileFooterSection from '../MobileFooterSection';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createTheme} from '@mui/material';

interface CardProps {
  contents?: PlanDetail[];
  text?: string;
  mobileText?: string;
  prevText?: string;
  to?: string;
  from?: string;
  visibility?: string;
  selectedPlan?: number;
  page?: string;
}
const Breakpoints = createTheme().breakpoints;
const useStyles = makeStyles((theme) => ({
  separator: {
    background: StyleVariables.colors.border.default,
    height: '0.1em',
    fontSize: StyleVariables.fonts.size.smaller,
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '-11px',
    [Breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  logo: {
    display: 'block',
    margin: 'auto',
    marginTop: '-6px',
    [Breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  title: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    textAlign: 'center',

    [Breakpoints.down('lg')]: {
      fontSize: StyleVariables.fonts.size.h4,
      lineHeight: StyleVariables.fonts.lineHeight.h4,
      marginTop: '0.5rem',
    },
  },
  detailstitle: {
    fontSize: StyleVariables.fonts.size.regular,
  },
  subtitle: {
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: '14px',
    lineHeight: StyleVariables.fonts.lineHeight.h6,
    textAlign: 'center',
    margin: 'auto',
  },
  cardContainer: {
    background: StyleVariables.colors.surface.neutral.selected,
  },
  marginBottom: {
    marginBottom: '8px',
  },
  planCardGrid: {
    justifyContent: 'center',
  },
  planCardGridAlign: {
    marginTop: '15px',
  },
  iconinfo: {
    color: StyleVariables.colors.icon.info,
  },
  vatText: { marginLeft: '2px', marginTop: '12px' },
  selectPlan: {
    display: 'block',
    margin: 'auto',
    [Breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  tabSelectPlan: {
    display: 'block',
    margin: 'auto',
    [Breakpoints.up('lg')]: {
      display: 'none',
    },
    [Breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  selectPrice: { textAlign: 'center', float: 'left' },
  displayFlex: {
    display: 'flex',
    justifyContent: 'center',
    [Breakpoints.down('lg')]: {
      justifyContent: 'start',
    },
  },
  personContainerAlign: {
    marginTop: '8px',
  },
  displayPlanContainer: {
    display: 'flex',
    justifyContent: 'center',
    [Breakpoints.down('lg')]: {
      justifyContent: 'end',
      marginLeft: '-8px',
    },
  },
  textAlign: {
    textAlign: 'center',
    [Breakpoints.down('lg')]: {
      textAlign: 'left',
    },
  },
  textAlignSubtitle: {
    textAlign: 'center',
    paddingTop: '8px',
    [Breakpoints.down('lg')]: {
      textAlign: 'left',
    },
  },
  padding: {
    paddingTop: 0,
    paddingBottom: '32px',
  },
  border: {
    border: `2px solid ${StyleVariables.colors.border.default}`,
    borderRadius: '8px',
    [Breakpoints.up('lg')]: {
      height: '490px',
    },
  },
  iconDetailsImg: {
    flexBasis: '0px',
  },
  scrollablediv: {
    height: '480px',
    overflow: 'auto',
    marginBottom: '4px',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  cardSelect: {
    backgroundColor: StyleVariables.colors.background.primary,
    borderWidth: '2px',
    borderColor: StyleVariables.colors.base.primary,
  },
  personContainer: {
    [Breakpoints.up('lg')]: {
      height: '40px',
    },
  },
  cardContentContainer: {
    padding: '16px 25px',

    [Breakpoints.down('lg')]: {
      paddingBottom: 0,
    },
  },
  cardTopContentContainer: {
    marginTop: '8px',
    [Breakpoints.up('lg')]: {
      height: '214px',
    },
    [Breakpoints.up('md')]: {
      paddingLeft: '1.4rem',
      paddingRight: '1.4rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
    },
    [Breakpoints.down('lg')]: {
      paddingBottom: 0,
    },
  },
  cardMiddleContentContainer: {
    [Breakpoints.up('md')]: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
    },
    [Breakpoints.down('lg')]: {
      paddingBottom: 0,
    },
  },
  cardMobileMiddleContainer: {
    [Breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  cardDesktopMiddleContainer: {
    [Breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  cardRateContainer: {
    [Breakpoints.up('md')]: {
      paddingBottom: '0.5rem',
    },
    [Breakpoints.down('lg')]: {
      paddingTop: 0,
    },
  },
  showDetails: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '5px',
    [Breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  iconDetails: {
    color: StyleVariables.colors.base.primary,
  },
  iconContainer: {
    marginRight: '8px',
  },
  transformButton: {
    transform: 'rotate(180deg)',
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
  rateBox: {
    [Breakpoints.up('lg')]: {
      marginTop: '0.5rem',
    },
  },
  cursorPointerAlign: {
    marginTop: '-15px',
  },
  mobileSelectPlanButton: {
    width: '144px',
    [Breakpoints.down('xl')]: {
      marginTop: '0.5rem',
      width: '165px',
      height: '2rem',
    },
  },
  checkBox: {
    marginLeft: '8px',
    fontSize: '1.2rem',
    [Breakpoints.down('lg')]: {
      marginLeft: 0,
      fontSize: '1.2rem',
    },
  },
  buttonBox: {
    width: '241px',
    height: '32px',
    marginTop: '0.5rem',
    [Breakpoints.up('lg')]: {
      padding: '8px',
      width: '208px',
    },
  },
  recordText: {
    fontSize: '11.5px',
    lineHeight: StyleVariables.fonts.lineHeight.xs,
    marginLeft: '12px',
  },
}));
export default function PlanCard(cardProps: CardProps) {
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const handleShow = () => {
    setShow((value) => !value);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      history.push(`/${footerProps?.footerSectionProps?.to}`);
    }
  };
  const [selected, setSelected] = useState<number>();
  const {
    to,
    from,
    visibility,
    mobileText,
    text,
    prevText,
    contents,
    selectedPlan,
    page,
  } = cardProps;
  const footerProps = {
    register: () => undefined,
    footerSectionProps: {
      visibility: `${visibility}`,
      to: `${to}`,
      from: `${from}`,
      text: `${text}`,
      mobileText: `${mobileText}`,
      prevText: `${prevText}`,
      impaired: selected !== undefined && selected >= 0,
      page: `${page}`,
    },
  };
  useEffect(() => {
    setSelected(selectedPlan);
  }, [selectedPlan]);
  useEffect(() => {
    contents?.find((value, index) => {
      if (index === selected) {
        dispatch({
          type: 'choosePlan',
          payload: {
            selected: selected,
            selectedValue: value.id,
          },
        });
        return value;
      }
      return null;
    });
  }, [selected]);
  const submit = (item, index) => {
    setSelected(index);
    dispatch({
      type: 'choosePlan',
      payload: {
        selected: index,
        selectedValue: item,
      },
    });
  };
  return (
    <Box className={classes.planCardGridAlign}>
      <Grid container spacing={4} className={clsx(classes.planCardGrid)}>
        {contents?.map((record, index) => {
          const sTextWithoutSpace = record.label?.replace(/\s/g, '');
          return (
            <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={index}>
              <Box title={record.label} className={classes.cursorPointerAlign}>
                <Card
                  className={clsx(
                    classes.cursorPointer,
                    classes.border,
                    `${selected === index ? classes.cardSelect : ''}`
                  )}
                  data-testid={sTextWithoutSpace}
                  tabIndex={0}
                  onClick={() => submit(record.id, index)}
                  onFocus={() => submit(record.id, index)}
                  onKeyDown={handleKeyDown}
                  variant="outlined"
                >
                  <CardContent
                    className={clsx(classes.cardTopContentContainer)}
                  >
                    <Image
                      className={clsx(classes.logo)}
                      src={record.image}
                      alt={record.context}
                    />
                    <Grid container className={clsx(classes.textAlign)}>
                      <Grid item xs={8} md={12}>
                        <Typography
                          variant="inherit"
                          className={clsx(classes.title, classes.planCardGrid)}
                        >
                          {record.label}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        className={classes.showDetails}
                        onClick={handleShow}
                      >
                        <Grid item xs={2} className={classes.iconContainer}>
                          <Typography
                            className={classes.iconDetails}
                            title="click to Expand/Minimize"
                          >
                            {show && selected === index ? (
                              <ExpandLessOutlinedIcon
                                data-testid="minimizePlan"
                                aria-hidden="false"
                              />
                            ) : (
                              <ExpandMoreOutlinedIcon
                                data-testid="expandPlan"
                                aria-hidden="false"
                              />
                            )}
                          </Typography>
                        </Grid>
                        <Grid item xs={10} className={classes.iconDetailsImg}>
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
                      </Grid>
                    </Grid>
                    <Grid className={clsx(classes.textAlignSubtitle)}>
                      <Typography
                        variant="inherit"
                        className={clsx(classes.subtitle)}
                      >
                        {record.context}
                      </Typography>
                    </Grid>
                  </CardContent>
                  <div>
                    <Box className={classes.separator}></Box>
                  </div>
                  <CardContent className={clsx(classes.cardContentContainer)}>
                    <div className={clsx(classes.cardMobileMiddleContainer)}>
                      {show && selected === index && (
                        <Grid container>
                          <Grid
                            container
                            className={clsx(classes.personContainer)}
                          >
                            <Grid
                              item
                              xs={1}
                              sm={1}
                              md={1}
                              lg={2}
                              className={clsx(classes.textAlign)}
                            >
                              <PersonOutlineIcon
                                className={clsx(classes.iconinfo)}
                                aria-hidden="false"
                              />
                            </Grid>
                            <Grid item xs={10}>
                              <Typography
                                variant="inherit"
                                className={clsx(classes.recordText)}
                              >
                                {record.benefits}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            className={clsx(
                              classes.personContainer,
                              classes.personContainerAlign
                            )}
                          >
                            <Grid
                              item
                              xs={1}
                              sm={1}
                              md={1}
                              lg={2}
                              className={clsx(classes.textAlign)}
                            >
                              <PhoneOutlinedIcon
                                className={clsx(classes.iconinfo)}
                                aria-hidden="false"
                              />
                            </Grid>
                            <Grid
                              item
                              xs={10}
                              className={clsx(classes.marginBottom)}
                            >
                              <Typography
                                variant="inherit"
                                className={clsx(classes.recordText)}
                              >
                                {record.callInfo}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            className={clsx(
                              classes.personContainer,
                              classes.personContainerAlign
                            )}
                          >
                            <Grid
                              item
                              xs={1}
                              sm={1}
                              md={1}
                              lg={2}
                              className={clsx(classes.textAlign)}
                            >
                              <AssignmentTurnedInOutlined
                                className={clsx(classes.iconinfo)}
                                aria-hidden="false"
                              />
                            </Grid>
                            <Grid
                              item
                              xs={10}
                              className={clsx(classes.marginBottom)}
                            >
                              <Typography
                                variant="inherit"
                                className={clsx(classes.recordText)}
                              >
                                {record.task}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </div>
                    <div className={clsx(classes.cardDesktopMiddleContainer)}>
                      <Grid container>
                        <Grid
                          container
                          className={clsx(classes.personContainer)}
                        >
                          <Grid
                            item
                            xs={1}
                            sm={1}
                            md={1}
                            lg={2}
                            className={clsx(classes.textAlign)}
                          >
                            <PersonOutlineIcon
                              className={clsx(classes.iconinfo)}
                              aria-hidden="false"
                            />
                          </Grid>
                          <Grid item xs={10}>
                            <Typography className={clsx(classes.recordText)}>
                              {record.benefits}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          className={clsx(classes.personContainer)}
                        >
                          <Grid
                            item
                            xs={1}
                            sm={1}
                            md={1}
                            lg={2}
                            className={clsx(classes.textAlign)}
                          >
                            <PhoneOutlinedIcon
                              className={clsx(classes.iconinfo)}
                              aria-hidden="false"
                            />
                          </Grid>
                          <Grid
                            item
                            xs={10}
                            className={clsx(classes.marginBottom)}
                          >
                            <Typography className={clsx(classes.recordText)}>
                              {record.callInfo}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          className={clsx(classes.personContainer)}
                        >
                          <Grid
                            item
                            xs={1}
                            sm={1}
                            md={1}
                            lg={2}
                            className={clsx(classes.textAlign)}
                          >
                            <AssignmentTurnedInOutlined
                              className={clsx(classes.iconinfo)}
                              aria-hidden="false"
                            />
                          </Grid>
                          <Grid
                            item
                            xs={10}
                            className={clsx(classes.marginBottom)}
                          >
                            <Typography className={clsx(classes.recordText)}>
                              {record.task}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </CardContent>
                  <div>
                    <Box className={classes.separator}></Box>
                  </div>
                  <CardContent>
                    <Grid container className={clsx(classes.cardRateContainer)}>
                      <Grid
                        item
                        xs={5}
                        sm={6}
                        md={4}
                        lg={12}
                        className={clsx(classes.displayFlex)}
                      >
                        <Typography
                          variant="h2"
                          data-testid={`${sTextWithoutSpace}`}
                          className={clsx(classes.title)}
                        >
                          £{parseFloat(record.rate.toFixed(2))}
                        </Typography>
                        <Typography className={clsx(classes.vatText)}>
                          + VAT
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={7}
                        sm={6}
                        md={8}
                        lg={12}
                        className={clsx(classes.displayPlanContainer)}
                      >
                        <Typography
                          className={clsx(classes.selectPlan, classes.rateBox)}
                        >
                          <Button
                            className={clsx(classes.buttonBox)}
                            title={`Click here to select ${record.label}`}
                            data-testid={`select${sTextWithoutSpace}`}
                            rounded
                            size="small"
                            tabIndex={-1}
                          >
                            {selected === index
                              ? `${record.label} selected`
                              : `Select ${record.label}`}
                            {selected === index ? (
                              <DoneIcon
                                className={clsx(classes.checkBox)}
                                aria-hidden="false"
                              />
                            ) : (
                              ''
                            )}
                          </Button>
                        </Typography>
                        <Typography className={clsx(classes.tabSelectPlan)}>
                          <Button
                            title="Click here to select plan"
                            data-testid={`mobileSelect${sTextWithoutSpace}`}
                            rounded
                            size="small"
                            className={clsx(classes.mobileSelectPlanButton)}
                            tabIndex={-1}
                          >
                            {selected === index
                              ? `Plan selected`
                              : `Select Plan`}
                            {selected === index ? (
                              <DoneIcon
                                className={clsx(classes.checkBox)}
                                aria-hidden="false"
                              />
                            ) : (
                              ''
                            )}
                          </Button>
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <div className={classes.stepper}>
        <MobileFooterSection {...footerProps} />
      </div>
      <div className={classes.footerVisibility}>
        <FooterSection {...footerProps} />
      </div>
    </Box>
  );
}
