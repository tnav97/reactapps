import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface MotoReferralCodeReducerStateType {
  ReferralCode?: number;
  referralcode_value?: string;
  scProductVersion?: string;
  companyDetails_value?: string;
}

export const defaultState: MotoReferralCodeReducerStateType = {
  ReferralCode: undefined,
  referralcode_value: undefined,
  scProductVersion: undefined,
  companyDetails_value: undefined,
};

export default function motoReferralCodeReducer(
  state: MotoReferralCodeReducerStateType = defaultState,
  action: TypeAndPayload<MotoReferralCodeReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.MotoReferral.referral:
      return {
        ...state,
        ReferralCode: payload?.ReferralCode,
        referralcode_value: payload?.referralcode_value,
        scProductVersion: payload?.scProductVersion,
        companyDetails_value: payload?.companyDetails_value,
      };
    default:
      return state;
  }
}
