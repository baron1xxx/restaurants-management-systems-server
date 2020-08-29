export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => Promise.all([
      queryInterface.addColumn('cities', 'regionId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'regions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, { transaction }),
      queryInterface.addColumn('streets', 'cityId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, { transaction }),
      queryInterface.addColumn('houseNumbers', 'streetId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'streets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, { transaction })
    ])),

  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => Promise.all([
      queryInterface.removeColumn('cities', 'regionId', { transaction }),
      queryInterface.removeColumn('streets', 'cityId', { transaction }),
      queryInterface.removeColumn('houseNumbers', 'streetId', { transaction })
    ]))
};
