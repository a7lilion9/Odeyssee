import { select, insert, remove } from "../db/sql/index.js";

export async function getAllRoles(req, res) {
  const { rows } = await select.getAllRoles();
  console.log("get /api/roles");
  res.status(200).json(rows);
}

export async function addRole(req, res) {
  try {
    console.log("post /api/roles/add", req.body.role_id);
    insert.role(req.body.role_id, req.body.datetime, req.body.role_name);
    res.status(201);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
  }
}

export async function removeRole(req, res) {
  try {
    console.log("post /api/roles/remove", req.body.role_id);
    await remove.roles(req.body.role_id);
    res.status(201);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
  }
}
