import { rest, RestHandler } from 'msw';

import { baseUrl, email } from '@/constants/api';

import { dummyActivities } from '../data/activity';

const handlers: RestHandler[] = [
  // rest.get(`${baseUrl}/activity-groups`, async (_, res, ctx) => {
  rest.get(`${baseUrl}/activity-groups`, async (_, res, ctx) => {
    return res(
      ctx.json({
        status: 'Success',
        message: 'Success',
        data: dummyActivities,
      }),
    );
  }),
  rest.post(`${baseUrl}/activity-groups`, async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.json({
        status: 'Success',
        message: 'Success',
        data: {
          created_at: '2021-12-01T09:23:05.825Z',
          updated_at: '2021-12-01T09:23:05.826Z',
          id: 1188,
          title: body.title,
          email: body.email,
        },
      }),
    );
  }),
];

export { handlers };
