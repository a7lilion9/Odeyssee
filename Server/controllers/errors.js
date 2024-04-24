import { select, insert, remove } from "../db/sql/index.js";

export async function getAllErrors(req, res) {
  const { rows } = await select.getAllErrors();
  console.log("get /api/errors");
  res.status(200).json(rows);
}

export async function addError(req, res) {
  try {
    const id = req.body.error_id;
    const datetime = req.body.datetime;
    const errorDesc = req.body.error_desc;
    const errorType = req.body.error_type;
    const serviceId = req.body.service_id;

    console.log("post /api/errors/add", req.body);
    insert.error(id, datetime, errorDesc, errorType, serviceId);
    res.status(201);
  } catch (e) {
    console.error(e);
    res.status(400);
  }
}

export async function removeError(req, res) {
  try {
    console.log("post /api/errors/remove", req.body);
    await remove.error(req.body.error_id);
    res.status(201);
  } catch (e) {
    console.error(e);
    res.status(400);
  }
}
