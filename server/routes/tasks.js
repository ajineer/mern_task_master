import { Router } from "express";
import {
  getTasks,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";

const router = Router();

router.get("/:id", getTasks);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
