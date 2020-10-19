import * as menuService from './menuService';
import * as imageService from './imageService';
import dishRepository from '../../data/repositories/dishRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

export const create = async ({ menuId, file, ...dishData }) => {
  try {
    await menuService.getById(menuId);

    // TODO If file then upload file else imageId = null;
    const { id: imageId } = file
      ? await imageService.upload(file)
      : { id: null };

    const { id } = await dishRepository.create({ ...dishData, imageId, menuId });// TODO { imageId }
    const dish = await dishRepository.getById(id);
    return dish;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Dish service create()');
  }
};
