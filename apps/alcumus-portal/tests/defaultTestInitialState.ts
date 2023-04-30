import { RootReducerState } from '../src/client/redux/reducers';

export const defaultTestInitialState: RootReducerState = {
  auth: {
    isRegistering: false,
    registered: false,
    registrationError: undefined,
  },
  user: {
    isFetching: false,
  },
  products: { products: [] },
  features: {},
  authorization: {
    roles: [],
  },
  currentOrganization: {
    currentOrganization: undefined,
  },
};
