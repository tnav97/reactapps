import { combineReducers } from 'redux';
import messageReducer from './message-reducer';
import employeeReducer, { EmployeeReducerStateType } from './employee';
import companyTypeReducer, { CompanyTypeReducerStateType } from './companyType';
import needSupportReducer, { NeedSupportReducerStateType } from './needSupport';
import responseTimeReducer, {
  ResponseTimeReducerStateType,
} from './responseTime';
import subsidiaryListReducer, {
  SubsidiaryListReducerStateType,
} from './subsidiary';
import createAccountReducer, {
  CreateAccountReducerStateType,
} from './createAccount';
import referralCodeReducer, {
  ReferralCodeReducerStateType,
} from './referralCode';
import choosePlanReducer, { ChoosePlanReducerStateType } from './choosePlans';
import paymentDetailsReducer, {
  PaymentDetailsReducerStateType,
} from './paymentDetails';
import companyDetailsReducer, {
  CompanyDetailsReducerStateType,
} from './companyDetails';
import basketReducer from './basket';
import cardReducer from './card';
import motoBasketReducer from './motoBasket';
import motoEmployeeReducer, {
  MotoEmployeeReducerStateType,
} from './motoEmployee';
import motoCompanyTypeReducer, {
  MotoCompanyTypeReducerStateType,
} from './motoCompanyType';
import motoNeedSupportReducer, {
  MotoNeedSupportReducerStateType,
} from './motoNeedSupport';
import motoResponseTimeReducer, {
  MotoResponseTimeReducerStateType,
} from './motoResponseTime';
import motoSubsidiaryListReducer, {
  MotoSubsidiaryListReducerStateType,
} from './motoSubsidiary';
import motoCreateAccountReducer, {
  MotoCreateAccountReducerStateType,
} from './motoCreateAccount';
import motoReferralCodeReducer, {
  MotoReferralCodeReducerStateType,
} from './motoReferralCode';
import motoChoosePlanReducer, {
  MotoChoosePlanReducerStateType,
} from './motoChoosePlans';
import motoPaymentDetailsReducer, {
  MotoPaymentDetailsReducerStateType,
} from './motoPaymentDetails';
import motoCompanyDetailsReducer, {
  MotoCompanyDetailsReducerStateType,
} from './motoCompanyDetails';
import motoCardReducer from './motoCard';
import ssipListReducer, { ssipListReducerStateType } from './ssip';

export interface IReduxRootState {
  subsidiary: SubsidiaryListReducerStateType;
  needSupport: NeedSupportReducerStateType;
  responseTime: ResponseTimeReducerStateType;
  referral: ReferralCodeReducerStateType;
  choosePlans: ChoosePlanReducerStateType;
  companyType: CompanyTypeReducerStateType;
  employee: EmployeeReducerStateType;
  companyDetails: CompanyDetailsReducerStateType;
  createAccount: CreateAccountReducerStateType;
  payment: PaymentDetailsReducerStateType;
  ssip: ssipListReducerStateType;
  motoSubsidiary: MotoSubsidiaryListReducerStateType;
  motoNeedSupport: MotoNeedSupportReducerStateType;
  motoResponseTime: MotoResponseTimeReducerStateType;
  motoReferral: MotoReferralCodeReducerStateType;
  motoChoosePlans: MotoChoosePlanReducerStateType;
  motoCompanyType: MotoCompanyTypeReducerStateType;
  motoEmployee: MotoEmployeeReducerStateType;
  motoCompanyDetails: MotoCompanyDetailsReducerStateType;
  motoCreateAccount: MotoCreateAccountReducerStateType;
  motoPayment: MotoPaymentDetailsReducerStateType;
}

export interface TypeAndPayload<PayloadType> {
  type?: string;
  payload?: PayloadType;
}
export default combineReducers({
  message: messageReducer,
  employee: employeeReducer,
  companyType: companyTypeReducer,
  needSupport: needSupportReducer,
  responseTime: responseTimeReducer,
  subsidiary: subsidiaryListReducer,
  createAccount: createAccountReducer,
  referral: referralCodeReducer,
  choosePlans: choosePlanReducer,
  payment: paymentDetailsReducer,
  companyDetails: companyDetailsReducer,
  card: cardReducer,
  basket: basketReducer,
  ssip: ssipListReducer,
  motoEmployee: motoEmployeeReducer,
  motoCompanyType: motoCompanyTypeReducer,
  motoNeedSupport: motoNeedSupportReducer,
  motoResponseTime: motoResponseTimeReducer,
  motoSubsidiary: motoSubsidiaryListReducer,
  motoCreateAccount: motoCreateAccountReducer,
  motoReferral: motoReferralCodeReducer,
  motoChoosePlans: motoChoosePlanReducer,
  motoPayment: motoPaymentDetailsReducer,
  motoCompanyDetails: motoCompanyDetailsReducer,
  motoCard: motoCardReducer,
  motoBasket: motoBasketReducer,
});
