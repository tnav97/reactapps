import { Organization } from '../../../common/types';

export interface CurrentOrganizationReducerState {
  currentOrganization?: Organization;
}

export const defaultState: CurrentOrganizationReducerState = {};

export default function currentOrganizationReducer(
  state: CurrentOrganizationReducerState = defaultState
) {
  return state;
}
