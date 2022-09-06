import { HttpError } from './../utils/error';
import {
  createUserValidator,
  updateUserValidator,
} from './../validators/user.validator';
import { Request, Response } from 'express';
import { UserService } from '../services/User.service';
import { createErrorResponse } from '../utils/error';
import { validate } from '../utils/validator';

export const UserController = {
  async getAll(req: Request, res: Response) {
    try {
      const { take, skip } = req.query;

      const users = await UserService.getAll({
        take: Number(take),
        skip: Number(skip),
      });
      return res.status(200).json(users);
    } catch (err) {
      const { status, ...error } = createErrorResponse(err);
      res.status(status).json(error);
    }
  },
  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) throw new HttpError(400, "Required parameter 'id' is missing");
      const user = await UserService.getOne(id);
      return res.status(200).json(user);
    } catch (err) {
      const { status, ...error } = createErrorResponse(err);
      res.status(status).json(error);
    }
  },
  async create(req: Request, res: Response) {
    try {
      const { isValid, errors } = validate(req.body, createUserValidator);

      if (!isValid) {
        throw new HttpError(400, 'Validation error', errors);
      }

      const user = await UserService.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      const { status, ...error } = createErrorResponse(err);
      res.status(status).json(error);
    }
  },
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { isValid, errors } = validate(
        { id, ...req.body },
        updateUserValidator
      );

      if (!isValid) {
        throw new HttpError(400, 'Validation error', errors);
      }

      const user = await UserService.update({ id, ...req.body });
      return res.status(200).json(user);
    } catch (err) {
      const { status, ...error } = createErrorResponse(err);
      res.status(status).json(error);
    }
  },
};
