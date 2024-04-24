import { select, insert, remove } from "../db/sql/index.js";

export async function getAllItems(req, res) {
  const { rows } = await select.getAllItems();
  console.log("get /api/items");
  res.status(200).json(rows);
}

export async function addItem(req, res) {
  try {
    const id = req.body.item_id;
    const datetime = req.body.datetime;
    const code = req.body.code;
    const articleId = req.body.article_id;
    const userId = req.body.user_id;
    const errorId = req.body.error_id;
    console.log("post /api/items/add", req.body);
    insert.item(id, datetime, code, articleId, userId, errorId);
    res.status(201);
  } catch (e) {
    console.error(e);
    res.status(400);
  }
}

export async function removeItem(req, res) {
  try {
    console.log("post /api/items/remove", req.body);
    await remove.item(req.body.item_id);
  } catch (e) {
    console.error(e);
    res.status(400);
  }
}
