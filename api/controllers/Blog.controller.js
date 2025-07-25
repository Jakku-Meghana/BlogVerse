// import cloudinary from "../config/cloudinary.js"
// import { handleError } from "../helpers/handleError.js"
// import Blog from "../models/blog.model.js"
// import { encode } from 'entities'
// import Category from "../models/category.model.js"
// export const addBlog = async (req, res, next) => {
//     try {
//         const data = JSON.parse(req.body.data)
//         let featuredImage = ''
//         if (req.file) {
//             // Upload an image
//             const uploadResult = await cloudinary.uploader
//                 .upload(
//                     req.file.path,
//                     { folder: 'yt-mern-blog', resource_type: 'auto' }
//                 )
//                 .catch((error) => {
//                     next(handleError(500, error.message))
//                 });

//             featuredImage = uploadResult.secure_url
//         }
        
//         const blog = new Blog({
//             author: data.author,
//             category: data.category,
//             title: data.title,
//             slug: `${data.slug}-${Math.round(Math.random() * 100000)}`,
//             featuredImage: featuredImage,
//             blogContent: encode(data.blogContent),
//         })

//         await blog.save()

//         res.status(200).json({
//             success: true,
//             message: 'Blog added successfully.'
//         })

//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }
// export const editBlog = async (req, res, next) => {
//     try {
//         const { blogid } = req.params
//         const blog = await Blog.findById(blogid).populate('category', 'name')
//         if (!blog) {
//             next(handleError(404, 'Data not found.'))
//         }
//         res.status(200).json({
//             blog
//         })
//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }
// export const updateBlog = async (req, res, next) => {
//     try {
//         const { blogid } = req.params
//         const data = JSON.parse(req.body.data)

//         const blog = await Blog.findById(blogid)

//         blog.category = data.category
//         blog.title = data.title
//         blog.slug = data.slug
//         blog.blogContent = encode(data.blogContent)

//         let featuredImage = blog.featuredImage

//         if (req.file) {
//             // Upload an image
//             const uploadResult = await cloudinary.uploader
//                 .upload(
//                     req.file.path,
//                     { folder: 'yt-mern-blog', resource_type: 'auto' }
//                 )
//                 .catch((error) => {
//                     next(handleError(500, error.message))
//                 });

//             featuredImage = uploadResult.secure_url
//         }

//         blog.featuredImage = featuredImage

//         await blog.save()


//         res.status(200).json({
//             success: true,
//             message: 'Blog updated successfully.'
//         })

//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }
// export const deleteBlog = async (req, res, next) => {
//     try {
//         const { blogid } = req.params
//         await Blog.findByIdAndDelete(blogid)
//         res.status(200).json({
//             success: true,
//             message: 'Blog Deleted successfully.',
//         })
//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }
// export const showAllBlog = async (req, res, next) => {
//     try {
//         const user = req.user
//         let blog;
//         if (user.role === 'admin') {
//             blog = await Blog.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
//         } else {
//             blog = await Blog.find({ author: user._id }).populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
//         }
//         res.status(200).json({
//             blog
//         })
//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }

// export const getBlog = async (req, res, next) => {
//     try {
//         const { slug } = req.params
//         const blog = await Blog.findOne({ slug }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()
//         res.status(200).json({
//             blog
//         })
//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }

// export const getRelatedBlog = async (req, res, next) => {
//     try {
//         const { category, blog } = req.params

//         const categoryData = await Category.findOne({ slug: category })
//         if (!categoryData) {
//             return next(404, 'Category data not found.')
//         }
//         const categoryId = categoryData._id
//         const relatedBlog = await Blog.find({ category: categoryId, slug: { $ne: blog } }).lean().exec()
//         res.status(200).json({
//             relatedBlog
//         })
//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }

// export const getBlogByCategory = async (req, res, next) => {
//     try {
//         const { category } = req.params

//         const categoryData = await Category.findOne({ slug: category })
//         if (!categoryData) {
//             return next(404, 'Category data not found.')
//         }
//         const categoryId = categoryData._id
//         const blog = await Blog.find({ category: categoryId }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()
//         res.status(200).json({
//             blog,
//             categoryData
//         })
//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }
// export const search = async (req, res, next) => {
//     try {
//         const { q } = req.query

//         const blog = await Blog.find({ title: { $regex: q, $options: 'i' } }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()
//         res.status(200).json({
//             blog,
//         })
//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }

