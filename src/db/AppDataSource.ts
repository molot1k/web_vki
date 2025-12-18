import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Group } from './entity/Group.entity';
import { Student } from './entity/Student.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB ?? './db/vki-web.db', // Path to your SQLite database file
  entities: [Group, Student],
  synchronize: true, // Auto-create schema on startup (use with caution in production)
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

export default AppDataSource;
