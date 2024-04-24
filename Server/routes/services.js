import e from "express";
import {
  getAllServices,
  addService,
  removeService,
} from "../controllers/services.js";

export const router = e.Router();

router.get("/", getAllServices);
router.post("/add", addService);
router.post("/remove", removeService);
