import express from "express"
import mongoose from "mongoose"
import bp from "body-parser"
import gazdaRouter from "./routers/gazdaRouter.js"
import cors from "cors"
import kutyaRouter from "./routers/kutyaRouter.js"



const app = express()
const PORT = 5004



app.use(bp.json({limit: '50mb'}))
app.use(bp.urlencoded({ extended: true }))


var db = "mongodb://kutya:cica@localhost:27017/kutyagazda";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const conSuccess = mongoose.connection
conSuccess.once('open', _ => {
  console.log('Database connected:', db)
})

conSuccess.on('error', err => {
  console.error('connection error:', err)
})

app.use(cors({origin: '*'}));


app.use('/api/gazda',gazdaRouter)
app.use('/api/kutya',kutyaRouter)

app.listen(PORT,()=>{
    console.log("The server has been created! Port: "+PORT);
})

