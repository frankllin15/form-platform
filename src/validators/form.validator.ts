import { z } from 'zod';
// export const createFormValidator: ValidatorSchema = {
//   name: {
//     type: 'string',
//     required: true,
//   },
//   description: {
//     type: 'string',
//     required: true,
//   },
//   authorId: {
//     type: 'string',
//     required: true,
//   },
//   questions: {
//     type: 'array',
//     required: true,
//     items: {
//       label: {
//         type: 'string',
//         required: true,
//       },
//       questionTypeId: {
//         type: 'number',
//         required: true,
//       },
//       order: {
//         type: 'number',
//         required: true,
//       },
//       options: {
//         type: 'array',
//         required: true,
//         items: {
//           value: {
//             type: 'string',
//             required: true,
//           },
//           order: {
//             type: 'number',
//             required: true,
//           },
//         },
//       },
//     },
//   },
// };

// export const updateFormValidator: ValidatorSchema = {
//   id: {
//     type: 'string',
//     required: true,
//   },
//   data: {
//     type: 'object',
//     required: true,
//     items: {
//       name: {
//         type: 'string',
//       },
//       description: {
//         type: 'string',
//       },
//       questions: {
//         type: 'object',
//         items: {
//           create: {
//             type: 'array',
//             items: {
//               label: {
//                 type: 'string',
//                 required: true,
//               },
//               questionTypeId: {
//                 type: 'number',
//                 required: true,
//               },
//               order: {
//                 type: 'number',
//                 required: true,
//               },
//               options: {
//                 type: 'array',
//                 items: {
//                   value: {
//                     type: 'string',
//                     required: true,
//                   },
//                   order: {
//                     type: 'number',
//                     required: true,
//                   },
//                 },
//               },
//             },
//           },
//           update: {
//             type: 'array',
//             items: {
//               id: {
//                 type: 'string',
//                 required: true,
//               },
//               label: {
//                 type: 'string',
//               },
//               questionTypeId: {
//                 type: 'number',
//               },
//               order: {
//                 type: 'number',
//               },
//               options: {
//                 type: 'object',
//                 items: {
//                   create: {
//                     type: 'array',
//                     items: {
//                       value: {
//                         type: 'string',
//                       },
//                       order: {
//                         type: 'number',
//                       },
//                     },
//                   },
//                   update: {
//                     type: 'array',
//                     items: {
//                       id: {
//                         type: 'string',
//                         required: true,
//                       },
//                       value: {
//                         type: 'string',
//                       },
//                       order: {
//                         type: 'number',
//                       },
//                     },
//                   },
//                   delete: {
//                     type: 'array',
//                     items: {
//                       id: {
//                         type: 'string',
//                         required: true,
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           delete: {
//             type: 'array',
//             items: {
//               id: {
//                 type: 'string',
//                 required: true,
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

export const createFormValidator = z.object({
  name: z.string(),
  description: z.string().nullable(),
  authorId: z.string(),
  questions: z.array(
    z.object({
      label: z.string(),
      questionTypeId: z.number(),
      order: z.number(),
      options: z
        .array(
          z.object({
            value: z.string(),
            order: z.number(),
          })
        )
        .optional(),
    })
  ),
});

export type CreateFormInput = z.infer<typeof createFormValidator>;

export const updateFormValidator = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().optional(),
    description: z.string().nullable().optional(),
    questions: z
      .object({
        create: z
          .array(
            z.object({
              label: z.string(),
              questionTypeId: z.number(),
              order: z.number(),
              options: z
                .array(
                  z.object({
                    value: z.string(),
                    order: z.number(),
                  })
                )
                .optional(),
            })
          )
          .optional(),
        update: z
          .array(
            z.object({
              id: z.string(),
              label: z.string().optional(),
              questionTypeId: z.number().optional(),
              order: z.number().optional(),
              options: z
                .object({
                  create: z
                    .array(
                      z.object({
                        value: z.string().optional(),
                        order: z.number().optional(),
                      })
                    )
                    .optional(),
                  update: z
                    .array(
                      z.object({
                        id: z.string(),
                        value: z.string().optional(),
                        order: z.number().optional(),
                      })
                    )
                    .optional(),
                  delete: z.array(z.string()).optional(),
                })
                .optional(),
            })
          )
          .optional(),
        delete: z.array(z.string()).optional(),
      })
      .optional(),
  }),
});

export type UpdateFormInput = z.infer<typeof updateFormValidator>;
