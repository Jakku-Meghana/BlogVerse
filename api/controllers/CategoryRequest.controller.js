import CategoryRequest from '../models/categoryrequest.model.js';
import Category from '../models/category.model.js';
import { handleError } from '../helpers/handleError.js';
import slugify from 'slugify';

// 1. User requests a new category
export const requestCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;

    if (!name) {
      return next(handleError(400, 'Category name is required.'));
    }

    const existing = await CategoryRequest.findOne({ name, status: 'pending' });
    if (existing) {
      return next(handleError(409, 'This category has already been requested.'));
    }

    const request = new CategoryRequest({ name, requestedBy: userId });
    await request.save();

    res.status(201).json({ success: true, message: 'Category request submitted.' });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// 2. Admin fetches all pending category requests
export const getRequestedCategories = async (req, res, next) => {
  try {
    const pendingRequests = await CategoryRequest.find({ status: 'pending' })
      .populate('requestedBy', 'username email')
      .sort({ requestedAt: -1 });

    res.status(200).json({ success: true, data: pendingRequests });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// 3. Admin approves a request and adds it to main categories
export const approveCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const request = await CategoryRequest.findById(id);
    if (!request) {
      return next(handleError(404, 'Requested category not found.'));
    }

    const categoryExists = await Category.findOne({ name: request.name });
    if (categoryExists) {
      return next(handleError(409, 'Category already exists in main list.'));
    }

    const slug = slugify(request.name, { lower: true, strict: true });
    const newCategory = new Category({ name: request.name, slug });
    await newCategory.save();

    request.status = 'approved';
    await request.save();

    res.status(200).json({
      success: true,
      message: 'Category approved and added to main list.',
      category: newCategory,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
