// import express from 'express'
// import { addBlog, deleteBlog, editBlog, getAllBlogs, getBlog, getBlogByCategory, getRelatedBlog, search, showAllBlog, updateBlog } from '../controllers/Blog.controller.js'
// import upload from '../config/multer.js'
// import { authenticate } from '../middleware/authenticate.js'

// const BlogRoute = express.Router()

// BlogRoute.post('/add', authenticate, upload.single('file'), addBlog)
// BlogRoute.get('/edit/:blogid', authenticate, editBlog)
// BlogRoute.put('/update/:blogid', authenticate, upload.single('file'), updateBlog)
// BlogRoute.delete('/delete/:blogid', authenticate, deleteBlog)
// BlogRoute.get('/get-all', authenticate, showAllBlog)

// BlogRoute.get('/get-blog/:slug', getBlog)
// BlogRoute.get('/get-related-blog/:category/:blog', getRelatedBlog)
// BlogRoute.get('/get-blog-by-category/:category', getBlogByCategory)
// BlogRoute.get('/search', search)

// BlogRoute.get('/blogs', getAllBlogs)

// export default BlogRoute
import express from 'express'
import { addBlog, deleteBlog, editBlog, getAllBlogs, getBlog, getBlogByCategory, getRelatedBlog, search, showAllBlog, updateBlog, reportBlog, getAllReports,updateReportStatus } from '../controllers/Blog.controller.js'
import upload from '../config/multer.js'
import { authenticate } from '../middleware/authenticate.js'

const BlogRoute = express.Router()

BlogRoute.post('/add', authenticate, upload.single('file'), addBlog)
BlogRoute.get('/edit/:blogid', authenticate, editBlog)
BlogRoute.put('/update/:blogid', authenticate, upload.single('file'), updateBlog)
BlogRoute.delete('/delete/:blogid', authenticate, deleteBlog)
BlogRoute.get('/get-all', authenticate, showAllBlog)

BlogRoute.get('/get-blog/:slug', getBlog)
BlogRoute.get('/get-related-blog/:category/:blog', getRelatedBlog)
BlogRoute.get('/get-blog-by-category/:category', getBlogByCategory)
BlogRoute.get('/search', search)
BlogRoute.post('/report', authenticate, reportBlog);
BlogRoute.get('/blogs',getAllBlogs)
BlogRoute.get('/reports', authenticate, getAllReports); // protected route
BlogRoute.put('/reports/:reportid', authenticate, updateReportStatus);

export default BlogRoute