import { RSAA } from 'redux-api-middleware';
import {
  ChoosePlanRequest,
  RegisterRequest,
  BasketRequest,
  AddressRequest,
} from '../../common/types';
import { UpdateRegistrationPaymentRequest } from '../../server/models/updateRegistrationPayment';
import serialize from 'serialize-javascript';
export const Actions = {
  RegisterSetData: 'RegisterSetData',
  QuestionnaireStart: 'QuestionnaireStart',
  QuestionnaireSetData: 'QuestionnaireSetData',

  Message: {
    FetchDataPending: 'FetchDataPending',
    FetchDataCompleted: 'FetchDataCompleted',
    FetchDataFailed: 'FetchDataFailed',
  },
  ReferralCode: {
    FetchDataPending: 'FetchDataPending',
    FetchDataCompleted: 'FetchDataCompleted',
    FetchDataFailed: 'FetchDataFailed',
  },
  StatusHealth: {
    FetchDataPending: 'FetchDataPending',
    FetchDataCompleted: 'FetchDataCompleted',
    FetchDataFailed: 'FetchDataFailed',
  },
  ssipData: {
    FetchDataPending: 'FetchDataPending',
    FetchDataCompleted: 'FetchDataCompleted',
    FetchDataFailed: 'FetchDataFailed',
  },
  ChoosePlan: {
    FetchDataPending: 'FetchDataPending',
    FetchDataCompleted: 'FetchDataCompleted',
    FetchDataFailed: 'FetchDataFailed',
  },
  PaymentDetails: {
    paymentDetails: 'paymentDetails',
    registerDetails: 'registerDetails',
    FetchDataCompleted: 'FetchDataCompleted',
    paymentData: 'paymentData',
  },
  Registration: {
    FetchDataPending: 'FetchDataPending',
    FetchDataCompleted: 'FetchDataCompleted',
    FetchDataFailed: 'FetchDataFailed',
  },
  updateRegistration: {
    FetchDataPending: 'FetchDataPending',
    FetchDataCompleted: 'FetchDataCompleted',
    FetchDataFailed: 'FetchDataFailed',
  },
  Basket: {
    FetchDataPending: 'FetchDataPending',
    FetchDataCompleted: 'FetchDataCompleted',
    FetchDataFailed: 'FetchDataFailed',
  },
  postAddressLookup: {
    FetchDataPending: 'FetchDataPending',
    FetchDataCompleted: 'FetchDataCompleted',
    FetchDataFailed: 'FetchDataFailed',
  },
  getAddressLookup: {
    FetchDataPending: 'FetchDataPending',
    FetchDataCompleted: 'FetchDataCompleted',
    FetchDataFailed: 'FetchDataFailed',
  },
  BasketDetails: {
    basketDetails: 'basketDetails',
  },
  Card: {
    card: 'card',
  },
  Employee: {
    employee: 'employee',
  },
  CreateAccount: {
    createAccount: 'createAccount',
  },
  CompanyType: {
    companyType: 'companyType',
  },
  NeedSupport: {
    support: 'support',
  },
  ResponseTime: {
    responseTime: 'responseTime',
  },
  Subsidiary: {
    subsidiary: 'subsidiary',
  },
  SSIP: {
    ssip: 'SSIPQuestion',
    ssipInfo: 'ssipInfo',
  },
  Referral: {
    referral: 'referral',
  },
  ChoosePlans: {
    choosePlan: 'choosePlan',
  },
  CompanyDetails: {
    companyDetails: 'companyDetails',
  },
  MotoEmployee: {
    employee: 'motoEmployee',
  },
  MotoCreateAccount: {
    createAccount: 'motoCreateAccount',
  },
  MotoCompanyType: {
    companyType: 'motoCompanyType',
  },
  MotoNeedSupport: {
    support: 'motoSupport',
  },
  MotoResponseTime: {
    responseTime: 'motoResponseTime',
  },
  MotoSubsidiary: {
    subsidiary: 'motoSubsidiary',
  },
  MotoReferral: {
    referral: 'motoReferral',
  },
  MotoChoosePlans: {
    choosePlan: 'motoChoosePlan',
  },
  MotoCompanyDetails: {
    companyDetails: 'motoCompanyDetails',
  },
  MotoBasketDetails: {
    basketDetails: 'motoBasketDetails',
  },
  MotoCard: {
    card: 'motoCard',
  },
  MotoPaymentDetails: {
    paymentDetails: 'motoPaymentDetails',
    registerDetails: 'motoRegisterDetails',
    FetchDataCompleted: 'motoFetchDataCompleted',
  },
};

