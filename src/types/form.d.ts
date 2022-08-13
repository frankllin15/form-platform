import { TypedRequestBody } from ".";
import { CreateQuestionInput } from "./questions";

export type CreateFormInput = {
  name: string;
  description: string | null;
  questions: CreateQuestionInput[];
};

export type CreateFormRequest = TypedRequestBody<CreateFormInput>;
