import React, { createContext, useContext, useState } from 'react';
import { AlertSeverity, AlertSnackbar } from '@alcumus/components';

export interface IToastMessage {
  message: string;
  severity: AlertSeverity;
}

export interface IToastContext {
  toast?: IToastMessage;
  setToast: (IToastMessage) => void;
}

export const ToastContext = createContext<IToastContext>({
  setToast() {
    throw new Error(
      'ToastContext: setToast used outside of ToastContextProvider. Please wrap your component in ToastContextProvider.'
    );
  },
});

export function ToastContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState<IToastMessage>();

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
      <ToastRenderer />
    </ToastContext.Provider>
  );
}

export function ToastRenderer() {
  const { toast, setToast } = useContext(ToastContext);

  if (!toast) {
    return <></>;
  }

  return (
    <AlertSnackbar
      autoHideDuration={toast.severity === 'success' ? 3000 : null}
      open={true}
      message={toast.message}
      severity={toast.severity}
      onClose={() => setToast && setToast(undefined)}
    />
  );
}
