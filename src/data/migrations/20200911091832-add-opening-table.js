export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => queryInterface.createTable('openings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      day: {
        type: Sequelize.STRING,
        allowNull: false
      },
      start: {
        type: Sequelize.TIME,
        allowNull: false
      },
      end: {
        type: Sequelize.TIME,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, { transaction })),
  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => queryInterface.dropTable('openings', { transaction }))
};

