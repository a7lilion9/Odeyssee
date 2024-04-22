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

const article = async (id) => {
  const res = await pool.query("DELETE FROM Article WHERE article_id = $1", [
    id,
  ]);
  console.log("Deleted rows: ", res.rowCount);
};

const error = async (id) => {
  const res = await pool.query("DELETE FROM Error WHERE error_id = $1", [id]);
  console.log("Deleted rows: ", res.rowCount);
};

const item = async (id) => {
  const res = await pool.query("DELETE FROM Items WHERE item_id = $1", [id]);
  console.log("Deleted rows: ", res.rowCount);
};

export default { services, roles, users, articletypes, article, error, item };
