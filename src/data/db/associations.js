export default models => {
  const {
    User,
    Image,
    AuthToken,
    Credential,
    Role
  } = models;

  User.hasMany(AuthToken);
  User.hasOne(Credential);
  User.belongsTo(Role);
  User.belongsTo(Image);

  Credential.belongsTo(User);

  AuthToken.belongsTo(User);

  Role.hasOne(User);

  Image.hasOne(User);
};
