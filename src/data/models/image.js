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

  // eslint-disable-next-line no-unused-vars
  Image.afterBulkDestroy((item, options) => {
    console.log('After delete IMAGE!!!!!!!!!!!!!!!!!', item);
    console.log('After delete IMAGE!!!!!!!!!!!!!!!!!', options);
  });

  return Image;
};

