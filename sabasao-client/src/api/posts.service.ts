import apiClient from "../apiClient";
import { ICreatePostData } from "../interfaces/createPostData";

export const fetchPosts = async () => {
  try {
    const response = await apiClient.get("/posts");
    console.log("bobama");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const createPost = async (data: ICreatePostData, token: string) => {
  try {
    const response = await apiClient.post("/posts", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
