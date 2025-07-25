import BlogReport from '../models/blogreport.model.js';
import Blog from '../models/blog.model.js';
import { handleError } from '../helpers/handleError.js';

// Get all reported blogs
export const getReportedBlogs = async (req, res, next) => {
  try {
    const reports = await BlogReport.find()
      .populate('user', 'name')
      .populate('blogId', 'title');

    res.status(200).json(reports);
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Delete a blog and its reports
export const deleteBlogAndReports = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    // Delete the blog
    await Blog.findByIdAndDelete(blogId);

    // Delete associated reports
    await BlogReport.deleteMany({ blogId });

    res.status(200).json({ message: 'Blog and its reports deleted.' });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Get a single reported blog by blogId
export const getReportedBlogById = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    const report = await BlogReport.findOne({ blogId })
      .populate('user', 'username')
      .populate('blogId', 'title content'); // Add other fields if needed

    if (!report) {
      return res.status(404).json({ message: 'No report found for this blog.' });
    }

    res.status(200).json(report);
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
      .populate('author')
      .populate('category');

    const isAdmin = req.user?.role === 'admin';

    const blogList = await Promise.all(
      blogs.map(async (blog) => {
        const blogObj = blog.toObject();
        if (isAdmin) {
          const reportCount = await BlogReport.countDocuments({ blogId: blog._id });
          blogObj.reportCount = reportCount;
        }
        return blogObj;
      })
    );

    res.status(200).json({ blog: blogList });
  } catch (err) {
    next(handleError(500, err.message));
  }
};


export const updateReportStatus = async (req, res) => {
  try {
    const { reportid } = req.params; // renamed from blogid
    const { status } = req.body;

    const updatedReport = await BlogReport.findByIdAndUpdate(
      reportid,
      { status },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ message: 'Report status updated', report: updatedReport });
  } catch (error) {
    res.status(500).json({ message: 'Error updating report status' });
  }
};