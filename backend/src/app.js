import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js"; 

const app = express();


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));


app.use(cookieParser());


app.use(express.static("public"));


app.use("/api/v1", userRoutes);


app.use((err, _req, res, _next) => {
  if (err?.status === 413) {
    return res.status(413).json({
      success: false,
      message: "Payload too large"
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

export default app;