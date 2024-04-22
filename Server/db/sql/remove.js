import pool from "../pool.js";

const services = async (id) => {
  const res = await pool.query(
    `
  DELETE FROM Service
  WHERE service_id = $1
  `,
    [id]
  );
  console.log("Deleted rows: ", res.rowCount);
};

const roles = async (id) => {
  const res = await pool.query(
    `
  DELETE FROM Role
  WHERE role_id = $1
  `,
    [id]
  );
  console.log("Deleted rows: ", res.rowCount);
};

const users = async (id) => {
  const res = await pool.query(
    `
    DELETE FROM Users
    WHERE user_id = $1
  `,
    [id]
  );
  console.log("Deleted rows: ", res.rowCount);
};

const articletypes = async (id) => {
  const res = await pool.query(
    `
    DELETE FROM ArticleType
    WHERE type_id = $1
  `,
    [id]
  );
  console.log("Deleted rows: ", res.rowCount);
};

export default { services, roles, users, articletypes };
