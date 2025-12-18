import app from './app.js'

app.listen(3000,()=>{
    console.log(`App is listening on port ${3000}`);
})

app.get('/',(_req,res)=>{
    return res.json({
        success: true,
        message: "App is running successfully"
    })
})