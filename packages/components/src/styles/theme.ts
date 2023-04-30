import { DeprecatedThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import variables from './variables';

/**
 * Alcumus theme specifications to implement overrides in your Material UI frontend project
 */
const Breakpoints = createTheme().breakpoints;
export const theme: DeprecatedThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: variables.colors.action.primary.default,
      contrastText: variables.colors.text.secondary,
    },
  },
  typography: {
    h1: {
      [Breakpoints.down('xs')]: {
        fontSize: variables.fonts.mobile.size.h1,
        lineHeight: variables.fonts.mobile.lineHeight.h1,
      },
      fontFamily: variables.fonts.family.heading,
      fontWeight: variables.fonts.weight.medium,
      fontSize: variables.fonts.size.h1,
      lineHeight: variables.fonts.lineHeight.h1,
      letterSpacing: variables.fonts.letterSpacing.h1,
    },
    h2: {
      [Breakpoints.down('xs')]: {
        fontSize: variables.fonts.mobile.size.h2,
        lineHeight: variables.fonts.mobile.lineHeight.h2,
      },
      fontFamily: variables.fonts.family.heading,
      fontWeight: variables.fonts.weight.medium,
      fontSize: variables.fonts.size.h2,
      lineHeight: variables.fonts.lineHeight.h2,
      letterSpacing: variables.fonts.letterSpacing.h2,
    },
    h3: {
      [Breakpoints.down('xs')]: {
        fontSize: variables.fonts.mobile.size.h3,
        lineHeight: variables.fonts.mobile.lineHeight.h3,
      },
      fontFamily: variables.fonts.family.heading,
      fontWeight: variables.fonts.weight.regular,
      fontSize: variables.fonts.size.h3,
      lineHeight: variables.fonts.lineHeight.h3,
      letterSpacing: variables.fonts.letterSpacing.h3,
    },
    h4: {
      [Breakpoints.down('xs')]: {
        fontSize: variables.fonts.mobile.size.h4,
        lineHeight: variables.fonts.mobile.lineHeight.h4,
      },
      fontFamily: variables.fonts.family.heading,
      fontWeight: variables.fonts.weight.regular,
      fontSize: variables.fonts.size.h4,
      lineHeight: variables.fonts.lineHeight.h4,
      letterSpacing: variables.fonts.letterSpacing.h4,
    },
    h5: {
      [Breakpoints.down('xs')]: {
        fontSize: variables.fonts.mobile.size.h5,
        lineHeight: variables.fonts.mobile.lineHeight.h5,
      },
      fontFamily: variables.fonts.family.heading,
      fontWeight: variables.fonts.weight.regular,
      fontSize: variables.fonts.size.h5,
      lineHeight: variables.fonts.lineHeight.h5,
      letterSpacing: variables.fonts.letterSpacing.h5,
    },
    h6: {
      [Breakpoints.down('xs')]: {
        fontSize: variables.fonts.mobile.size.h6,
        lineHeight: variables.fonts.mobile.lineHeight.h6,
      },
      fontFamily: variables.fonts.family.heading,
      fontWeight: variables.fonts.weight.regular,
      fontSize: variables.fonts.size.h6,
      lineHeight: variables.fonts.lineHeight.h6,
      letterSpacing: variables.fonts.letterSpacing.h6,
    },
    overline: {
      fontFamily: variables.fonts.family.heading,
      fontWeight: variables.fonts.weight.medium,
      fontSize: variables.fonts.size.regular,
      lineHeight: variables.fonts.lineHeight.regular,
      textTransform: 'uppercase',
      letterSpacing: variables.fonts.letterSpacing.regular,
    },
    body1: {
      fontFamily: variables.fonts.family.heading,
      fontSize: variables.fonts.size.regular,
      lineHeight: variables.fonts.lineHeight.regular,
      letterSpacing: variables.fonts.letterSpacing.regular,
    },
    body2: {
      fontFamily: variables.fonts.family.heading,
      fontSize: variables.fonts.size.small,
      lineHeight: variables.fonts.lineHeight.small,
      letterSpacing: variables.fonts.letterSpacing.regular,
    },
    subtitle1: {
      fontFamily: variables.fonts.family.heading,
      fontSize: variables.fonts.size.smaller,
      lineHeight: variables.fonts.lineHeight.smaller,
      letterSpacing: variables.fonts.letterSpacing.regular,
    },
    subtitle2: {
      fontFamily: variables.fonts.family.heading,
      fontSize: variables.fonts.size.xs,
      lineHeight: variables.fonts.lineHeight.xs,
      letterSpacing: variables.fonts.letterSpacing.regular,
    },
  },
  overrides: {
    MuiLink: {
      root: {
        fontWeight: variables.fonts.weight.medium,
        color: variables.colors.text.default,
        textDecoration: 'underline',
        cursor: 'pointer',
        '&:hover': {
          color: variables.colors.interactive.default,
        },
      },
      underlineHover: {
        textDecoration: 'underline',
      },
    },
    MuiButton: {
      contained: {
        fontFamily: variables.fonts.family.heading,
      },
      sizeSmall: {
        fontSize: variables.fonts.size.small,
      },
      text: {
        '&:hover': { backgroundColor: variables.colors.action.tertiary.hover },
        '&:active': {
          backgroundColor: variables.colors.action.tertiary.pressed,
        },
        '&:focus': {
          borderColor: variables.colors.border.active,
        },
      },
    },
    MuiSelect: {
      select: {
        fontSize: variables.fonts.size.regular,
        fontFamily: variables.fonts.family.heading,
        '&$disabled': {
          backgroundColor: variables.colors.surface.neutral.disabled,
        },
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: variables.fonts.size.regular,
        fontFamily: variables.fonts.family.heading,
      },
    },
    MuiInputBase: {
      input: {
        fontSize: variables.fonts.size.regular,
        fontFamily: variables.fonts.family.heading,
      },
      root: {
        fontSize: variables.fonts.size.regular,
        color: variables.colors.text.default,
      },
    },
    MuiTableCell: {
      root: {
        fontSize: variables.fonts.size.regular,
        color: variables.colors.text.default,
        padding: variables.spacing(1),
      },
      head: {
        backgroundColor: '#F4F5F6',
        color: variables.colors.text.default,
        fontSize: variables.fonts.size.small,
      },
      body: { color: variables.colors.text.default },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: variables.fonts.size.small,
        backgroundColor: variables.colors.text.default,
      },
    },
  },
};

/**
 * Material UI theme with overrides for Alcumus Style Guide implementation
 */
const AlcumusTheme = createTheme((theme));

export default AlcumusTheme;

export { theme as DeprecatedThemeOptions };
