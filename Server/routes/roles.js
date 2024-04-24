import e from "express";
import { getAllRoles, addRole, removeRole } from "../controllers/roles.js";

export const router = e.Router();

router.get("/", getAllRoles);
router.post("/add", addRole);
router.post("/remove", removeRole);
