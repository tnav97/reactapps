import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import { IReduxRootState } from '../../../client/redux/reducers';
import { PrevUrl } from '../../pages/RedirectTo/PrevUrl';

interface MotoProtectedRouteProbs {
  component: Function;
  path?: string | undefined;
  exact?: boolean | undefined;
}

function MotoProtectedRoute({
  component: Component,
  exact,
  path,
  ...props
}: MotoProtectedRouteProbs) {
  const confirmationState = useSelector(
    (state: IReduxRootState) => state.motoPayment
  );
  const redirectBack = (prevpage) => {
    const prevPageLength = Object.keys(prevpage).length;
    const prevPageValues = Object.values(prevpage).indexOf(undefined);
    let redirectD = 0;
    if (prevPageValues > -1) {
      redirectD = 1;
    }
    if (prevPageLength === 0) {
      redirectD = 2;
    }
    return redirectD;
  };
  const companyDetailsSelector = useSelector(
    (state: IReduxRootState) => state.motoCompanyDetails
  );
  const employeeCardValue = useSelector(
    (state: IReduxRootState) => state.motoEmployee
  );
  const companyTypeValue = useSelector(
    (state: IReduxRootState) => state.motoCompanyType
  );
  const choosePlansSelector = useSelector(
    (state: IReduxRootState) => state.motoChoosePlans
  );
  const referralValue = useSelector(
    (state: IReduxRootState) => state.motoReferral
  );
  const responseTimeSelector = useSelector(
    (state: IReduxRootState) => state.motoResponseTime
  );
  const needSupportSelector = useSelector(
    (state: IReduxRootState) => state.motoNeedSupport
  );
  const subsidiaryListSelector = useSelector(
    (state: IReduxRootState) => state.motoSubsidiary
  );
  const createAccountState = useSelector(
    (state: IReduxRootState) => state.motoCreateAccount
  );
  const isRedirect: string = confirmationState.to ?? '/moto';
  const pathArray = path?.split('/');
  const pathName = pathArray?.slice(-1)[0];
  if (pathName === 'referral') {
    const redirectDRef = redirectBack(createAccountState);
    if (redirectDRef === 1) {
      return <Navigate to="/moto" />;
    } else if (redirectDRef === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'employee') {
    const redirectDEmp = redirectBack(referralValue);
    if (redirectDEmp === 1) {
      return <Navigate to="/moto" />;
    } else if (redirectDEmp === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'companyType') {
    const redirectDCT = redirectBack(employeeCardValue);
    if (redirectDCT === 1) {
      return <Navigate to="/moto" />;
    } else if (redirectDCT === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'subsidiaryBusiness') {
    const redirectDSub = redirectBack(companyTypeValue);
    if (redirectDSub === 1) {
      return <Navigate to="/moto" />;
    } else if (redirectDSub === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'responseTime') {
    const redirectDRes = redirectBack(subsidiaryListSelector);
    if (redirectDRes === 1) {
      return <Navigate to="/moto" />;
    } else if (redirectDRes === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'needSupport') {
    const redirectDNeed = redirectBack(responseTimeSelector);
    if (redirectDNeed === 1) {
      return <Navigate to="/moto" />;
    } else if (redirectDNeed === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'choosePlan') {
    const subsidiaryPageLength = Object.keys(subsidiaryListSelector).length;
    const subsidiaryPageValues = Object.values(subsidiaryListSelector).indexOf(
      undefined
    );
    if (subsidiaryPageValues > -1) {
      return <Navigate to="/moto" />;
    } else if (subsidiaryPageLength === 0) {
      return <PrevUrl />;
    } else {
      if (subsidiaryListSelector?.selectedValue === 'Yes') {
        const redirectDS = redirectBack(companyTypeValue);
        if (redirectDS === 1) {
          return <Navigate to="/moto" />;
        } else if (redirectDS === 2) {
          return <PrevUrl />;
        }
      } else {
        const redirectDn = redirectBack(needSupportSelector);
        if (redirectDn === 1) {
          return <Navigate to="/moto" />;
        } else if (redirectDn === 2) {
          return <PrevUrl />;
        }
      }
    }
  }
  if (pathName === 'companyDetails') {
    const redirectDComp = redirectBack(choosePlansSelector);
    if (redirectDComp === 1) {
      return <Navigate to="/moto" />;
    } else if (redirectDComp === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'paymentDetails') {
    const redirectDPay = redirectBack(companyDetailsSelector);
    if (redirectDPay === 1) {
      return <Navigate to="/moto" />;
    } else if (redirectDPay === 2) {
      return <PrevUrl />;
    }
  }

  if (pathName === 'orderConfirmation') {
    const redirectDOrder = redirectBack(confirmationState);
    if (redirectDOrder === 1) {
      return <Navigate to="/moto" />;
    } else if (redirectDOrder === 2) {
      return <PrevUrl />;
    }
  }
  return (
    <Route
      path={path}
      Component={(props) =>
        confirmationState.isRegistered ? (
          <Navigate to={isRedirect} />
        ) : (
          <Component {...props} />
        )
      }
      {...props}
    />
  );
}

export default MotoProtectedRoute;
