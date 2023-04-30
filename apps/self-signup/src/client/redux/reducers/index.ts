import { combineReducers } from 'redux';
import registerReducer from './register-reducer';

export interface TypeAndPayload<PayloadType> {
  type?: string;
  payload?: PayloadType;
}

export default combineReducers({
  register: registerReducer,
  splitTreatments: (state = {}) => state,
});
