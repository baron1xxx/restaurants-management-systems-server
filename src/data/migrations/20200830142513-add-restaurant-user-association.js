export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => queryInterface.addColumn('restaurants', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    }, { transaction })),

  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => queryInterface.removeColumn('restaurants', 'userId', { transaction }))
};

