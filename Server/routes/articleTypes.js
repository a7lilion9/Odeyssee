import e from "express";
import {
  getAllArticleTypes,
  addArticleType,
  removeArticleType,
} from "../controllers/articleTypes.js";

export const router = e.Router();

router.get("/", getAllArticleTypes);
router.post("/add", addArticleType);
router.post("/remove", removeArticleType);