// export const getAllBlogs = async (req, res, next) => {
//     try {
//         const user = req.user
//         const blog = await Blog.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
//         res.status(200).json({
//             blog
//         })
//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }
import cloudinary from "../config/cloudinary.js"
import { handleError } from "../helpers/handleError.js"
import Blog from "../models/blog.model.js"
import { encode } from 'entities'
import Category from "../models/category.model.js"
import BlogReport from '../models/blogreport.model.js';

export const addBlog = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data)
        let featuredImage = ''
        if (req.file) {
            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'yt-mern-blog', resource_type: 'auto' }
                )
                .catch((error) => {
                    next(handleError(500, error.message))
                });

            featuredImage = uploadResult.secure_url
        }
        
        const blog = new Blog({
            author: data.author,
            category: data.category,
            title: data.title,
            slug: `${data.slug}-${Math.round(Math.random() * 100000)}`,
            featuredImage: featuredImage,
            blogContent: encode(data.blogContent),
        })

        await blog.save()

        res.status(200).json({
            success: true,
            message: 'Blog added successfully.'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const editBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const blog = await Blog.findById(blogid).populate('category', 'name')
        if (!blog) {
            next(handleError(404, 'Data not found.'))
        }
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const updateBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const data = JSON.parse(req.body.data)

        const blog = await Blog.findById(blogid)

        blog.category = data.category
        blog.title = data.title
        blog.slug = data.slug
        blog.blogContent = encode(data.blogContent)

        let featuredImage = blog.featuredImage

        if (req.file) {
            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'yt-mern-blog', resource_type: 'auto' }
                )
                .catch((error) => {
                    next(handleError(500, error.message))
                });

            featuredImage = uploadResult.secure_url
        }

        blog.featuredImage = featuredImage

        await blog.save()


        res.status(200).json({
            success: true,
            message: 'Blog updated successfully.'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const deleteBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        await Blog.findByIdAndDelete(blogid)
        res.status(200).json({
            success: true,
            message: 'Blog Deleted successfully.',
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const showAllBlog = async (req, res, next) => {
    try {
        const user = req.user
        let blog;
        if (user.role === 'admin') {
            blog = await Blog.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
        } else {
            blog = await Blog.find({ author: user._id }).populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
        }
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getBlog = async (req, res, next) => {
    try {
        const { slug } = req.params
        const blog = await Blog.findOne({ slug }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getRelatedBlog = async (req, res, next) => {
    try {
        const { category, blog } = req.params

        const categoryData = await Category.findOne({ slug: category })
        if (!categoryData) {
            return next(404, 'Category data not found.')
        }
        const categoryId = categoryData._id
        const relatedBlog = await Blog.find({ category: categoryId, slug: { $ne: blog } }).lean().exec()
        res.status(200).json({
            relatedBlog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getBlogByCategory = async (req, res, next) => {
    try {
        const { category } = req.params

        const categoryData = await Category.findOne({ slug: category })
        if (!categoryData) {
            return next(404, 'Category data not found.')
        }
        const categoryId = categoryData._id
        const blog = await Blog.find({ category: categoryId }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()
        res.status(200).json({
            blog,
            categoryData
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const search = async (req, res, next) => {
    try {
        const { q } = req.query

        const blog = await Blog.find({ title: { $regex: q, $options: 'i' } }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()
        res.status(200).json({
            blog,
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getAllBlogs = async (req, res, next) => {
    try {
        const user = req.user
        const blog = await Blog.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const reportBlog = async (req, res, next) => {
  try {
    const { userId, blogId, reason } = req.body;

    if (!userId || !blogId || !reason) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Optional: prevent duplicate reports by same user for same blog
    const alreadyReported = await BlogReport.findOne({ user: userId, blogId });
    if (alreadyReported) {
      return res.status(409).json({ message: 'You have already reported this blog.' });
    }

    const newReport = new BlogReport({
      user: userId,
      blogId,
      reason
    });

    await newReport.save();

    res.status(201).json({ message: 'Blog reported successfully.' });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const getAllReports = async (req, res, next) => {
  try {
    // Allow only admin to access this route
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const reports = await BlogReport.find()
      .populate('user', 'name')  // 🟢 Fix here
      .populate('blogId', 'title')
    //   .sort({ createdAt: -1 });

    res.status(200).json({reports });
  } catch (error) {
    next(handleError(500, error.message));
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