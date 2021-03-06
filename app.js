const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')
require('dotenv').config()

//db connection
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser : true,useUnifiedTopology : true,useCreateIndex:true}).then(()=>{
    console.log('db has been connected')
})
mongoose.connection.on('error',err =>{
    console.log(`DB Connection error:${err.message}`)
})
//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

//routes middlewares
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
//ports
const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});