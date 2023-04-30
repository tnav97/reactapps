import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import { Page, StyleVariables } from '@alcumus/components';
import Loading from '../../components/Loading';
import AboutSection from '../../components/AboutSection';
import Card from '../../components/PlanCards';
import clsx from 'clsx';
import { Memberships, PlanDetail } from '../../../server/models/choosePlan';
import {
  CardSelected,
  ChoosePlanList,
  ChoosePlanSelected,
  responseTime,
} from '../../constants';
import { Subsidiaries } from '../../types';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import ProgressBar from '../../components/ProgressBar';

interface ChoosePlanProps {
  choosePlan: Function;
  isFetching: boolean;
  error?: string;
}

const PROGRESS = 72;
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    textAlign: 'center',
    marginTop: '1rem',
    [theme.breakpoints.down('md')]: {
      marginTop: '1.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '1rem',
    },
  },
  subtitle: {
    fontFamily: StyleVariables.fonts.family.body,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.regular,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
    textAlign: 'center',
    marginTop: '12px',
    color: StyleVariables.colors.text.default,
    marginBottom: '2rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '1rem',
      marginRight: '1rem',
    },
  },
  errorMessage: {
    color: StyleVariables.colors.text.critical,
    fontWeight: StyleVariables.fonts.weight.regular,
    lineHeight: StyleVariables.fonts.lineHeight.small,
    textAlign: 'center',
    fontSize: StyleVariables.fonts.size.h5,
    marginTop: '20px',
  },
  cssPage: {
    padding: 0,
    margin: 0,
  },
  scrollablediv: {
    height: 'calc(100vh - 80px)',
    overflow: 'auto',
    scrollbarWidth: 'none',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 120px)',
    },
  },
  stepper: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  cardsContainer: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
  boxContainer: {
    [theme.breakpoints.down('lg')]: {
      marginLeft: '1rem',
      marginRight: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));
