import { User } from "../models";
import dataSource from "../config/database";

export interface IUserPayload {
  firstName: string;
  lastName: string;
  email: string;
}

export const getUsers = async (): Promise<Array<User>> => {
  const userRepository = dataSource.getRepository(User);
  return userRepository.find();
};

export const createUser = async (payload: IUserPayload): Promise<User> => {
  const userRepository = dataSource.getRepository(User);
  const user = new User();
  return userRepository.save({
    ...user,
    ...payload,
  });
};

export const getUser = async (id: number): Promise<User | null> => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOne({ where : {id}});
  if (!user) return null;
  return user;
};