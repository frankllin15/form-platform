import {z} from 'zod';


// export const createUserValidator: ValidatorSchema = {
//   name: {
//     type: 'string',
//     required: true,
//   },
//   email: {
//     type: 'string',
//     required: true,
//   },
//   password: {
//     type: 'string',
//     required: true,
//   },
// };

// export const updateUserValidator: ValidatorSchema = {
//   id: {
//     type: 'string',
//     required: true,
//   },
//   name: {
//     type: 'string',
//   },
//   email: {
//     type: 'string',
//   },
// };


export const createUserValidator = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserValidator = z.infer<typeof createUserValidator>;

export const updateUserValidator = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

export type UpdateUserValidator = z.infer<typeof updateUserValidator>;
