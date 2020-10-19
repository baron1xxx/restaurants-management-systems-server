export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => queryInterface.addColumn('menus', 'imageId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'images',
        key: 'id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    }, { transaction })),

  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => queryInterface.removeColumn('menus', 'imageId', { transaction }))
};
