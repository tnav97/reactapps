export interface IConfirmationReducerState {
  checkoutSessionId?: string;
}

const defaultState: IConfirmationReducerState = {};

export default function confirmationReducer(
  state: IConfirmationReducerState = defaultState
) {
  return state;
}
