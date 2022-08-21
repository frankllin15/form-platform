import { validate } from "../utils/validator";
import { CreateFormInput } from "./../types/form.d";
import { ValidatorSchema } from "../utils/validator";
export const createFormValidator: ValidatorSchema = {
  name: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  questions: {
    type: "array",
    required: true,
    items: {
      text: {
        type: "string",
        required: true,
      },
      options: {
        type: "array",
        required: true,
        items: {
          text: {
            type: "string",
            required: true,
          },
          answer: {
            type: "boolean",
            required: true,
          },
        },
      },
    },
  },
};

export const updateFormValidator: ValidatorSchema = {
  id: {
    type: "string",
    required: true,
  },
  data: {
    type: "object",
    required: true,
    items: {
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
      questions: {
        type: "object",
        items: {
          create: {
            type: "array",
            items: {
              text: {
                type: "string",
                required: true,
              },
              options: {
                type: "array",
                items: {
                  text: {
                    type: "string",
                    required: true,
                  },
                  answer: {
                    type: "boolean",
                    required: true,
                  },
                },
              },
            },
          },
          update: {
            type: "array",
            items: {
              id: {
                type: "string",
                required: true,
              },
              text: {
                type: "string",
              },
              options: {
                type: "object",
                items: {
                  create: {
                    type: "array",
                    items: {
                      text: {
                        type: "string",
                      },
                      answer: {
                        type: "boolean",
                      },
                    },
                  },
                  update: {
                    type: "array",
                    items: {
                      id: {
                        type: "string",
                        required: true,
                      },
                      text: {
                        type: "string",
                      },
                      answer: {
                        type: "boolean",
                      },
                    },
                  },
                  delete: {
                    type: "array",
                    items: {
                      id: {
                        type: "string",
                        required: true,
                      },
                    },
                  },
                },
              },
            },
          },
          delete: {
            type: "array",
            items: {
              id: {
                type: "string",
                required: true,
              },
            },
          },
        },
      },
    },
  },
};
