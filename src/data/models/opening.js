export default (orm, DataTypes) => {
  const Opening = orm.define('opening', {
    day: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end: {
      type: DataTypes.TIME,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  return Opening;
};
