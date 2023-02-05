import { MantineSizes } from '@mantine/core';

const fontSizes: MantineSizes = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 24,
  xl: 36,
};

// type DeepPartial<T> = T extends object
//   ? {
//       [P in keyof T]?: DeepPartial<T[P]>;
//     }
//   : T;

export const typography = {
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
    },
  },
  fontSizes,
};
