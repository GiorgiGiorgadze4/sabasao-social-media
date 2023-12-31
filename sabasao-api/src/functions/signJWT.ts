import jwt from "jsonwebtoken";
import config from "../config/database";
import { User } from "../models/user";

const signJWT = (
  user: User,
  callback: (error: Error | null, token: string | null) => void
): void => {
  var timeSinceEpoch = new Date().getTime();
  var expirationTime =
    timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
  var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  try {
    jwt.sign(
      {
        userId: user.id,
        // username: user.username,
      },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error: any) {
    callback(error, null);
  }
};

export default signJWT;
