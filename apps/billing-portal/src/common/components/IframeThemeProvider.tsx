import React, { ReactChild, ReactFragment, ReactPortal } from 'react';
import ThemeProvider from '@mui/styles/ThemeProvider';
import { createTheme, CssBaseline, Theme } from '@mui/material';
import { AlcumusTheme } from '@alcumus/components';

interface IframeThemeProviderProps {
  children: boolean | ReactChild | ReactFragment | ReactPortal;
}

export default function IframeThemeProvider({
  children,
}: IframeThemeProviderProps): JSX.Element {
  const themeWithTransparentBg: Theme = createTheme(AlcumusTheme, {
    palette: { background: { default: 'transparent' } },
  });

  return (
    <ThemeProvider theme={themeWithTransparentBg}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
