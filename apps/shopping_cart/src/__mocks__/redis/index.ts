export const createClient = jest.fn(() => ({
  connect: () => Promise.resolve(),
}));
