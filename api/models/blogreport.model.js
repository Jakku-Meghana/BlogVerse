import mongoose from 'mongoose';

const blogReportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'dismissed'],
        default: 'pending'
    }
}, { timestamps: true });
blogReportSchema.index({ user: 1, blogId: 1 }, { unique: true });
const BlogReport = mongoose.model('BlogReport', blogReportSchema, 'blogreports');
export default BlogReport;