import { CSSProperties } from 'react';

export const ECMSTheme = {
  colors: {
    white: '#FFFFFF',
    brandDanger: '#EC6459',
    primaryBlue: '#007cf5',
    primaryGreen: '#6eb33c',
    danger: '#d9534f',
    lightBlue: '#EAEBEF',
    disabled_site_node_grey: '#8a8e8e',
    grey_shade1: '#E8E8E8',
    grey_shade2: '#F6F6F7',
    grey_shade3: '#DADBDC',
    grey_shade4: '#6D6D6D',
    grey_shade5: '#494949',
    grey_shade6: '#BEC0C2',
    grey_shade7: '#595959',
    grey_shade8: '#353535',
    grey_shade9: '#e4e5e6',
  },
};
export const verticallyCenterStyles: CSSProperties = {
  verticalAlign: 'middle',
  minWidth: 0,
  margin: 'auto 0',
};
export const flexContainerStyles: CSSProperties = {
  display: 'flex',
};
export const pLeft8: CSSProperties = {
  padding: '8px 0',
};

export const centerRowItemStyles: CSSProperties = {
  display: 'inline-flex',
  float: 'none',
};

export const panelTitleStyles: CSSProperties = {
  fontSize: '1.188rem',
  textTransform: 'uppercase',
  fontWeight: 600,
};

export const textOverflowStyles: CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};
