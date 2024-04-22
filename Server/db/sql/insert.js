import pool from "../pool.js";

const service = async (service_id, datetime, service_name) => {
  await pool.query(
    `
  INSERT INTO Service (service_id, datetime, service_name)
  VALUES ($1, $2, $3)
  `,
    [service_id, datetime, service_name]
  );
};

const role = async (role_id, datetime, role_name) => {
  await pool.query(
    `
    INSERT INTO Role (role_id, datetime, role_name)
    VALUES ($1, $2, $3)
  `,
    [role_id, datetime, role_name]
  );
};

const user = async (
  user_id,
  datetime,
  fname,
  lname,
  username,
  password,
  role_id,
  service_id
) => {
  await pool.query(
    `
    INSERT INTO Users (user_id, datetime, first_name, last_name, username, password, role_id, service_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `,
    [user_id, datetime, fname, lname, username, password, role_id, service_id]
  );
};

const articletype = async (type_id, datetime, type_name) => {
  await pool.query(
    `
    INSERT INTO ArticleType (type_id, datetime, type_name)
    VALUES ($1, $2, $3)
  `,
    [type_id, datetime, type_name]
  );
};

const article = async (article_id, datetime, article_name, type_id) => {
  await pool.query(
    `
    INSERT INTO Article (article_id, datetime, article_name, type_id)
    VALUES ($1, $2, $3, $4)
    `,
    [article_id, datetime, article_name, type_id]
  );
};

const error = async (
  error_id,
  datetime,
  error_desc,
  error_type,
  service_id
) => {
  await pool.query(
    `
    INSERT INTO Error (error_id, datetime, error_desc, error_type, service_id)
     VALUES ($1, $2, $3, $4, $5)
    `,
    [error_id, datetime, error_desc, error_type, service_id]
  );
};

const item = async (item_id, datetime, code, article_id, user_id, error_id) => {
  await pool.query(
    `INSERT INTO Items (item_id, datetime, code, article_id, user_id, error_id)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [item_id, datetime, code, article_id, user_id, error_id]
  );
};

export default { service, role, user, articletype, article, error, item };
