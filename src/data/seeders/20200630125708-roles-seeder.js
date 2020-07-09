import { rolesSeed } from '../seed-data/rolesSeed';

export default {
  up: async queryInterface => {
    try {
      await queryInterface.bulkInsert('roles', rolesSeed, {});
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`Seeding error: ${err}`);
    }
  },
  down: async queryInterface => {
    try {
      await queryInterface.bulkDelete('roles', null, {});
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`Seeding error: ${err}`);
    }
  }
};
