import jwt from "jsonwebtoken";
import config from "../config/database";
import { Request, Response, NextFunction } from "express";

const userAuth = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];
console.log("omag");
if (token) {
  if (token === "ok") { // Check if the token matches the hardcoded value
    next(); // Token is valid, proceed to the next middleware
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
} else {
  return res.status(401).json({ message: "No token provided" });
}
};
//   if (token) {
//     jwt.verify(token, config.server.token.secret, (error, decoded) => {
//       if (error) {
//         return res.status(402).json({
//           message: "Unauthorizedddd",
//         });
//       } else {
//         res.locals.jwt = decoded;
//         next();
//       }
//     });
//   } else {
//     return res.status(401).json({
      
//       message: "Unauthorizedddd no token",
//     });
//   }
// };

export default userAuth;
