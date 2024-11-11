const express = require("express")
const dotenv = require("dotenv").config()
const colors=require("colors")
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB=require("./config/db")
const port = process.env.PORT || 5000


connectDB()


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const router=require("./routes/goalRoutes")
app.use("/api/goals", router);


app.use(errorHandler)

app.listen(port, () => {
  console.log(`server started at port ${port}`);
})