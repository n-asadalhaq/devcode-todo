import { render, screen } from '@testing-library/react';

import Home, { ActivityList } from '@/pages/index';

import { Activity } from '../types/index';

/**
 * Contain 11 activities.
 * Each activities' createdAt set to {index + 1}/January/2023.
 * Each activities' title set to "Activity {index + 1}""
 */
const dummyActivities: Activity[] = Array(11)
  .fill(1)
  .map((i, idx): Activity => {
    const id = i + idx;

    const createdAt = new Date();

    createdAt.setDate(i);
    createdAt.setMonth(0);
    createdAt.setFullYear(2023);

    return {
      title: `Activity test ${id}`,
      id,
      createdAt,
    };
  });

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /TO DO LIST APP/,
    });

    expect(heading).toBeInTheDocument();
  });

  describe('ActivityList', () => {
    it('renders an illustration if activity list is empty', () => {
      render(<ActivityList activities={[]} />);

      const illustration = screen.getByAltText(
        "You don't have any activity. Click add button to create one.",
      );

      expect(illustration).toBeInTheDocument();
    });

    it('renders list of activities', () => {
      render(<ActivityList activities={dummyActivities} />);

      const activityItems = screen.getAllByText(/Activity test [1-9]{1,2}/);

      expect(activityItems.length).toBe(dummyActivities.length);

      const activityDeleteButtons = screen.getAllByAltText(/Hapus activity/i);

      expect(activityDeleteButtons.length).toBe(dummyActivities.length);
    });
  });

  describe('CRUD', () => {
    it.todo('removes an activity');

    it.todo('adds an activity');
    it.todo('removes an activity');
  });
});
