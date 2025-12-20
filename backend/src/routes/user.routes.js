import { Router } from "express";
import { login, student, staff, admin, addUser } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/role.auth.js"

const router = Router();

router.post("/adduser", auth, authorizeRoles("admin"), addUser);
router.post("/login", login);
router.get("/student", auth, authorizeRoles("student"), student);
router.get("/admin", auth, authorizeRoles("admin"), admin);
router.get("/staff", auth, authorizeRoles("staff"), staff);

export default router;