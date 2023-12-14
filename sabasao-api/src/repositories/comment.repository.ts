import {dataSource} from "../config/database";
import { Comment } from "../models";

export interface ICommentPayload {
  content: string;
  userId: number;
  postId: number;
}

export const getComments = async (): Promise<Array<Comment>> => {
  const commentRepository =  dataSource.getRepository(Comment);
  return commentRepository.find();
};

export const createComment = async (
  payload: ICommentPayload
): Promise<Comment> => {
  const commentRepository =  dataSource.getRepository(Comment);
  const comment = new Comment();
  return commentRepository.save({
    ...comment,
    ...payload,
  });
};

export const getComment = async (id: number): Promise<Comment | null> => {
  const commentRepository =  dataSource.getRepository(Comment);
  const comment = await commentRepository.findOne({ where: {id} });
  if (!comment) return null;
  return comment;
};