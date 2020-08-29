export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => queryInterface.createTable('regions', {
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
    .transaction(transaction => queryInterface.dropTable('regions', { transaction }))
};
