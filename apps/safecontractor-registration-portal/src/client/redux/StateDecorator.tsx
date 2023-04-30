import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { PersistGate } from 'redux-persist/integration/react';

interface StateDecoratorProps {
  children?: React.ReactNode;
}

export default function StateDecorator({
  children,
}: StateDecoratorProps): JSX.Element {
  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
