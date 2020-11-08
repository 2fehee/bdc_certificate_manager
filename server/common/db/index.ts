import mariadb, { PoolConnection } from 'mariadb';
import { connectSequelize } from './sequelize';
import l from '../logger';

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5,
  acquireTimeout: 60000,
  connectTimeout: 60000,
});

export default async function connectDB(): Promise<void> {
  let conn: PoolConnection;
  try {
    conn = await pool.getConnection();
    l.info('MariaDB Connected.');
    await connectSequelize();
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
}
