import { MantineThemeComponents } from '@mantine/styles/lib/theme/types/MantineTheme';

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
        borderColor: '#88888888',
        height: 52,
        fontWeight: 'normal',
      },
    },
  },
  Select: {
    styles: {
      input: {
        borderColor: '#88888888',
        height: 52,
        fontWeight: 'normal',
      },
    },
  },
};