export interface RsaaRequestBody {
  endpoint: string;
  body?: object;
  method?: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE' | 'HEAD';
  types?: Array<string> | Array<{ type: string; meta?: object }>;
  type?: string;
  headers?: Object;
}

export function generateRequest({
  body,
  headers,
  endpoint,
  ...options
}: RsaaRequestBody) {
  return {
    [RSAA]: {
      endpoint,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body && serialize(body),
      ...options,
    },
  };
}

export const getMessageFromApi = () =>
  generateRequest({
    endpoint: '/api/message',
    types: [
      Actions.Message.FetchDataPending,
      Actions.Message.FetchDataCompleted,
      Actions.Message.FetchDataFailed,
    ],
  });

export const validateReferralCode = (code: string) =>
  generateRequest({
    endpoint: `/api/client-referral?code=${code}`,
    method: 'GET',
    types: [
      Actions.ReferralCode.FetchDataPending,
      Actions.ReferralCode.FetchDataCompleted,
      Actions.ReferralCode.FetchDataFailed,
    ],
  });

export const validateStatusHealth = () =>
  generateRequest({
    endpoint: '/api/status',
    method: 'GET',
    types: [
      Actions.StatusHealth.FetchDataPending,
      Actions.StatusHealth.FetchDataCompleted,
      Actions.StatusHealth.FetchDataFailed,
    ],
  });

export const getSsipData = () =>
  generateRequest({
    endpoint: '/api/ssipData',
    method: 'GET',
    types: [
      Actions.ssipData.FetchDataPending,
      Actions.ssipData.FetchDataCompleted,
      Actions.ssipData.FetchDataFailed,
    ],
  });

export const choosePlan = (request: ChoosePlanRequest) =>
  generateRequest({
    body: request,
    endpoint: '/api/product',
    method: 'POST',
    types: [
      Actions.ChoosePlan.FetchDataPending,
      Actions.ChoosePlan.FetchDataCompleted,
      Actions.ChoosePlan.FetchDataFailed,
    ],
  });

export const register = (request: RegisterRequest) =>
  generateRequest({
    body: request,
    endpoint: '/api/register',
    method: 'POST',
    types: [
      Actions.Registration.FetchDataPending,
      Actions.Registration.FetchDataCompleted,
      Actions.Registration.FetchDataFailed,
    ],
  });

export const updateRegistrationPayment = (
  request: UpdateRegistrationPaymentRequest
) =>
  generateRequest({
    body: request,
    endpoint: '/api/updateRegisterPayment',
    method: 'POST',
    types: [
      Actions.updateRegistration.FetchDataPending,
      Actions.updateRegistration.FetchDataCompleted,
      Actions.updateRegistration.FetchDataFailed,
    ],
  });

export const postAddressLookup = (request: AddressRequest) =>
  generateRequest({
    body: request,
    endpoint: '/api/postAddress',
    method: 'POST',
    types: [
      Actions.postAddressLookup.FetchDataPending,
      Actions.postAddressLookup.FetchDataCompleted,
      Actions.postAddressLookup.FetchDataFailed,
    ],
  });

export const findAddressLookup = (code: string) =>
  generateRequest({
    endpoint: `/api/getAddress?code=${code}`,
    method: 'GET',
    types: [
      Actions.getAddressLookup.FetchDataPending,
      Actions.getAddressLookup.FetchDataCompleted,
      Actions.getAddressLookup.FetchDataFailed,
    ],
  });

export const basketCode = (request: BasketRequest) =>
  generateRequest({
    body: request,
    endpoint: '/api/basket',
    method: 'POST',
    types: [
      Actions.Basket.FetchDataPending,
      Actions.Basket.FetchDataCompleted,
      Actions.Basket.FetchDataFailed,
    ],
  });
