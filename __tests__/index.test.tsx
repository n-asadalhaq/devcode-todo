import { render, RenderOptions, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SWRConfig } from 'swr';

import { ActivityList } from '@/components/activity-list';
import Home from '@/pages/index';

import { dummyActivities } from '../mocks/data/activity';

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  );
};

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });

const waitForFetchActivities = async () =>
  waitFor(() => {
    expect(screen.queryByText(/memuat activity/i)).not.toBeInTheDocument();
  });

describe('Home', () => {
  it('renders a heading', async () => {
    customRender(<Home />);

    await waitFor(() => {
      expect(screen.queryByText(/memuat activity/i)).not.toBeInTheDocument();
    });

    const heading = await screen.findByRole('heading', {
      name: /TO DO LIST APP/,
    });

    expect(heading).toBeInTheDocument();
  });

  describe('ActivityList', () => {
    it('renders an illustration if activity list is empty', () => {
      render(<ActivityList activities={[]} onDeleteClick={() => {}} />);

      const illustration = screen.getByAltText(
        "You don't have any activity. Click add button to create one.",
      );

      expect(illustration).toBeInTheDocument();
    });

    it('renders list of activities', async () => {
      customRender(<Home />);

      await waitForFetchActivities();

      const activityItems = screen.getAllByText(/Activity test [1-9]{1,2}/);

      expect(activityItems.length).toBe(dummyActivities.length);

      const activityDeleteButtons = screen.getAllByAltText(/Hapus activity/i);

      expect(activityDeleteButtons.length).toBe(dummyActivities.length);
    });
  });

  describe('CRUD', () => {
    it.todo('removes an activity');

    it.skip('adds an activity', async () => {
      const user = userEvent.setup();

      customRender(<Home />);

      await waitForFetchActivities();

      await user.click(screen.getByRole('button', { name: /tambah/i }));

      await waitForFetchActivities();

      expect(await screen.findByText(/new activity/i)).toBeInTheDocument();
    });
    it.todo('removes an activity');
  });
});
