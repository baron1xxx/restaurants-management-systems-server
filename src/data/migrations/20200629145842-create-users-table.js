export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isActivated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isBlocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, { transaction })),
  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => queryInterface.dropTable('users', { transaction }))
};
