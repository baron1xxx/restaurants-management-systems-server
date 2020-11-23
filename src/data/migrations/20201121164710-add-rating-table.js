export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => queryInterface.createTable('ratings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, { transaction })),
  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => queryInterface.dropTable('ratings', { transaction }))
};
