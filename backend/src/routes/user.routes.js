import { Router } from "express";
import { login, student, staff, admin } from "../controllers/user.controller.js";
import { auth, isStaff, isAdmin, isStudent } from "../middlewares/auth.js";

const router = Router();

router.post("/login", login);
router.post("/student", auth, isStudent, student);
router.post("/admin", auth, isAdmin, admin);
router.post("/staff", auth, isStaff, staff);

export default router;