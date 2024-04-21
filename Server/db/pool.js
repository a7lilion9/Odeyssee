import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: 'localhost',
  database: 'mydb',
  user: 'postgres',
  password: '1q@W#E$R%',
  port: 5432,
})

export default pool