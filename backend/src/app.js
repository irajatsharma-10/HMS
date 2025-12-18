import express from "express"
import cookieparser from "cookie-parser"
import cors from "cors"


const app = express()


app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.static("public"))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieparser())
app.use((err,_req,res,_next)=>{
    if(err.status == 413){
        return res.json({
            success: false, 
            message: "payload overloaded"
        })
    }
})

export default app;
