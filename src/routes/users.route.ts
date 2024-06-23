import { Router } from "express";
import { addUser, getUsers } from "../controllers/users.controller";

const router = Router();

router.get("/", getUsers);
router.post("/", addUser);

export default router;
