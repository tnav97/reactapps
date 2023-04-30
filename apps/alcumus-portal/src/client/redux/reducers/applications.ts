import { TypeAndPayload } from '.';
import { Application } from '../../../common/types';
import { Actions } from '../actions';

export interface HomePageAppsReducerState {
  applications: Application[];
  isFetching: boolean;
  error?: string;
  isCompleted: boolean;
}

type MessagePayload = {
  message: string;
  applications: Application[];
};

export const defaultState: HomePageAppsReducerState = {
  applications: [],
  isFetching: false,
  error: undefined,
  isCompleted: false,
};

export default function homePageAppsReducer(
  state: HomePageAppsReducerState = defaultState,
  action: TypeAndPayload<MessagePayload> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.Applications.FetchApplicationsPending:
      return {
        ...state,
        isFetching: true,
      };

    case Actions.Applications.FetchApplicationsCompleted:
      return {
        ...state,
        applications: payload?.applications,
        isFetching: false,
        isCompleted: true,
      };
    case Actions.Applications.FetchApplicationsFailed:
      return {
        ...state,
        isFetching: false,
        error: 'we ran into an error',
      };

    default:
      return state;
  }
}
