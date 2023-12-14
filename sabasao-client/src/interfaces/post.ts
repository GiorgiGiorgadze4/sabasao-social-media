import { IUser } from "./user";
import { IComment } from "./comment";

export interface IPost {
  id: number;
  title: string;
  content: string;
  userId: number;
  user: IUser;
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}
