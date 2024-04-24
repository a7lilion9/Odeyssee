import { select, insert, remove } from "../db/sql/index.js";

export async function getAllArticles(req, res) {
  const { rows } = await select.getAllArticles();
  console.log("get /api/articles");
  res.status(200).json(rows);
}

export async function addArticle(req, res) {
  try {
    const id = req.body.article_id;
    const datetime = req.body.datetime;
    const articleName = req.body.article_name;
    const typeId = req.body.type_id;

    console.log("post /api/articles/add", req.body);
    insert.article(id, datetime, articleName, typeId);
    res.status(201);
  } catch (e) {
    console.error(e);
    res.status(400);
  }
}

export async function removeArticle(req, res) {
  try {
    console.log("post /api/aticles/remove", req.body.article_id);
    await remove.article(req.body.article_id);
    res.status(201);
  } catch (e) {
    console.error(e);
    res.status(400);
  }
}
