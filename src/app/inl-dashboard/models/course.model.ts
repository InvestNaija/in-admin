import { ICategory } from "./category.model";
import { ILesson } from "./lesson.model";

export interface ICourse {
  id?: string,
  provider_id: string,
  category_id: string,
  title: string,
  image: string,
  level: string,
  status: string,
  course_fee: string,
  publish_date: string,
  description: string,
  provider: any,
  category?: ICategory,
  lessons?: ILesson[];
}
