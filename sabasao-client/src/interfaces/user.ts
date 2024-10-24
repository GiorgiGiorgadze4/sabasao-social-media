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
export interface IloggedUser {
  createdAt: string; // ISO date string format
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  password: string; // If you want to include the password field
  updatedAt: string; // ISO date string format
  username: string;
}
export type NullableIloggedUser = IloggedUser | null;
