import { IPost } from './post';

export interface IComment {
  id: number;
  content: string;
  userId: number;
  postID: number;
  post: IPost;
}
