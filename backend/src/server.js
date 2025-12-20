import app from "./app.js";
import dbConnect from "./config/dbConnect.js";
import dotenv from "dotenv";


dotenv.config();

const PORT = process.env.PORT || 8000;

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Server startup failed", error);
    process.exit(1);
  });
