import { Request, Response } from 'express';
import type { CreateFormInput } from '../types/form';
import { FormService } from '../services/Form.service';
import { validate } from '../utils/validator';
import {
  createFormValidator,
  updateFormValidator,
} from '../validators/form.validator';
import { createErrorResponse, HttpError } from '../utils/error';
export const FormController = {
  async create(req: Request, res: Response) {
    try {
      const payload = req.body as CreateFormInput;

      const { isValid, errors } = validate(payload, createFormValidator);
      console.log(errors);
      if (!isValid) {
        throw new HttpError(400, 'Invalid payload', errors);
      }

      const form = await FormService.create(req.body);

      return res.status(201).json(form);
    } catch (err) {
      const { status, ...error } = createErrorResponse(err);
      return res.status(status).json(error);
    }
  },
  async findMany(req: Request, res: Response) {
    try {
      const forms = await FormService.findMany(req.body);
      const total_items = await FormService.totalItems();
      res.status(200).json({
        forms,
        total_items,
      });
    } catch (e: any) {
      res.status(400).json({
        error: {
          message: e.message,
        },
      });
    }
  },
  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id) throw new Error("Required param missing 'id'");
      const form = await FormService.findUnique({ id });

      res.status(200).json({
        form,
      });
    } catch (e: any) {
      res.status(400).json({
        error: {
          message: e.message,
        },
      });
    }
  },
  async update(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const { data } = req.body;
    try {
      const { isValid, errors } = validate({ id, data }, updateFormValidator);
      if (!isValid) throw new HttpError(400, 'Invalid params', errors);
      const form = await FormService.update({ id, data });

      res.status(201).json({
        form,
      });
    } catch (err: any) {
      const { status, ...error } = createErrorResponse(err);
      return res.status(status).json(error);
    }
  },
  async delete(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    try {
      if (!id) throw new HttpError(400, "Required param missing 'id'");
      await FormService.delete({ id });

      res.status(204).end();
    } catch (err: any) {
      const { status, ...error } = createErrorResponse(err);
      return res.status(status).json(error);
    }
  },
};
