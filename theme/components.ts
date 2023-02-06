import { MantineThemeComponents } from '@mantine/styles/lib/theme/types/MantineTheme';

import { colors } from './colors';

export const components: MantineThemeComponents = {
  Button: {
    defaultProps: {
      radius: '45px',
      miw: 150,
    },
  },
  Input: {
    styles: {
      input: {
        borderColor: colors.gray![1],
        height: 52,
        fontWeight: 'normal',
      },
    },
  },
  Select: {
    styles: {
      input: {
        borderColor: colors.gray![1],
        height: 52,
        fontWeight: 'normal',
      },
    },
  },
};
