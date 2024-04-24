import { select, insert, remove } from "../db/sql/index.js";

export async function getAllServices(req, res) {
  const { rows } = await select.getAllServices();
  console.log("get /api/services");
  res.status(200).json(rows);
}

export async function addService(req, res) {
  try {
    console.log("post /api/services/add", req.body);
    insert.service(
      req.body.service_id,
      req.body.datetime,
      req.body.service_name
    );
    res.status(201);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
  }
}

export async function removeService(req, res) {
  try {
    console.log("post /api/services/remove", req.body.service_id);
    await remove.services(req.body.service_id);
    res.status(201);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
  }
}
