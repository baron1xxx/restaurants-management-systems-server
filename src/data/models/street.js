export default (orm, DataTypes) => {
  const Street = orm.define('street', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  return Street;
};
