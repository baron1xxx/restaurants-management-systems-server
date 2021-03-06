export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => queryInterface.addColumn('images', 'deleteHash', {
      type: Sequelize.STRING,
      allowNull: false,
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    }, { transaction })),
  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => queryInterface.removeColumn('images', 'deleteHash', { transaction }))
};
