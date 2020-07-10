export default models => {
  const {
    User,
    Image,
    AuthToken,
    Credential,
    Role
  } = models;

  User.hasOne(AuthToken);
  User.hasOne(Credential);
  User.belongsTo(Role);
  User.belongsTo(Image);

  Role.hasOne(User);

  Image.hasOne(User);
};