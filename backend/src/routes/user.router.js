import {Router} from "express"
import {Student, Admin, Staff} from "../controllers/user.controller"
import { auth, isStaff, isAdmin, isStudent } from "../middlewares/auth";

const router = Router();

router.post("/student", auth, isStudent, Student)
router.post("/admin", auth, isAdmin, Admin)
router.post("/staff", auth, isStaff, Staff)
