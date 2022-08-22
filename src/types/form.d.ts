import { TypedRequestBody, TypedRequestQuery } from '.';
import { CreateQuestionInput, UpdateQuestionInput } from './questions';

export type CreateFormInput = {
  name: string;
  description: string | null;
  questions: CreateQuestionInput[];
};

export type CreateFormRequest = TypedRequestBody<CreateFormInput>;
export type GetFormRequest = TypedRequestQuery<{ id: string }>;
export type FindManyFormsInput = {
  take?: number;
  skip?: number;
};

export type FindUniqueFormInput = {
  id: string;
};

export type UpdateFormInput = {
  id: string;
  data: {
    name?: string;
    description?: string;
    questions: {
      create: CreateQuestionInput[];
      update: UpdateQuestionInput[];
      delete: {
        id: string;
      }[];
    };
  };
};

export interface CreateQuestionUpdateForm {
  create: CreateQuestionInput;
}

export type UpdateQuestionUpdateForm = {
  update: UpdateQuestionInput;
};

export type DeleteQuestionUpdateForm = {
  delete: {
    id: string;
  };
};
