import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import AuthRoute from './routes/Auth.route.js'
import UserRoute from './routes/User.route.js'
import CategoryRoute from './routes/Category.route.js'
import BlogRoute from './routes/Blog.route.js'
import CommentRouote from './routes/Comment.route.js'
import BlogLikeRoute from './routes/Bloglike.route.js'
import CategoryRequestRoute from './routes/categoryRequest.route.js' //  New route
import AdminRoute from  './routes/Admin.route.js';

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

// route setup  
app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/category', CategoryRoute)
app.use('/api/blog', BlogRoute)
app.use('/api/comment', CommentRouote)
app.use('/api/blog-like', BlogLikeRoute)
app.use('/api/category-requests', CategoryRequestRoute) //  New route
app.use('/api/report', AdminRoute)

// MongoDB connection
mongoose.connect(process.env.MONGODB_CONN, { dbName: 'mern-blog' })
    .then(() => console.log('Database connected.'))
    .catch(err => console.log('Database connection failed.', err))

// Error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error.'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(PORT, () => {
    console.log('Server running on port:', PORT)
})
