import { ErrorHandler } from './error/ErrorHandler';
import { NOT_FOUND } from '../constants/responseStatusCodes';

export const countPages = (count, limit, page) => {
  try {
    const totalPage = Math.ceil(count / limit);
    if (totalPage < page) throw new ErrorHandler(NOT_FOUND, 'Page not found', 'Pagination helper');
    return totalPage;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Table service geAll()');
  }
};

export const offset = (page, limit) => limit * (page - 1);
