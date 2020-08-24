export default (orm, DataTypes) => {
  const City = orm.define('city', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  return City;
};
