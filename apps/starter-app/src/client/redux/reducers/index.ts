import { combineReducers } from 'redux';
import messageReducer from './message-reducer';

export interface TypeAndPayload<PayloadType> {
  type?: string;
  payload?: PayloadType;
}

export default combineReducers({
  message: messageReducer,
});
