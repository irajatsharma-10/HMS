import { Router } from "express";
import { getCurrentUser, addUser } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/role.auth.js";

const router = Router();

router.post("/register",auth, authorizeRoles("admin","staff"), addUser);
router.get("/current-user", auth, getCurrentUser);

export default router;