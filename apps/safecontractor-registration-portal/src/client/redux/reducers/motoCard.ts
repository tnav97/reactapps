import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface CardReducerStateType {
  choosePlan_rate?: number;
}

export const defaultState: CardReducerStateType = {
  choosePlan_rate: undefined,
};

export default function motoCardReducer(
  state: CardReducerStateType = defaultState,
  action: TypeAndPayload<CardReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.MotoCard.card:
      return {
        ...state,
        choosePlan_rate: payload?.choosePlan_rate,
      };
    default:
      return state;
  }
}
