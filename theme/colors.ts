import { DefaultMantineColor } from '@mantine/core';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Function ? T[P] : DeepPartial<T[P]>;
};

const priorityColors = [
  '#8942C1',
  '#428BC1',
  '#00A790',
  '#F8A541',
  '#ED4C5C',
] as const;

const colors: DeepPartial<
  Record<
    DefaultMantineColor,
    [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
    ]
  >
> = {
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
  gray: ['#F8F9FA', '#F4F4F4', '#E9ECEF', '#888888', '#4A4A4A'],
};

export { colors, priorityColors };
