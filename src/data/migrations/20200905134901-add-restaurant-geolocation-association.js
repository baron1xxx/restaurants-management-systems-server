export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => queryInterface.addColumn('restaurants', 'geolocationId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'geolocations',
        key: 'id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    }, { transaction })),

  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => queryInterface.removeColumn('restaurants', 'geolocationId', { transaction }))
};
