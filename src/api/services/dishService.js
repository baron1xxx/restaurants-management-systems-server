import * as menuService from './menuService';
import * as imageService from './imageService';
import dishRepository from '../../data/repositories/dishRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
// import menuRepository from '../../data/repositories/menuRepository';
import { NOT_FOUND } from '../../constants/responseStatusCodes';
import { dishErrorMessages } from '../../constants/customErrorMessage/dishErrorMessage';
import { LIMIT, PAGE } from '../../constants/paginationConstants';
import { countPages, offset } from '../../helpers/paginationHelper';

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

export const getById = async id => {
  try {
    const dish = await dishRepository.getById(id);
    if (!dish) {
      throw new ErrorHandler(
        NOT_FOUND,
        dishErrorMessages.DISH_NOT_FOUND,
        'Dish getById()'
      );
    }
    return dish;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Dish service getById()');
  }
};

export const getDishes = async filter => {
  try {
    const { limit = LIMIT, page = PAGE, menuId } = filter;
    // Check if menu exist
    await menuService.getById(menuId);
    // Count dishes by menu id
    const dishCount = await dishRepository.countAll(filter);

    return {
      menus: await dishRepository.getAll({
        ...filter,
        offset: offset(page, limit) }),
      totalPage: countPages(dishCount, limit)
    };
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Dish service geAll()');
  }
};
