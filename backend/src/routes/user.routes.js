import { Router } from "express";
import { login, addData, allData, student, staff, admin } from "../controllers/user.controller.js";
import { auth, isStaff, isAdmin, isStudent } from "../middlewares/auth.js";

const router = Router();

router.get("/",allData);
router.post("/add", addData)
router.post("/login", login);
router.get("/student", auth, isStudent, student);
router.get("/admin", auth, isAdmin, admin);
router.get("/staff", auth, isStaff, staff);

export default router;