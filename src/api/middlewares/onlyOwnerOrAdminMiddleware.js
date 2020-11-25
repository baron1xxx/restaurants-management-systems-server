import * as tableService from '../services/tableService';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
import { FORBIDDEN } from '../../constants/responseStatusCodes';
import { authErrorMessages } from '../../constants/customErrorMessage/authErrorMessage';
import { roles } from '../../constants/roles';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    const { params: { id: tableId }, user } = req;
    // Check if table exists.
    const table = await tableService.getById(tableId);
    // Check if authentication user is owner restaurant.
    return table.restaurant.userId === user.id || user.role.role === roles.ADMIN
      ? next()
      : next(new ErrorHandler(
        FORBIDDEN,
        authErrorMessages.FORBIDDEN,
        'Only OWNER or ADMIN middleware'
      ));
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
