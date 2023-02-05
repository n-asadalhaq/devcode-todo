import { rest, RestHandler } from 'msw';

import { baseUrl } from '@/constants/api';

import { dummyActivities } from '../data/activity';

const handlers: RestHandler[] = [
  // rest.get(`${baseUrl}/activity-groups`, async (_, res, ctx) => {
  rest.get(`${baseUrl}/activity-groups`, async (_, res, ctx) => {
    console.log('handler called');
    return res(
      ctx.json({
        status: 'Success',
        message: 'Success',
        data: dummyActivities,
      }),
    );
  }),
];

export { handlers };
