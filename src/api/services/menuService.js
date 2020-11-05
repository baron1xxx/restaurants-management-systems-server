import * as restaurantService from './restaurantService';
import * as imageService from './imageService';
import menuRepository from '../../data/repositories/menuRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
import { countPages, offset } from '../../helpers/paginationHelper';
import { LIMIT, PAGE } from '../../constants/paginationConstants';
import { NOT_FOUND } from '../../constants/responseStatusCodes';
import { menuErrorMessages } from '../../constants/customErrorMessage/menuErrorMessage';

export const create = async ({ restaurantId, file, ...menuData }) => {
  try {
    await restaurantService.getById(restaurantId);

    const { id: imageId } = await imageService.upload(file);

    const { id } = await menuRepository.create({ ...menuData, imageId, restaurantId });
    return await menuRepository.getById(id);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Menu service create()');
  }
};

export const getMenus = async filter => {
  try {
    const { limit = LIMIT, page = PAGE, restaurantId } = filter;
    // Check if restaurant exist
    await restaurantService.getById(restaurantId);
    // Count menus by restaurant id
    const menusCount = await menuRepository.countAll(filter);

    return {
      menus: await menuRepository.getAll({
        ...filter,
        offset: offset(page, limit) }),
      totalPage: countPages(menusCount, limit)
    };
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Menu service geAll()');
  }
};

export const getById = async id => {
  try {
    const menu = await menuRepository.getById(id);
    if (!menu) {
      throw new ErrorHandler(
        NOT_FOUND,
        menuErrorMessages.MENU_NOT_FOUND,
        'Menu getById()'
      );
    }
    return menu;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Menu service getById()');
  }
};

export const update = async (id, data) => {
  try {
    const { file, user, ...menuBody } = data;
    const menu = await getById(id);

    if (file) {
      await imageService.update(menu.image.id, file);
    }

    await menuRepository.updateById(id, menuBody);
    return await menuRepository.getById(id);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Menu service update()');
  }
};
