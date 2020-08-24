export default (orm, DataTypes) => {
  const Region = orm.define('region', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  return Region;
};
