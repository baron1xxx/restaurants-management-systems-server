import * as menuService from './menuService';
import * as imageService from './imageService';
import dishRepository from '../../data/repositories/dishRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

export const create = async ({ menuId, file, ...dishData }) => {
  try {
    // Check if menu exists
    await menuService.getById(menuId);
    // If file exist upload else return empty object and assign default value to imageId = null
    const { id: imageId = null } = file
      ? await imageService.upload(file)
      : {};

    const { id } = await dishRepository.create({ ...dishData, imageId, menuId });// TODO { imageId }
    const dish = await dishRepository.getById(id);
    return dish;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Dish service create()');
  }
};
