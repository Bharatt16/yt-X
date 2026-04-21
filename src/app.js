import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN, // it is used to allow the frontend to access the backend resources
    credientials : true // it is used to allow the frontend to send cookies to the backend
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb"}))//urlencoded is used to parse the data sent by the frontend in the form of key-value pairs, it is used when the frontend sends data in the form of x-www-form-urlencoded format
//extended : true is used to allow the frontend to send nested objects in the form of key-value pairs, it is used when the frontend sends data in the form of x-www-form-urlencoded format
app.use(express.static("public")) // it is used to serve static files like images, css files, js files etc. from the public folder
app.use(cookieParser())


export {app}