import React from 'react';
import { createTheme, Typography } from '@mui/material';
import Page from './Page';
import variables from '../../styles/variables';

export default {
  title: 'Utility Components/Page',
  component: Page,
};

export const withDefaultTheme = () => (
  <Page>
    <Typography variant="h1" color="primary">
      Page Component
    </Typography>
    <br />
    <br />
    <Typography component="p" variant="subtitle2" color="secondary">
      This story shows you example of the page component rendered with default
      Alcumus theme
    </Typography>
  </Page>
);

export const withCustomTheme = () => (
  <Page
    theme={createTheme(({
      palette: {
        mode: 'light',
        primary: {
          main: '#000',
          contrastText: '#ddd',
        },
        secondary: {
          main: '#333',
          contrastText: '#494949',
        },
      },
      typography: {
        h1: {
          fontFamily: variables.fonts.family.body,
          fontSize: '52px',
        },
        h2: {
          fontFamily: variables.fonts.family.body,
        },
        h3: {
          fontFamily: variables.fonts.family.body,
        },
        h4: {
          fontFamily: variables.fonts.family.body,
        },
        h5: {
          fontFamily: variables.fonts.family.body,
        },
        h6: {
          fontFamily: variables.fonts.family.body,
        },
        overline: {
          fontFamily: variables.fonts.family.body,
        },
        body1: {
          fontFamily: variables.fonts.family.body,
        },
        body2: {
          fontFamily: variables.fonts.family.body,
        },
        subtitle1: {
          fontFamily: variables.fonts.family.body,
        },
        subtitle2: {
          fontFamily: variables.fonts.family.body,
        },
      },
    }))}
  >
    <Typography variant="h1" color="secondary">
      Page Component
    </Typography>
    <br />
    <br />
    <Typography variant="subtitle2" color="primary">
      This story shows you example of the page component rendered with a custom
      theme
    </Typography>
  </Page>
);
