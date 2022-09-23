import { ValidatorSchema } from '../utils/validator';
export const createFormValidator: ValidatorSchema = {
  name: {
    type: 'string',
    required: true,
  },
  description: {
    type: 'string',
    required: true,
  },
  authorId: {
    type: 'string',
    required: true,
  },
  questions: {
    type: 'array',
    required: true,
    items: {
      label: {
        type: 'string',
        required: true,
      },
      questionTypeId: {
        type: 'number',
        required: true,
      },
      order: {
        type: 'number',
        required: true,
      },
      options: {
        type: 'array',
        required: true,
        items: {
          value: {
            type: 'string',
            required: true,
          },
          order: {
            type: 'number',
            required: true,
          },
        },
      },
    },
  },
};

export const updateFormValidator: ValidatorSchema = {
  id: {
    type: 'string',
    required: true,
  },
  data: {
    type: 'object',
    required: true,
    items: {
      name: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      questions: {
        type: 'object',
        items: {
          create: {
            type: 'array',
            items: {
              label: {
                type: 'string',
                required: true,
              },
              questionTypeId: {
                type: 'number',
                required: true,
              },
              order: {
                type: 'number',
                required: true,
              },
              options: {
                type: 'array',
                items: {
                  value: {
                    type: 'string',
                    required: true,
                  },
                  order: {
                    type: 'number',
                    required: true,
                  },
                },
              },
            },
          },
          update: {
            type: 'array',
            items: {
              id: {
                type: 'string',
                required: true,
              },
              label: {
                type: 'string',
              },
              questionTypeId: {
                type: 'number',
              },
              order: {
                type: 'number',
              },
              options: {
                type: 'object',
                items: {
                  create: {
                    type: 'array',
                    items: {
                      value: {
                        type: 'string',
                      },
                      order: {
                        type: 'number',
                      },
                    },
                  },
                  update: {
                    type: 'array',
                    items: {
                      id: {
                        type: 'string',
                        required: true,
                      },
                      value: {
                        type: 'string',
                      },
                      order: {
                        type: 'number',
                      },
                    },
                  },
                  delete: {
                    type: 'array',
                    items: {
                      id: {
                        type: 'string',
                        required: true,
                      },
                    },
                  },
                },
              },
            },
          },
          delete: {
            type: 'array',
            items: {
              id: {
                type: 'string',
                required: true,
              },
            },
          },
        },
      },
    },
  },
};
