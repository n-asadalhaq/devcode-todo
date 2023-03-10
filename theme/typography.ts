import { MantineSizes } from '@mantine/core';

const fontSizes: MantineSizes = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 24,
  xl: 36,
};

const typography = {
  fontFamily: 'Poppins, sans-serif',
  headings: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
      },
      h2: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
      },
      h3: {
        fontSize: fontSizes.md,
        fontWeight: '700',
      },
      h4: {
        fontSize: fontSizes.md,
        fontWeight: '500',
      },
    },
  },
  fontSizes,
};

export { typography, fontSizes };
