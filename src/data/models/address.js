export default (orm, DataTypes) => {
  const Address = orm.define('address', {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  return Address;
};
