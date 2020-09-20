export default (orm, DataTypes) => {
  const Image = orm.define('image', {
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deleteHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  return Image;
};
