import dataSource from "../config/database";
import { Post } from "../models";

export interface IPostPayload {
  title: string;
  content: string;
  userId: number;
}

export const getPosts = async (): Promise<Array<Post>> => {
  const postRepository = dataSource.getRepository(Post);
  return postRepository.find();
};

export const createPost = async (payload: IPostPayload): Promise<Post> => {
  const postRepository = dataSource.getRepository(Post);
  const post = new Post();
  return postRepository.save({
    ...post,
    ...payload,
  });
};

export const getPost = async (id: number): Promise<Post | null> => {
  const postRepository = dataSource.getRepository(Post);
  const post = await postRepository.findOne({ where: {id} });
  if (!post) return null;
  return post;
};