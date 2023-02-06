/**
 * Contain 11 activities.
 * Each activities' createdAt set to {index + 1}/January/2023.
 * Each activities' title set to "Activity {index + 1}""
 */

export const dummyActivities = Array(11)
  .fill(1)
  .map((i, idx) => {
    const id = i + idx;

    const createdAt = new Date();

    createdAt.setDate(i);
    createdAt.setMonth(0);
    createdAt.setFullYear(2023);

    return {
      title: `Activity test ${id}`,
      id,
      created_at: createdAt.toISOString(),
    };
  });
