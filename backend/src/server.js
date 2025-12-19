import app from './app.js'
import dotenv from "dotenv"
import dbConnect from './config/dbConnect.js';


dotenv.config();
dbConnect().then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at port: ${process.env.PORT}`);
  });
}).catch((error)=>{
    console.log("MONGODB connection failed", error)
})