import * as restaurantService from './restaurantService';
import * as imageService from './imageService';
import menuRepository from '../../data/repositories/menuRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
import { countPages, offset } from '../../helpers/paginationHelper';
import { LIMIT, PAGE } from '../../constants/paginationConstants';
import { NOT_FOUND } from '../../constants/responseStatusCodes';
import { menuErrorMessages } from '../../constants/customErrorMessage/menuErrorMessage';
import { imageErrorMessages } from '../../constants/customErrorMessage/imageErrorMessage';

export const create = async ({ restaurantId, file, ...menuData }) => {
  try {
    if (!file) {
      throw new ErrorHandler(
        NOT_FOUND,
        imageErrorMessages.IMAGE_IS_REQUIRED,
        'Menu create()'
      );
    }

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
    await restaurantService.getRestaurantById(restaurantId);
    // Count menus by restaurant id
    const menusCount = await menuRepository.countAll(filter);

    return menusCount
      ? {
        menus: await menuRepository.getAll(
          {
            ...filter,
            limit,
            offset: offset(page, limit) }
        ),
        totalPage: countPages(menusCount, limit, page)
      }
      : [];
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
    const { file, ...menuBody } = data;
    // TODO те саме що і вресторані. Лишній раз роблю запит на меню по ID
    // Перший раз це в міддлеварі, щоб перевірити чи той хто оновлює дані а власником або адміном
    // А тут щоб дістати imageId, для оновлення картинки і видалення попередньої
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
