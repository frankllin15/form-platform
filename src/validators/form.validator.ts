import { validate } from "../utils/validator";
import { CreateFormInput } from "./../types/form.d";
export const formValidator = {
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
            answer: {
              type: "boolean",
              required: true,
            },
          },
        },
      },
    },
  },
};

const form = {
  name: "Frank",
  description: "aa",
  fields: {
    name: "a",
    // type: "a",
  },
  questions: [],
};
