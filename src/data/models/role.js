export default (orm, DataTypes) => {
  const Role = orm.define('role', {
    role: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  return Role;
};
