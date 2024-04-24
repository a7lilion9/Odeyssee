import { select, insert, remove } from "../db/sql/index.js";

export async function getAllArticleTypes(req, res) {
  const { rows } = await select.getAllArticleTypes();
  console.log("get /api/aticletypes");
  res.status(200).json(rows);
}

export async function addArticleType(req, res) {
  try {
    const id = req.body.type_id;
    const datetime = req.body.datetime;
    const typeName = req.body.type_name;

    console.log("post /api/aticletypes/add", req.body);
    insert.articletype(id, datetime, typeName);
    res.status(201);
  } catch (e) {
    console.error(e);
    res.status(400);
  }
}

export async function removeArticleType(req, res) {
  try {
    console.log("post /api/articletype/remove", req.body.type_id);
    await remove.articletypes(req.body.type_id);
    res.status(201);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
  }
}
