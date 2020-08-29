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
      }, { transaction }),
      queryInterface.addColumn('addresses', 'regionId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'regions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, { transaction }),
      queryInterface.addColumn('addresses', 'cityId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, { transaction }),
      queryInterface.addColumn('addresses', 'streetId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'streets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, { transaction }),
      queryInterface.addColumn('addresses', 'houseNumberId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'houseNumbers',
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
      queryInterface.removeColumn('houseNumbers', 'streetId', { transaction }),
      queryInterface.removeColumn('addresses', 'regionId', { transaction }),
      queryInterface.removeColumn('addresses', 'cityId', { transaction }),
      queryInterface.removeColumn('addresses', 'streetId', { transaction }),
      queryInterface.removeColumn('addresses', 'houseNumberId', { transaction })
    ]))
};
