export default (orm, DataTypes) => {
  const Menu = orm.define('menu', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  // eslint-disable-next-line no-unused-vars
  Menu.afterBulkUpdate(item => {
  });

  // eslint-disable-next-line no-unused-vars
  Menu.afterBulkDestroy(item => {
    // TODO After delete findByPk. Get delete hash image and delete image from IMGUR!!!
  });

  return Menu;
};
