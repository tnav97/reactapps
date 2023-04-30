import { alpha } from '@mui/material';

const disabledAlphaValue = 0.3;

const defaultLetterSpacing = '0.0005em';

interface BaseColors {
  background: string;
  text: string;
  primary: string;
  white: string;
  interactive: string;
  critical: string;
  success: string;
  warning: string;
  info: string;
  selection: string;
}

const baseColors: BaseColors = {
  background: '#F7F7F7',
  text: '#333333',
  primary: '#006CB5',
  white: '#FFFFFF',
  interactive: '#158BD1',
  critical: '#C50000',
  success: '#3F8627',
  warning: '#F2683A',
  info: '#137FAA',
  selection: '#158BD126',
};

interface ActionColors {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

interface TextColors {
  default: string;
  secondary: string;
  subdued: string;
  disabled: string;
  critical: string;
  success: string;
  warning: string;
  info: string;
  link: string;
}

interface InteractiveColors {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

interface IconColors {
  default: string;
  secondary: string;
  onAccent: string;
  critical: string;
  success: string;
  warning: string;
  info: string;
  disabled: string;
  warningSecondary: string;
}

interface BorderColors {
  default: string;
  hover: string;
  active: string;
  critical: string;
}

interface SurfaceColor {
  neutral: InteractiveColors & {
    selected: string;
  };
  default: string;
  hover: string;
  selected: string;
  critical: string;
  warning: string;
  warningSecondary: string;
  success: string;
  highlight: string;
}

interface FontHeadings {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
}
interface FontVariations extends FontHeadings {
  regular: string;
  small: string;
  smaller: string;
  xs: string;
}

interface AlertColors {
  success: string;
}

const alertColors: AlertColors = {
  success: '#EDFFEE',
};
export interface StyleVariablesSchema {
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  colors: {
    /**
     * @deprecated
     */
    grey: string;
    /**
     * @deprecated
     */
    black: string;
    /**
     * @deprecated
     */
    white: string;
    /**
     * @deprecated
     */
    boxShadowGrey: string;
    /**
     * @deprecated
     */
    grey1: string;
    /**
     * @deprecated
     */
    grey2: string;
    /**
     * @deprecated
     */
    grey4: string;
    /**
     * @deprecated
     */
    grey5: string;

    /**
     * The following color organization comes from our styleguide,
     * and we've tried to maintain a 1-to-1 mapping with the spec.
     *
     * https://www.figma.com/file/T0kwdK4X7eJ9Qvm3vPnSCr/Foundations?node-id=1%3A455
     */
    base: BaseColors;
    text: TextColors;
    icon: IconColors;
    border: BorderColors;
    interactive: InteractiveColors;
    surface: SurfaceColor;
    action: {
      primary: ActionColors;
      secondary: ActionColors;
      tertiary: ActionColors;
      critical: ActionColors;
    };
    background: {
      default: string;
      primary: string;
    };
    alert: {
      success: string;
    };
  };
  fonts: {
    family: {
      heading: string;
      body: string;
    };
    weight: {
      regular: number;
      medium: number;
      semiBold: number;
      bold: number;
    };
    size: FontVariations;
    lineHeight: FontVariations;
    letterSpacing: FontVariations;
    mobile: {
      size: FontHeadings;
      lineHeight: FontHeadings;
    };
  };
  spacing: (x: number) => string;
}

/**
 * Variables to carry Alcumus Style Guide specifications into your frontend project styles
 *
 * References:
 * Style Guide: https://www.figma.com/file/T0kwdK4X7eJ9Qvm3vPnSCr/Styleguide?node-id=0%3A1
 * Alcumus Portal (colors): https://xd.adobe.com/view/0299ee69-1125-47ac-b851-b8da4051fc87-57ca/screen/4bc88697-7247-4b3f-a670-19a6cb1923ba/variables/
 */
const styleVariables: StyleVariablesSchema = {
  breakpoints: {
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
  },
  colors: {
    grey: '#EEECE8',
    black: '#000000',
    white: '#FFFFFF',
    boxShadowGrey: 'rgba(0, 0, 0, 0.16)',
    grey1: '#F4F5F6',
    grey2: '#E9E9EB',
    grey4: '#7D7D7D',
    grey5: '#545353',
    base: baseColors,
    background: {
      default: baseColors.background,
      primary: baseColors.selection,
    },
    text: {
      info: baseColors.info,
      critical: baseColors.critical,
      warning: baseColors.warning,
      success: baseColors.success,
      default: baseColors.text,
      secondary: baseColors.white,
      subdued: '#7D7D7D',
      disabled: '#8C8C97',
      link: baseColors.interactive,
    },
    icon: {
      default: '#6D7685',
      secondary: '#333333',
      disabled: '#D8D8D8',
      onAccent: baseColors.white,
      critical: baseColors.critical,
      info: baseColors.info,
      success: baseColors.success,
      warning: baseColors.warning,
      warningSecondary: '#846C23',
    },
    border: {
      default: '#CCCCCC',
      hover: '#545353',
      active: baseColors.interactive,
      critical: baseColors.critical,
    },
    interactive: {
      default: baseColors.interactive,
      hover: '#10689D',
      pressed: '#0D537D',
      disabled: alpha(baseColors.interactive, disabledAlphaValue),
    },
    surface: {
      neutral: {
        default: '#E7E7E7',
        hover: '#ADADAD',
        pressed: '#8B8B8B',
        disabled: '#EBEDEF',
        selected: '#EAF0FD',
      },
      default: baseColors.white,
      selected: '#EAF0FD',
      hover: '#E9E9EB',
      critical: '#FFCECE',
      warning: '#FFDFBB',
      warningSecondary: '#FFF3CA',
      success: '#DBF3D0',
      highlight: '#D4F3FE',
    },
    action: {
      primary: {
        default: baseColors.primary,
        hover: '#005188',
        pressed: '#00416D',
        disabled: alpha(baseColors.primary, disabledAlphaValue),
      },
      secondary: {
        default: baseColors.white,
        hover: '#E9E9EB',
        pressed: '#D2D2D3',
        disabled: baseColors.white,
      },
      tertiary: {
        default: '#E5E5E5',
        hover: '#E9E9EB',
        pressed: '#D2D2D3',
        disabled: alpha(baseColors.white, disabledAlphaValue),
      },
      critical: {
        default: baseColors.critical,
        hover: '#930000',
        pressed: '#760000',
        disabled: alpha(baseColors.critical, disabledAlphaValue),
      },
    },
    alert: {
      success: alertColors.success,
    },
  },
  fonts: {
    family: {
      /**
       * This specific font family selection comes from:
       * https://www.figma.com/file/T0kwdK4X7eJ9Qvm3vPnSCr/Foundations?node-id=1%3A86
       *
       * https://css-tricks.com/snippets/css/system-font-stack/ : This guide was followed for using system fonts
       *
       * Todo: remove different heading / body fonts because they're effectively the same
       */
      heading:
        '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Arial, sans-serif',
      body: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Arial, sans-serif',
    },
    weight: {
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
    size: {
      regular: '1rem',
      small: '0.875rem',
      smaller: '0.875rem',
      xs: '0.75rem',
      h1: '3rem',
      h2: '2.375rem',
      h3: '1.875rem',
      h4: '1.5rem',
      h5: '1.25rem',
      h6: '1rem',
    },
    letterSpacing: {
      regular: defaultLetterSpacing,
      small: defaultLetterSpacing,
      smaller: defaultLetterSpacing,
      xs: defaultLetterSpacing,
      h1: defaultLetterSpacing,
      h2: defaultLetterSpacing,
      h3: defaultLetterSpacing,
      h4: defaultLetterSpacing,
      h5: defaultLetterSpacing,
      h6: defaultLetterSpacing,
    },
    lineHeight: {
      regular: '24px',
      small: '20px',
      smaller: '20px',
      xs: '18px',
      h1: '60px',
      h2: '48px',
      h3: '38px',
      h4: '30px',
      h5: '24px',
      h6: '20px',
    },
    mobile: {
      size: {
        h1: '2rem',
        h2: '1.625rem',
        h3: '1.25rem',
        h4: '1.125rem',
        h5: '1rem',
        h6: '0.875rem',
      },
      lineHeight: {
        h1: '40px',
        h2: '32px',
        h3: '24px',
        h4: '24px',
        h5: '20px',
        h6: '18px',
      },
    },
  },
  spacing: (multiple = 1) => `${Math.floor(multiple * 8)}px`,
};

export default styleVariables;
