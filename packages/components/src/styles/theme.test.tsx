import React from 'react';
import { render } from '@testing-library/react';
import ThemeProvider from '@mui/styles/ThemeProvider';
import Typography from '@mui/material/Typography';
import AlcumusTheme from './theme';
import { StyledEngineProvider } from '@mui/material';

describe('theme', () => {
  test('it provides Alcumus theme correctly', () => {
    const { container } = render(
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={AlcumusTheme}>
          <Typography variant="h1">Hello World</Typography>
        </ThemeProvider>
      </StyledEngineProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
