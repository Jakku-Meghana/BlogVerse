import { handleError } from "../helpers/handleError.js"
import Category from "../models/category.model.js"
// export const addCategory = async (req, res, next) => {
//     try {
//         const { name, slug } = req.body
//         const category = new Category({
//             name, slug
//         })

//         await category.save()

//         res.status(200).json({
//             success: true,
//             message: 'Category added successfully.'
//         })

//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }

export const addCategory = async (req, res, next) => {
    try {
        let { name, slug } = req.body
        console.log(req.body)
        if (!name) {
            return next(handleError(400, "Category name is required."))
        }

        // Generate slug from name if not provided
        if (!slug) {
            slug = slugify(name, { lower: true, strict: true })
        }

        const category = new Category({ name, slug })
        await category.save()

        res.status(200).json({
            success: true,
            message: 'Category added successfully.'
        })

    } catch (error) {
        // Mongoose validation or unique constraint errors
        console.error("Add Category Error:", error);
        if (error.name === "ValidationError" || error.code === 11000) {
            return next(handleError(400, error.message))
        }
        next(handleError(500, error.message))
    }
}
export const showCategory = async (req, res, next) => {
    try {
        const { categoryid } = req.params
        const category = await Category.findById(categoryid)
        if (!category) {
            next(handleError(404, 'Data not found.'))
        }
        res.status(200).json({
            category
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const updateCategory = async (req, res, next) => {
    try {
        const { name, slug } = req.body
        const { categoryid } = req.params
        const category = await Category.findByIdAndUpdate(categoryid, {
            name, slug
        }, { new: true })

        res.status(200).json({
            success: true,
            message: 'Category updated successfully.',
            category
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const deleteCategory = async (req, res, next) => {
    try {
        const { categoryid } = req.params
        await Category.findByIdAndDelete(categoryid)
        res.status(200).json({
            success: true,
            message: 'Category Deleted successfully.',
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const getAllCategory = async (req, res, next) => {
    try {
        const category = await Category.find().sort({ name: 1 }).lean().exec()
        res.status(200).json({
            success: true,
            category
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}