let express = require("express")
let mongoose = require("mongoose")
const userRouter = require("./router/userRoute")
const errorHandler = require("./middlewares/errorHandler")
const categoryRouter = require("./router/categoryRoute")
const transactionRouter = require("./router/transactionRoute")
let cors = require('cors')
let app = express()

//? middlewares
app.use(express.json())

//? cors configuration
let corsOption={
    origin:['http://localhost:5173'],
}
app.use(cors(corsOption))

//? connect to DB
mongoose.connect("mongodb+srv://omdalvi1904:MjppXhuCEA8bEOGx@firstdb.ldmseda.mongodb.net/expense-tracker")
.then(()=>{
    console.log("DB connected successfully.");
})
.catch((e)=>{
    console.log(e);
})

//? routes
app.use("/",userRouter)
app.use("/",categoryRouter)
app.use("/",transactionRouter)
app.use(errorHandler)

//? start the server
let port = 8000
app.listen(port,()=>{console.log(`Server is live on http://localhost:${port}`)})