import { IQuiz } from "./quiz.model";

export interface ILesson {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  file: any;
  quiz?: IQuiz;
}
