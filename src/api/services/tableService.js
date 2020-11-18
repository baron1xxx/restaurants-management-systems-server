import tableRepository from '../../data/repositories/tableRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
import { tableErrorMessages } from '../../constants/customErrorMessage/tableErrorMessage';
import { NOT_FOUND } from '../../constants/responseStatusCodes';
import { LIMIT, PAGE } from '../../constants/paginationConstants';
import * as restaurantService from './restaurantService';
import { countPages, offset } from '../../helpers/paginationHelper';

export const create = async data => {
  try {
    const { id } = await tableRepository.create(data);
    return await tableRepository.getById(id);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Table service create()');
  }
};

export const getById = async id => {
  try {
    const table = await tableRepository.getById(id);
    if (!table) {
      throw new ErrorHandler(
        NOT_FOUND,
        tableErrorMessages.TABLE_NOT_FOUND,
        'Table getById()'
      );
    }
    return table;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Table service getById()');
  }
};

export const getTables = async filter => {
  try {
    const { limit = LIMIT, page = PAGE, restaurantId } = filter;
    // Check if menu exist
    await restaurantService.getRestaurantById(restaurantId);
    // Count dishes by menu id
    const tableCount = await tableRepository.countAll(filter);

    return {
      tables: await tableRepository.getAll({
        ...filter,
        offset: offset(page, limit) }),
      totalPage: countPages(tableCount, limit, page)
    };
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Table service geAll()');
  }
};

export const update = async (id, data) => {
  try {
    // Only table fields
    const { restaurantId, ...tableData } = data;
    // UPDATE
    await tableRepository.updateById(id, tableData);
    // Return updated obj.
    return await tableRepository.getById(id);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Table service update()');
  }
};
