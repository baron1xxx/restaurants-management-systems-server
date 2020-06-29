export default (orm, DataTypes) => {
  const Credential = orm.define('authToken', {
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    permissionCode: {
      allowNull: false,
      type: DataTypes.STRING
    },
    authMethod: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  return Credential;
};
