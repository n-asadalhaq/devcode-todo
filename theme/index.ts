import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colors: {
    blue: [
      '#DFEDF4',
      '#9ECEE7',
      '#5CB8E8',
      '#16ABF8',
      '#1B86BD',
      '#22678A',
      '#245066',
      '#223E4D',
      '#1F313A',
      '#1B262C',
    ],
    red: [
      '#F1D2D5',
      '#E89099',
      '#ED4C5C',
      '#CF2B3C',
      '#99303A',
      '#722F35',
      '#562B2F',
      '#412628',
      '#322022',
    ],
    green: [
      '#C0DFDB',
      '#8CCFC5',
      '#58C9B9',
      '#2BC5B0',
      '#14B49E',
      '#00A790',
      '#0D786A',
      '#13584E',
      '#15413B',
      '#14302C',
    ],
    priority: ['#8942C1', '#428BC1', '#00A790', '#F8A541', '#ED4C5C'],
    white: ['#FFF', '#F4F4F4'],
  },
  primaryColor: 'blue',
  primaryShade: 3,
  fontFamily: 'Poppins, sans-serif',
  headings: { fontFamily: 'Poppins, sans-serif', fontWeight: '700' },
  colorScheme: 'light',
};

export const semanticColors = {
  danger: 'red.2',
  success: 'green.4',
};
