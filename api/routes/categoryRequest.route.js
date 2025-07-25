import express from 'express';
import { requestCategory, getRequestedCategories, approveCategory } from '../controllers/CategoryRequest.controller.js';
import {authenticate} from '../middleware/authenticate.js';;
import {onlyadmin} from '../middleware/onlyadmin.js';

const router = express.Router();

// User requests a new category
router.post('/request', authenticate, requestCategory);

// Admin gets all pending requests
router.get('/pending', authenticate, onlyadmin, getRequestedCategories);

// Admin approves a category request
router.patch('/approve/:id', authenticate, onlyadmin, approveCategory);

export default router;
