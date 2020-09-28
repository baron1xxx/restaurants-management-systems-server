export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => queryInterface.addColumn('openings', 'restaurantId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'restaurants',
        key: 'id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    }, { transaction })),
  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => queryInterface.removeColumn('openings', 'restaurantId', { transaction }))
};
