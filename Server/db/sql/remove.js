import pool from "../pool.js";

const services = async (id) => {
  await pool.query(`
  DELETE FROM Service
  WHERE service_id = ${id}
  `)
}

const roles = async (id) => {
  await pool.query(`
  DELETE FROM Role
  WHERE role_id = ${id}
  `)
}

const users = async(id) => {
  await pool.query(`
    DELETE FROM Users
    WHERE user_id = ${id}
  `)
}

export default {services, roles, users}