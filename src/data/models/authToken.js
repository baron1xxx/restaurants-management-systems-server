export default (orm, DataTypes) => {
  const AuthToken = orm.define('authToken', {
    accessToken: {
      allowNull: false,
      type: DataTypes.STRING
    },
    refreshToken: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  return AuthToken;
};
