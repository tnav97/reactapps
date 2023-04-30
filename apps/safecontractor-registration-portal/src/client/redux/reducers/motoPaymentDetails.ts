import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface MotoPaymentDetailsReducerStateType {
  contractorId?: number;
  membershipId?: string;
  cartIdExist?: boolean;
  isRegistered?: boolean;
  to?: string;
  PaymentCard?: string;
  paymentCard_value?: string;
  register_request?: string;
  paymentDetails?: string;
}

export const defaultState: MotoPaymentDetailsReducerStateType = {
  contractorId: undefined,
  membershipId: undefined,
  cartIdExist: undefined,
  isRegistered: undefined,
  to: undefined,
  PaymentCard: undefined,
  paymentCard_value: undefined,
  register_request: undefined,
  paymentDetails: undefined,
};

export default function motoPaymentDetailsReducer(
  state: MotoPaymentDetailsReducerStateType = defaultState,
  action: TypeAndPayload<MotoPaymentDetailsReducerStateType> = {
    type: undefined,
  }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.MotoPaymentDetails.paymentDetails:
      return {
        ...state,
        PaymentCard: payload?.PaymentCard,
        paymentCard_value: payload?.paymentCard_value,
      };
    case Actions.MotoPaymentDetails.FetchDataCompleted: {
      return {
        ...state,
        register_request: payload?.register_request,
      };
    }
    case Actions.MotoPaymentDetails.registerDetails: {
      return {
        ...state,
        contractorId: payload?.contractorId,
        membershipId: payload?.membershipId,
        cartIdExist: payload?.cartIdExist,
        isRegistered: payload?.isRegistered,
        to: payload?.to,
      };
    }
    default:
      return state;
  }
}
