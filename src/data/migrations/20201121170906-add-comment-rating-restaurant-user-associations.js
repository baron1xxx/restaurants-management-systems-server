export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => Promise.all([
      queryInterface.addColumn('comments', 'ratingId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'ratings',
          key: 'id'
        },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      }, { transaction }),
      queryInterface.addColumn('comments', 'restaurantId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'restaurants',
          key: 'id'
        }
      }, { transaction }),
      queryInterface.addColumn('comments', 'userId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }, { transaction })
    ])),
  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => Promise.all([
      queryInterface.removeColumn('comments', 'ratingId', { transaction }),
      queryInterface.removeColumn('comments', 'restaurantId', { transaction }),
      queryInterface.removeColumn('comments', 'userId', { transaction })
    ]))
};
