import { TypedRequestBody } from '.';

export type CreateQuestionInput = {
  label: string;
  questionTypeId: number;
  order: number;
  options: CreateQuestionOptionInput[];
};

export type UpdateQuestionInput = {
  id: string;
  questionTypeId?: number;
  order?: number;
  label?: string;
  options?: {
    update: UpdateQuestionOptionInput[];
    create: CreateQuestionOptionInput[];
    delete: {
      id: string;
    }[];
  };
};

export type CreateQuestionOptionInput = {
  value: string;
  order: number;
};

export type UpdateQuestionOptionInput = {
  id: string;
  value?: string;
  order?: number;
};

export type CreateQuestionRequest = TypedRequestBody<CreateQuestionInput>;
