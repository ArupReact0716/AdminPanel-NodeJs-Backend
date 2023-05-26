// 
import ProductSchema from "./ProductSchema.js"
import ErrorHandler from "../../utils/ErrorHandler.js"

// create product
export const CreateProduct = async (req, res, next) => {
    try {
        // check duplicate slug
        const product_slug = await ProductSchema.findOne({
            product_slug: req.body.product_slug
        });
        if (product_slug) return next(new ErrorHandler("product slug already exist", 404));

        const createProduct = new ProductSchema(req.body);
        // save category
        const productData = await createProduct.save()
        // send response
        res.status(200).send(productData)
    } catch (err) {
        next(err)
    }
}
// update product
export const UpdateProduct = async (req, res, next) => {
    try {
        // search id
        const post = await ProductSchema.findOne({
            _id: req.params.id
        });
        if (!post) return next(new ErrorHandler("category id not found", 404));

        var query = { _id: req.params.id };
        const update = {
            product_title: req.body.product_title,
            product_slug: req.body.product_slug,
        }
        // @note duplicate error resolve later
        const data = await ProductSchema.findOneAndUpdate(query, update);
        res.status(200).send(data)
    } catch (error) {
        next(error)
    }
}
// single product
export const SingleProduct = async (req, res, next) => {
    try {
        // find category by id
        const singleProduct = await ProductSchema.findOne({ _id: req.params.id })
        // send single category response
        res.status(200).send(singleProduct)
    } catch (error) {
        next(error)
    }
}
// delete product
export const DeleteProduct = async (req, res, next) => {
    try {
        // find category by id
        // search id
        const post = await ProductSchema.findOne({
            _id: req.params.id
        });
        if (!post) return next(new ErrorHandler("category id not found", 404));

        const data = await ProductSchema.deleteOne({ _id: req.params.id });

        // send single category response
        res.status(200).send('delete')
    } catch (error) {
        next(error)
    }
}
// all product
export const AllProduct = async (req, res, next) => {
    try {
        const users = await ProductSchema.find()
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
}