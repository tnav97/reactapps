import React from 'react';

type TranslateReadyProps = {
  tReady: boolean;
  children: React.ReactNode;
};

export const TranslateReady = ({ tReady, children }: TranslateReadyProps) =>
  !tReady ? <></> : <>{children}</>;
