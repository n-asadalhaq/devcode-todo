import { MantineThemeOverride } from '@mantine/core';

import { colors } from './colors';
import { components } from './components';
import { typography } from './typography';

export const theme: MantineThemeOverride = {
  colors,
  primaryColor: 'blue',
  primaryShade: 3,
  colorScheme: 'light',
  components,
  ...typography,
};

export const semanticColors = {
  danger: 'red.2',
  success: 'green.4',
};