export default function ChoosePlanPage(choosePlanProps: ChoosePlanProps) {
  const classes = useStyles();
  const employeeCardValue = useSelector((state: any) => state.employee);
  const companyTypeValue = useSelector((state: any) => state.companyType);
  const subsidiaryListSelector = useSelector((state: any) => state.subsidiary);
  const referralValue = useSelector((state: any) => state.referral);
  const needSupportSelector = useSelector((state: any) => state.needSupport);
  const responseTimeSelector = useSelector((state: any) => state.responseTime);
  const dispatch = useDispatch();
  const choosePlansSelector = useSelector((state: any) => state.choosePlans);
  const [contents, setPlanContent] = React.useState<Array<PlanDetail>>([]);
  const [selected, setSelected] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [selectedPlanText, setSelectedPlanText] = React.useState('');
  const [previousPage, setPreviousPage] = React.useState('needSupport');
  const scProductVersion = referralValue.scProductVersion;
  const subsidiaryList = subsidiaryListSelector.companyList;
  const subsidiaries: Subsidiaries[] =
    subsidiaryListSelector.selected === CardSelected.Yes ? subsidiaryList : [];
  const noOfSubsidiaries = subsidiaries.length;
  useEffect(() => {
    if (needSupportSelector.selected === CardSelected.Yes) {
      const responseTimeValue = responseTimeSelector.selected;
      switch (responseTimeValue) {
        case responseTime.TWO_DAYS:
          setSelected(ChoosePlanSelected.PREMIER);
          setSelectedPlanText(ChoosePlanList[0].label);
          break;
        case responseTime.FIVE_DAYS:
          setSelected(ChoosePlanSelected.ASSISTED);
          setSelectedPlanText(ChoosePlanList[2].label);
          break;
        case responseTime.TEWENTY_DAYS:
          setSelected(ChoosePlanSelected.ASSISTED);
          setSelectedPlanText(ChoosePlanList[2].label);
          break;
        default:
          break;
      }
    }
    if (needSupportSelector.selected === CardSelected.No) {
      const responseTimeValue = responseTimeSelector.selected;
      switch (responseTimeValue) {
        case responseTime.TWO_DAYS:
          setSelected(ChoosePlanSelected.EXPRESS);
          setSelectedPlanText(ChoosePlanList[1].label);
          break;
        case responseTime.FIVE_DAYS:
          setSelected(ChoosePlanSelected.EXPRESS);
          setSelectedPlanText(ChoosePlanList[1].label);
          break;
        case responseTime.TEWENTY_DAYS:
          setSelected(ChoosePlanSelected.STANDARD);
          setSelectedPlanText(ChoosePlanList[3].label);
          break;
        default:
          break;
      }
    }
    if (choosePlansSelector.selected !== undefined) {
      setSelected(choosePlansSelector.selected);
    }
  }, [needSupportSelector, responseTimeSelector]);

  useEffect(() => {
    setLoading(true);
    const choosePlanRequest = {
      scProductVersion: scProductVersion,
      company: {
        noOfEmployees: employeeCardValue.selectedValue,
        noOfSubsidiaries: noOfSubsidiaries,
        subsidiaries: subsidiaries,
        organisationType: companyTypeValue.selectedValue ?? '',
        otherOrganisationType: companyTypeValue.companyType ?? '',
      },
    };
    if (choosePlanRequest) {
      choosePlanProps.choosePlan(choosePlanRequest).then((res) => {
        setLoading(false);
        if (res?.payload?.response?.success) {
          const responsePlan =
            res?.payload?.response?.brands[0]?.memberships ?? [];
          const plansReceived: PlanDetail[] = [];
          responsePlan?.forEach((plan: Memberships) => {
            ChoosePlanList.forEach((value) => {
              if (plan.id === value.id) {
                value.rate = plan.price.value;
                plansReceived.push(value);
              }
            });
          });

          setPlanContent(plansReceived);
          if (plansReceived.length === 1) {
            setPreviousPage('subsidiaryBusiness');
            setSelected(0);
            setSelectedPlanText(plansReceived[0] ? plansReceived[0].label : '');
            dispatch({
              type: 'choosePlan',
              payload: {
                selected: selected,
                selectedValue: plansReceived[0].id,
              },
            });
          }
        } else {
          setPreviousPage('register');
          if (res?.payload?.response?.errors?.length > 0) {
            setErrorMessage(res?.payload?.response?.errors[0]);
          } else {
            setErrorMessage('Unable to get products');
          }
        }
      });
    }
  }, [needSupportSelector, responseTimeSelector]);
  const selectedPlanTextWithoutSpace = selectedPlanText?.replace(/\s/g, '');
  return (
    <Page className={classes.cssPage}>
      {loading ? (
        <Loading />
      ) : (
        <Grid item xs={12} className={classes.scrollablediv}>
          <header>
            <AboutSection progress={PROGRESS} />
          </header>
          <Grid className={classes.stepper}>
            <ProgressBar progress={PROGRESS} />
          </Grid>
          <Typography
            className={clsx(classes.title)}
            variant="h1"
            component="h1"
          >
            Select pricing Plan
          </Typography>
          {errorMessage ? (
            <Typography
              data-testid="choosePlanError"
              className={classes.errorMessage}
            >
              {errorMessage}. Please try again modifying your previous
              responses.
            </Typography>
          ) : (
            <Typography
              className={clsx(classes.subtitle)}
              data-testid={`${selectedPlanTextWithoutSpace}`}
            >
              Based on your responses, it looks like the best Plan for you is
              the <b>{selectedPlanText}</b>.
            </Typography>
          )}
          <Grid container className={clsx(classes.cardsContainer)}>
            <Grid item md={1}></Grid>
            <Grid
              item
              md={10}
              xs={12}
              sm={12}
              className={clsx(classes.boxContainer)}
            >
              <Card
                to="companyDetails"
                from={previousPage}
                text="Continue"
                mobileText="Continue"
                prevText="Previous"
                page="choosePlan"
                contents={contents}
                selectedPlan={selected}
              />
            </Grid>
            <Grid item md={1}></Grid>
          </Grid>
        </Grid>
      )}
    </Page>
  );
}
