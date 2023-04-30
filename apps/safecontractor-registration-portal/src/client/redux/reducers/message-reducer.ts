import { TypeAndPayload } from './index';
import { Actions } from '../actions';

type MessagePayload = {
  message: string;
};

export interface MessageReducerStateType {
  isFetching: boolean;
  error?: string;
  data?: string;
}

export const defaultState: MessageReducerStateType = {
  isFetching: false,
  error: undefined,
  data: undefined,
};

export default function testReducer(
  state: MessageReducerStateType = defaultState,
  action: TypeAndPayload<MessagePayload> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.Message.FetchDataPending:
      return {
        ...state,
        isFetching: true,
        error: undefined,
      };

    case Actions.Message.FetchDataCompleted:
      return {
        ...state,
        isFetching: false,
        data: payload?.message,
      };

    case Actions.Message.FetchDataFailed:
      return {
        ...state,
        isFetching: false,
        error: 'There was an error retrieving data, please try again',
      };

    default:
      return state;
  }
}
