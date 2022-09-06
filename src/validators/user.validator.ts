import { ValidatorSchema } from './../utils/validator/index';
export const createUserValidator: ValidatorSchema = {
  name: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
};

export const updateUserValidator: ValidatorSchema = {
  id: {
    type: 'string',
    required: true,
  },
  name: {
    type: 'string',
  },
  email: {
    type: 'string',
  },
};
