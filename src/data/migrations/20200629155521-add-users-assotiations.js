export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => Promise.all([
      queryInterface.addColumn('users', 'imageId', {
        type: Sequelize.UUID,
        references: {
          model: 'images',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, { transaction }),
      queryInterface.addColumn('credentials', 'userId', {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, { transaction }),
      queryInterface.addColumn('authTokens', 'userId', {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, { transaction })
    ])),

  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => Promise.all([
      queryInterface.removeColumn('users', 'imageId', { transaction }),
      queryInterface.removeColumn('credentials', 'userId', { transaction }),
      queryInterface.removeColumn('authTokens', 'userId', { transaction })
    ]))
};
