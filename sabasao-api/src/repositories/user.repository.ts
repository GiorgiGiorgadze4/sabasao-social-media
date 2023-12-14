import {dataSource} from "../config/database";
import { User } from "../models/user";

export const UserRepository = dataSource.getRepository(User).extend({});
