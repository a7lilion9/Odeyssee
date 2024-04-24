import e from "express";
import { getAllUsers, addUser, removeUser } from "../controllers/users.js";

export const router = e.Router();

router.get("/", getAllUsers);
router.post("/add", addUser);
router.post("/remove", removeUser);
