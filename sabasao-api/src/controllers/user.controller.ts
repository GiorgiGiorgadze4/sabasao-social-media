import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { User } from "../models";
import {
  getUsers,
  createUser,
  IUserPayload,
  getUser,
  registerUser,
  findUserByUsername,
  updateUserPassword,
} from "../repositories/user";
import bcryptjs from "bcryptjs";
import signJWT from "../functions/signJWT";

@Route("users")
@Tags("User")
export default class UserController {
  @Get("/")
  public async getUsers(): Promise<Array<User>> {
    return getUsers();
  }

  @Post("/")
  public async createUser(@Body() body: IUserPayload): Promise<User> {
    return createUser(body);
  }

  @Get("/:id")
  public async getUser(@Path() id: string): Promise<User | null> {
    return getUser(Number(id));
  }

  @Post("/register")
  public async register(
    @Body()
    body: {
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      password: string;
    }
  ): Promise<User> {
    return registerUser(body);
  }
  @Post("/login")
  public async login(
    @Body() body: { username: string; password: string }
  ): Promise<{ token: string; user: User }> {
    return new Promise(async (resolve, reject) => {
      const user = await findUserByUsername(body.username);
      if (!user) {
        reject(new Error("User not found"));
        return;
      }

      const match = await bcryptjs.compare(body.password, user.password);
      if (!match) {
        reject(new Error("Password mismatch"));
        return;
      }

      // For testing, return a static token instead of signing a JWT
      const staticToken = "ok";
      resolve({ token: staticToken, user });
    });
  }

  // @Post("/login")
  // public async login(@Body() body: { username: string; password: string }): Promise<{ token: string; user: User }> {
  //   return new Promise(async (resolve, reject) => {
  //     const user = await findUserByUsername(body.username);
  //     if (!user) {
  //       reject(new Error('User not found'));
  //       return;
  //     }

  //     const match = await bcryptjs.compare(body.password, user.password);
  //     if (!match) {
  //       reject(new Error('Password mismatch'));
  //       return;
  //     }

  //     signJWT(user, (error, token) => {
  //       if (error) {
  //         reject(error);
  //       } else if (token) {
  //         resolve({ token, user });
  //       } else {
  //         reject(new Error("Failed to sign the JWT"));
  //       }
  //     });
  //   });
  // }

  @Post("/reset-password")
  public async resetPassword(
    @Body() body: { userId: number; oldPassword: string; newPassword: string }
  ): Promise<void> {
    const user = await getUser(body.userId);
    if (!user) {
      throw new Error("User not found");
    }
    const match = await bcryptjs.compare(body.oldPassword, user.password);
    if (!match) {
      throw new Error("Old password does not match");
    }
    await updateUserPassword(body.userId, body.newPassword);
  }
}
