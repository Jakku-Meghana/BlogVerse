// routes/Admin.route.js

import express from 'express';
import {
  getReportedBlogs,
  getReportedBlogById,
  deleteBlogAndReports,
  updateReportStatus
} from '../controllers/Admin.controller.js';
import { onlyadmin } from '../middleware/onlyadmin.js';

const AdminRoute = express.Router();

// Route to get all reported blogs (Admin only)
AdminRoute.get('/reports', onlyadmin, getReportedBlogs);

// Route to get a specific reported blog by ID (Admin only)
AdminRoute.get('/report/:blogid', onlyadmin, getReportedBlogById);

// Route to delete a blog and its reports (Admin only)
AdminRoute.delete('/delete-blog/:blogid', onlyadmin, deleteBlogAndReports);

AdminRoute.put('/reports/:reportid', onlyadmin, updateReportStatus);
export default AdminRoute;