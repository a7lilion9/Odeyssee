import e from "express";
import {
  getAllArticles,
  addArticle,
  removeArticle,
} from "../controllers/articles.js";

export const router = e.Router();

router.get("/", getAllArticles);
router.post("/add", addArticle);
router.post("/remove", removeArticle);
