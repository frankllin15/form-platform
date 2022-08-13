import { TypedRequestBody } from ".";

export type CreateQuestionInput = {
  text: string;
  options: CreateQuestionOptionInput[];
};

export type CreateQuestionOptionInput = {
  text: string;
  answer: boolean;
  // order: number;
};

export type CreateQuestionRequest = TypedRequestBody<CreateQuestionInput>;
