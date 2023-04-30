import React from 'react';
import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PrivateRoute from './components/PrivateRoute';
import MotoProtectedRoute from './components/MotoProtectedRoute';
import MotoPrivateRoute from './components/MotoPrivateRoute';
import { NotFound } from './pages/Errors/NotFound';

export default function ProtectedRouter() {
  return (
    <Routes>
      <ProtectedRoute
        exact
        path="/"
        component={loadable(() => import('./pages/HomePage'))}
      />
      <ProtectedRoute
        exact
        path="/register"
        component={loadable(() => import('./pages/CreateAccountPage'))}
      />
      <ProtectedRoute
        exact
        path="/questionnaire"
        component={loadable(() => import('./pages/Questionnaire'))}
      />
      <ProtectedRoute
        path="/SSIPQuestion"
        exact
        component={loadable(() => import('./pages/SsipRegistration'))}
      />
      <ProtectedRoute
        path="/referral"
        exact
        component={loadable(() => import('./pages/ReferralCode'))}
      />
      <ProtectedRoute
        path="/subsidiaryBusiness"
        exact
        component={loadable(() => import('./pages/SubsidiaryBusiness'))}
      />
      <ProtectedRoute
        path="/responseTime"
        exact
        component={loadable(() => import('./pages/ResponseTime'))}
      />
      <ProtectedRoute
        path="/employee"
        exact
        component={loadable(() => import('./pages/Employee'))}
      />
      <ProtectedRoute
        path="/companyType"
        exact
        component={loadable(() => import('./pages/CompanyType'))}
      />
      <ProtectedRoute
        path="/companyDetails"
        exact
        component={loadable(() => import('./pages/CompanyDetails'))}
      />
      <ProtectedRoute
        path="/paymentDetails"
        exact
        component={loadable(() => import('./pages/PaymentDetails'))}
      />
      <ProtectedRoute
        path="/choosePlan"
        exact
        component={loadable(() => import('./pages/ChoosePlan'))}
      />
      <ProtectedRoute
        path="/needSupport"
        exact
        component={loadable(
          () => import('./pages/DoesCustomerRequireSupportForAssessment')
        )}
      />
      <Route
        path="/orderConfirmation"
        Component={loadable(() => import('./pages/OrderConfirmation'))}
      />
      <PrivateRoute
        path="/registrationComplete"
        component={loadable(() => import('./pages/RegistrationComplete'))}
      />
      <Route
        path="/status"
        Component={loadable(() => import('./pages/Status'))}
      />
      <Route
        path="/termsofservice"
        Component={loadable(() => import('./pages/TermsAndConditions'))}
      />
      <MotoProtectedRoute
        exact
        path="/moto"
        component={loadable(() => import('./pages/MotoHomePage'))}
      />
      <MotoProtectedRoute
        exact
        path="/moto/register"
        component={loadable(() => import('./pages/MotoCreateAccountPage'))}
      />
      <MotoProtectedRoute
        exact
        path="/moto/questionnaire"
        component={loadable(() => import('./pages/MotoQuestionnaire'))}
      />
      <MotoProtectedRoute
        path="/moto/referral"
        exact
        component={loadable(() => import('./pages/MotoReferralCode'))}
      />
      <MotoProtectedRoute
        path="/moto/subsidiaryBusiness"
        exact
        component={loadable(() => import('./pages/MotoSubsidiaryBusiness'))}
      />
      <MotoProtectedRoute
        path="/moto/responseTime"
        exact
        component={loadable(() => import('./pages/MotoResponseTime'))}
      />
      <MotoProtectedRoute
        path="/moto/employee"
        exact
        component={loadable(() => import('./pages/MotoEmployee'))}
      />
      <MotoProtectedRoute
        path="/moto/companyType"
        exact
        component={loadable(() => import('./pages/MotoCompanyType'))}
      />
      <MotoProtectedRoute
        path="/moto/companyDetails"
        exact
        component={loadable(() => import('./pages/MotoCompanyDetails'))}
      />
      <MotoProtectedRoute
        path="/moto/paymentDetails"
        exact
        component={loadable(() => import('./pages/MotoPaymentDetails'))}
      />
      <MotoProtectedRoute
        path="/moto/choosePlan"
        exact
        component={loadable(() => import('./pages/MotoChoosePlan'))}
      />
      <MotoProtectedRoute
        path="/moto/needSupport"
        exact
        component={loadable(
          () => import('./pages/MotoDoesCustomerRequireSupportForAssessment')
        )}
      />
      <Route
        path="/moto/orderConfirmation"
        Component={loadable(() => import('./pages/MotoOrderConfirmation'))}
      />
      <MotoPrivateRoute
        path="/moto/registrationComplete"
        component={loadable(() => import('./pages/MotoRegistrationComplete'))}
      />
      <Route>
        <NotFound />
      </Route>
    </Routes>
  );
}
