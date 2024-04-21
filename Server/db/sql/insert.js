import pool from "../pool.js";

const service = async (service_id, datetime, service_name) => {
  await pool.query(`
  INSERT INTO Service (service_id, datetime, service_name)
  VALUES ('${service_id}', '${datetime}', '${service_name}')
  `)
}

const role = async (role_id, datetime, role_name) => {
  await pool.query(`
    INSERT INTO Role (role_id, datetime, role_name)
    VALUES ('${role_id}', '${datetime}', '${role_name}')
  `)
}

const user = async (user_id, datetime, fname, lname, username, password, role_id, service_id) => {
  await pool.query(`
    INSERT INTO Users (user_id, datetime, first_name, last_name, username, password, role_id, service_id)
    VALUES ('${user_id}', '${datetime}', '${fname}', '${lname}', '${username}', '${password}', '${role_id}', '${service_id}')
  `)
}

export default {service, role, user}