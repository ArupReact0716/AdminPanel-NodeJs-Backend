// import  Product Category Schema
import ProductCategoryScema from "./ProductCategoryScema.js";
import CategoryFilter from "./CategoryFilter.js";
import ErrorHandler from "../../utils/ErrorHandler.js";

export const CreateCategory = async (req, res, next) => {
    try {
        // check duplicate slug
        const category_slug = await ProductCategoryScema.findOne({
            category_slug: req.body.category_slug
        });
        if (category_slug) return next(new ErrorHandler("category slug already exist", 404));

        const createCategory = new ProductCategoryScema({
            category_name: req.body.category_name,
            category_slug: req.body.category_slug,
            category_desc: req.body.category_desc,
            category_thumbnail: req.body.category_thumbnail,
            category_icon: req.body.category_icon
        });
        // save category
        const categoryData = await createCategory.save()
        // send response
        res.status(200).send(categoryData)
    } catch (err) {
        next(err)
    }
}
export const UpdateCategory = async (req, res, next) => {
    try {
        // search id
        const post = await ProductCategoryScema.findOne({
            _id: req.params.id
        });
        if (!post) return next(new ErrorHandler("category id not found", 404));

        var query = { _id: req.params.id };
        const update = {
            category_name: req.body.category_name,
            category_slug: req.body.category_slug,
            category_desc: req.body.category_desc,
            category_thumbnail: req.body.category_thumbnail,
            category_icon: req.body.category_icon
        }
        // @note duplicate error resolve later
        const data = await ProductCategoryScema.findOneAndUpdate(query, update);
        res.status(200).send(data)
    } catch (error) {
        next(error)
    }
}
export const SingleCategory = async (req, res, next) => {
    try {
        // find category by id
        const singleCategory = await ProductCategoryScema.findOne({ _id: req.params.id })
        // send single category response
        res.status(200).send(singleCategory)
    } catch (error) {
        next(error)
    }
}
// all category with filter
export const AllCategories = async (req, res, next) => {
    try {
        const perPage = req.query.limit ? req.query.limit : 2
        const total = await ProductCategoryScema.countDocuments();
        const filterFatch = new CategoryFilter(ProductCategoryScema.find(), req.query).search().filter()
        let items = await filterFatch.query
        let filter = items.length

        filterFatch.pagination(perPage)
        items = await filterFatch.query.clone()

        res.status(200).json({ total, filter, perPage, items })
    } catch (error) {
        next(error)
    }
}
// all category with filter
export const GetCategories = async (req, res, next) => {
    try {
        const categories = await ProductCategoryScema.find()

        res.status(200).json({ success: true, categories })
    } catch (error) {
        next(error)
    }
}
export const DeleteCategory = async (req, res, next) => {
    try {
        // find category by id
        // search id
        const post = await ProductCategoryScema.findOne({
            _id: req.params.id
        });
        if (!post) return next(new ErrorHandler("category id not found", 404));

        const data = await ProductCategoryScema.deleteOne({ _id: req.params.id });

        // send single category response
        res.status(200).send('delete')
    } catch (error) {
        next(error)
    }
}