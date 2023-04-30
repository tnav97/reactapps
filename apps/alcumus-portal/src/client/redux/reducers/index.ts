import { combineReducers } from 'redux';
import productsReducer, { ProductsReducerState } from './products';
import authReducer, { AuthReducerState } from './auth';
import userReducer, { UserReducerState } from './user';
import featuresReducer, { FeaturesReducerState } from './features';
import {
  authorizationReducer,
  AuthorizationReducerState,
} from './authorization';
import currentOrganizationReducer, {
  CurrentOrganizationReducerState,
} from './currentOrganization';

export interface TypeAndPayload<PayloadType> {
  type?: string;
  payload?: PayloadType;
}

export interface RootReducerState {
  auth: AuthReducerState;
  authorization: AuthorizationReducerState;
  features: FeaturesReducerState;
  currentOrganization: CurrentOrganizationReducerState;
  products: ProductsReducerState;
  user: UserReducerState;
}

export default combineReducers({
  auth: authReducer,
  authorization: authorizationReducer,
  features: featuresReducer,
  products: productsReducer,
  currentOrganization: currentOrganizationReducer,
  user: userReducer,
});
