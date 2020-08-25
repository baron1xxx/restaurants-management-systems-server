export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => queryInterface.createTable('streets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, {
      transaction,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    })),
  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => queryInterface.dropTable('streets', { transaction }))
};
