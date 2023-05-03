import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface PaymentDetailsReducerStateType {
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

export const defaultState: PaymentDetailsReducerStateType = {
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

export default function PaymentDetailsReducer(
  state: PaymentDetailsReducerStateType = defaultState,
  action: TypeAndPayload<PaymentDetailsReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.PaymentDetails.paymentDetails:
      return {
        ...state,
        PaymentCard: payload?.PaymentCard,
        paymentCard_value: payload?.paymentCard_value,
      };
    case Actions.PaymentDetails.FetchDataCompleted: {
      return {
        ...state,
        register_request: payload?.register_request,
      };
    }
    case Actions.PaymentDetails.registerDetails: {
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
