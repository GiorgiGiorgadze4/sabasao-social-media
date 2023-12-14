import { IPost } from "./post";
import { IComment } from "./comment";
export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    posts: IPost[];
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
  }
  