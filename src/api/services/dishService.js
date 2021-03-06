import * as menuService from './menuService';
import * as imageService from './imageService';
import dishRepository from '../../data/repositories/dishRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
import { NOT_FOUND } from '../../constants/responseStatusCodes';
import { dishErrorMessages } from '../../constants/customErrorMessage/dishErrorMessage';
import { imageErrorMessages } from '../../constants/customErrorMessage/imageErrorMessage';
import { LIMIT, PAGE } from '../../constants/paginationConstants';
import { countPages, offset } from '../../helpers/paginationHelper';

export const create = async ({ menuId, file, ...dishData }) => {
  try {
    // Check if file exists
    if (!file) {
      throw new ErrorHandler(
        NOT_FOUND,
        imageErrorMessages.IMAGE_IS_REQUIRED,
        'Dish create()'
      );
    }
    const { id: imageId = null } = await imageService.upload(file);

    const { id } = await dishRepository.create({ ...dishData, imageId, menuId });
    return await dishRepository.getById(id);
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

    return dishCount
      ? {
        menus: await dishRepository.getAll(
          {
            ...filter,
            limit,
            offset: offset(page, limit) }
        ),
        totalPage: countPages(dishCount, limit, page)
      }
      : [];
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Dish service geAll()');
  }
};

export const update = async (id, data) => {
  try {
    const { file, ...dishBody } = data;
    // TODO те саме що і вресторані і в меню. Лишній раз роблю запит на страву по ID
    // Перший раз це в міддлеварі, щоб перевірити чи той хто оновлює дані а власником або адміном
    // А тут щоб дістати imageId, для оновлення картинки і видалення попередньої
    const dish = await getById(id);

    if (file) {
      await imageService.update(dish.image.id, file);
    }

    await dishRepository.updateById(id, dishBody);
    return await dishRepository.getById(id);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Dish service update()');
  }
};
