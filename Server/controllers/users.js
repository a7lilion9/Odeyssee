import { select, insert, remove } from "../db/sql/index.js";

export async function getAllUsers(req, res) {
  const { rows } = await select.getAllUsers();
  console.log("get /api/users");
  res.status(200).json(rows);
}

export async function addUser(req, res) {
  try {
    const id = req.body.user_id;
    const datetime = req.body.datetime;
    const fname = req.body.first_name;
    const lname = req.body.last_name;
    const username = req.body.username;
    const password = req.body.password;
    const role_id = req.body.role_id;
    const service_id = req.body.service_id;

    console.log("post /api/users/add", req.body.user_id);
    insert.user(
      id,
      datetime,
      fname,
      lname,
      username,
      password,
      role_id,
      service_id
    );
    res.status(201);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
  }
}

export async function removeUser(req, res) {
  try {
    console.log("post /api/users/remove", req.body.user_id);
    await remove.users(req.body.user_id);
    res.status(201);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
  }
}
