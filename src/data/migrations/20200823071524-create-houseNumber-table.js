export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => queryInterface.createTable('houseNumbers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
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
    .transaction(transaction => queryInterface.dropTable('houseNumbers', { transaction }))
};

