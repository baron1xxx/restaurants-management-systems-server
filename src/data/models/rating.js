export default (orm, DataTypes) => {
  const Rating = orm.define('rating', {
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  return Rating;
};
