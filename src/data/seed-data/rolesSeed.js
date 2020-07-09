const now = new Date();

export const rolesSeed = ['admin', 'owner', 'customer', 'manager', 'cook', 'waiter'].map(role => ({
  role,
  createdAt: now,
  updatedAt: now
}));
