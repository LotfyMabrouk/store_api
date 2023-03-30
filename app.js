require('dotenv').config()
//async errors
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const router = require('./routes/products')
const notFound = require('./middleware/not-found')
const error = require('./middleware/error-handler')

//middleware
app.use(express.json())

//routes

app.get('/' , (req , res)=>{
    res.send('<h1> Store API </h1><a href="/api/v1/products">Products route </a>')
})

app.use('/api/v1/products' , router)
app.use(notFound)
app.use(error)

const port = process.env.PORT || 3000

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen( port , console.log(`Server is running on port ${port}`))
    }
    catch(error){
        console.log(error);
    }
}
start()