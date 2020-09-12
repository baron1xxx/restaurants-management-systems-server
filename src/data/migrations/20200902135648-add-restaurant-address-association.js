export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => queryInterface.addColumn('restaurants', 'addressId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'addresses',
        key: 'id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    }, { transaction })),
  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => queryInterface.removeColumn('restaurants', 'addressId', { transaction }))
};
