import { DataSource } from "typeorm";
import {User, Post, Comment} from '../models'
const dataSource = new DataSource( {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [User, Post, Comment],
  synchronize: true
});

export default dataSource;
