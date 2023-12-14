import { User } from "../models";
import {dataSource} from "../config/database";
import { UserRepository } from "./user.repository";
import bcryptjs from 'bcryptjs';
export interface IUserPayload {
  
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export const getUsers = async (): Promise<Array<User>> => {
  const userRepository = dataSource.getRepository(User);
  return userRepository.find();
};

export const createUser = async (payload: IUserPayload): Promise<User> => {
  const userRepository = dataSource.getRepository(User);
  const user = new User();
  const hashedPassword = await bcryptjs.hash(payload.password, 10);
  user.firstName = payload.firstName;
  console.log(payload.lastName,"user damateba test")
  user.lastName = payload.lastName; // Set the "lastName" field from the payload
  user.email = payload.email;
  user.username = payload.username;
  user.password = hashedPassword;

  return userRepository.save(user);
};

export const getUser = async (id: number): Promise<User | null> => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOne({ where : {id}});
  if (!user) return null;
  return user;
};

export const registerUser = async (payload: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}): Promise<User> => {
  const hashedPassword = await bcryptjs.hash(payload.password, 10);
  const newUser = UserRepository.create(); // Using UserRepository to create a new user instance
  newUser.firstName = payload.firstName;
  newUser.lastName = payload.lastName;
  newUser.email = payload.email;
  newUser.username = payload.username;
  newUser.password = hashedPassword; //
 
  return UserRepository.save(newUser); // Using UserRepository to save the new user
};

export const findUserByUsername = async (username: string): Promise<User | null> => {
  return UserRepository.findOne({ where: { username } });
};

export const updateUserPassword = async (userId: number, newPassword: string): Promise<void> => {
  const user = await UserRepository.findOne({ where: { id: userId } });
  if (user) {
    user.password = await bcryptjs.hash(newPassword, 10);
    await UserRepository.save(user);
  }
};

// Other utility functions as needed
