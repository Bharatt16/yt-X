import dotenv from 'dotenv'
dotenv.config({path: './.env'})

import mongoose from 'mongoose'
import { DB_NAME } from './constants.js'
import express from 'express'
import connectDB from './db/index.js'
import { app } from './app.js'

// const app = express()

// Connect to database
connectDB()
.then(()=>{
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGODB CONNECTION FAILED!!! : ",err)
})

// Start server
















// ( async ()=>{               //THIS APPROACH SHOULD NOT BE USED 
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//         app.on("error",()=>{
//             console.log("Errror : ",error)
//             throw error
//         })


//         app.listen(process.env.PORT , ()=>{
//             console.log(`app is listening on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//          console.error("Error : ",error)
//          throw err
//     }
// })()
