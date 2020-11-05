export default {
  up: (queryInterface, Sequalize) => queryInterface.sequelize
    .transaction(transaction => queryInterface.addColumn('tables', 'restaurantId', {
      type: Sequalize.INTEGER,
      references: {
        model: 'restaurants',
        key: 'id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    }, { transaction })),
  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => queryInterface.removeColumn('tables', 'restaurantId', { transaction }))
};
