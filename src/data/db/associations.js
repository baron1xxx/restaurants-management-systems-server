export default models => {
  const {
    User,
    Image,
    AuthToken,
    Credential
  } = models;

  User.hasOne(AuthToken);
  User.hasOne(Credential);
  User.belongsTo(Image);

  Image.hasOne(User);
};
