export const addressObjToString = address => Object.entries(address.dataValues)
  .filter(([key]) => key === 'region' || 'city' || 'street' || 'houseNumber')
  .map(el => el[1].name || el[1].number)
  .filter(el => el)
  .join(' ');
