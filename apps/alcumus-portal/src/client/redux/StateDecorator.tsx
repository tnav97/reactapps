import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { RootReducerState } from './reducers';

interface StateDecoratorProps {
  initialState?: RootReducerState;
  children?: React.ReactNode;
}

export default function StateDecorator({
  initialState,
  children,
}: StateDecoratorProps): JSX.Element {
  const store = configureStore(initialState);

  return <Provider store={store}>{children}</Provider>;
}
