import e from "express";
import { getAllErrors, addError, removeError } from "../controllers/errors.js";

export const router = e.Router();

router.get("/", getAllErrors);
router.post("/add", addError);
router.post("/remove", removeError);
