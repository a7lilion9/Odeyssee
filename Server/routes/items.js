import e from "express";
import { getAllItems, addItem, removeItem } from "../controllers/items.js";

export const router = e.Router();

router.get("/", getAllItems);
router.post("/add", addItem);
router.post("/remove", removeItem);
