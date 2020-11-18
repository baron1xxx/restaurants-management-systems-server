import houseNumberRepository from '../repositories/houseNumberRepository';

export default (orm, DataTypes) => {
  const Address = orm.define('address', {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  Address.beforeCreate(async address => {
    const { streetId, houseNumberId: number } = address;
    const { id } = await houseNumberRepository.create({
      number,
      streetId
    });
    // eslint-disable-next-line no-param-reassign
    address.houseNumberId = id;
    return address;
  });

  return Address;
};
