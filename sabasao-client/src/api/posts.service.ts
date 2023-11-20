import apiClient from '../apiClient';
import {ICreatePostData} from "../interfaces/post"


export const fetchPosts = async () => {
  try {
    const response = await apiClient.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const createPost = async (data: ICreatePostData) => {
  try {
    const response = await apiClient.post('/posts', data);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
