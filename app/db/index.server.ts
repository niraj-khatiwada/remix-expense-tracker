import pg, { type QueryResult } from "pg";

const DB_PORT = process.env.DATABASE_PORT as string;
const pool = new pg.Pool({
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: DB_PORT?.length > 0 && !isNaN(+DB_PORT) ? +DB_PORT : 5432,
  max: 100,
  idleTimeoutMillis: 1,
  connectionTimeoutMillis: 10000,
});

async function query(sql: string): Promise<QueryResult> {
  return pool.query(sql);
}

export default { query };
