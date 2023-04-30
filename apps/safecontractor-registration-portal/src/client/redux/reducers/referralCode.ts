import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface ReferralCodeReducerStateType {
  ReferralCode?: number;
  referralcode_value?: string;
  scProductVersion?: string;
  companyDetails_value?: string;
}

export const defaultState: ReferralCodeReducerStateType = {
  ReferralCode: undefined,
  referralcode_value: undefined,
  scProductVersion: undefined,
  companyDetails_value: undefined,
};

export default function ReferralCodeReducer(
  state: ReferralCodeReducerStateType = defaultState,
  action: TypeAndPayload<ReferralCodeReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.Referral.referral:
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
