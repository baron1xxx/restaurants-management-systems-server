export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => queryInterface.addColumn('dishes', 'menuId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'menus',
        key: 'id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    }, { transaction })),

  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => queryInterface.removeColumn('dishes', 'menuId', { transaction }))
};
