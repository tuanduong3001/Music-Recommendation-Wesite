import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv'
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER_NAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  migrations: ['dist/src/migrations/*.js'],
  entities: ['dist/src/entities/*entity.js'],
  cli:{
    migrationsDir: 'src/migrations'
  },
  logging: true,
  migrationsRun: false,
  migrationsTableName: 'history',
  timezone: 'utc', 
} as DataSourceOptions);
