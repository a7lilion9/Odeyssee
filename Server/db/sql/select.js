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

export default {
  getAllArticleTypes,
  getAllUsers,
  getAllTables,
  getAllRoles,
  getAllServices,
};
