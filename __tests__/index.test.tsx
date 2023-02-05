import { render, screen } from '@testing-library/react';

import Home, { ActivityList } from '@/pages/index';

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

    it('renders list of activities', () => {});
  });

  describe('CRUD', () => {
    it.todo('removes an activity');

    it.todo('adds an activity');
    it.todo('removes an activity');
  });
});
