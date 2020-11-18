import * as tableService from '../services/tableService';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

export const create = async (req, res, next) => {
  try {
    const table = await tableService.create(req.body);

    res.status(200)
      .json({
        error: false,
        data: table
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const getById = async (req, res, next) => {
  try {
    const { params: { tableId } } = req;

    const table = await tableService.getById(tableId);

    res.status(200)
      .json({
        error: false,
        data: table
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const getTables = async (req, res, next) => {
  try {
    const { query, pagination, params: { restaurantId } } = req;

    const dishes = await tableService.getTables({ ...query, ...pagination, restaurantId });

    res.status(200)
      .json({
        error: false,
        data: dishes
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const updateTable = async (req, res, next) => {
  try {
    const { body, params: { id } } = req;

    const tableUpdated = await tableService.update(id, body);

    res.status(200)
      .json({
        error: false,
        data: tableUpdated
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const removeTable = async (req, res, next) => {
  try {
    const { params: { id } } = req;

    const tableDeleted = await tableService.update(id, { isDeleted: true });

    res.status(200)
      .json({
        error: false,
        data: tableDeleted
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
