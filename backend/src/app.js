import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import studentRoutes from "./routes/student.routes.js";
import announcementRoutes from "./routes/announcement.routes.js";
import leaveRequestRoutes from "./routes/leave_request.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import issueRoutes from "./routes/issue.routes.js";
import issueCommentRoutes from "./routes/issue_comment.routes.js";
import disciplinaryCaseRoutes from "./routes/disciplinary_case.routes.js";

import { login ,logout} from "./controllers/user.controller.js";

const app = express();

/* -------------------- MIDDLEWARES -------------------- */
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());



/* -------------------- AUTH -------------------- */
app.post("/api/v1/login",login);
app.post("/api/v1/logout", logout)

/* -------------------- ROUTES -------------------- */
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/announcements", announcementRoutes);
app.use("/api/v1/leave-requests", leaveRequestRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/issues", issueRoutes);
app.use("/api/v1/issue-comments", issueCommentRoutes);
app.use("/api/v1/disciplinary-cases", disciplinaryCaseRoutes);

/* -------------------- HEALTH CHECK -------------------- */
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running"
  });
});

/* -------------------- 404 HANDLER -------------------- */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

export default app;