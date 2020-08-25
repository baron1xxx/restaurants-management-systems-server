export default (orm, DataTypes) => {
  const HouseNumber = orm.define('houseNumber', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  return HouseNumber;
};
