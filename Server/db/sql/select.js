import pool from "../pool.js";

const getAllTables = async () => {
  return await pool.query(`
    SELECT table_name as table
    FROM information_schema.tables
    WHERE table_schema = 'public';
  `);
};

const getAllRoles = async () => {
  return await pool.query(`
    SELECT * FROM Role;
  `);
};

const getAllServices = async () => {
  return await pool.query(`
    SELECT * FROM Service;
  `);
};

const getAllUsers = async () => {
  return await pool.query(`
    SELECT * FROM Users 
    INNER JOIN Role on Users.role_id = Role.role_id
    INNER JOIN Service on Users.service_id = Service.service_id;
  `);
};

const getAllArticleTypes = async () => {
  return await pool.query(`
    SELECT * FROM ArticleType;
  `);
};

const getAllArticles = async () => {
  return await pool.query(`
    SELECT * FROM Article
    INNER JOIN ArticleType ON ArticleType.type_id = Article.type_id;
  `);
};

const getAllErrors = async () => {
  return await pool.query(`
  SELECT * FROM Error 
  INNER JOIN Service ON Service.service_id = Error.service_id;`);
};

const getAllItems = async () => {
  return await pool.query(`
    SELECT * FROM Items
    INNER JOIN Article ON Article.article_id = Items.article_id
    INNER JOIN Users   ON Users.user_id      = Items.user_id
    INNER JOIN Error   ON Error.error_id     = Items.error_id;
  `);
};

export default {
  getAllItems,
  getAllErrors,
  getAllArticles,
  getAllArticleTypes,
  getAllUsers,
  getAllTables,
  getAllRoles,
  getAllServices,
};
