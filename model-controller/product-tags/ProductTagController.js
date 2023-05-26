// import  Product Category Schema
import ProductTagSchema from "./ProductTagSchema.js";
import TagFilter from './TagFilter.js'
import ErrorHandler from "../../utils/ErrorHandler.js";
//  create tag
export const CreateTag = async (req, res, next) => {
    try {
        // check duplicate slug
        const tag_slug = await ProductTagSchema.findOne({
            tag_slug: req.body.tag_slug
        });
        if (tag_slug) return next(new ErrorHandler("Tag Slug already exist", 404));

        const createTag = new ProductTagSchema(req.body);
        // save category
        await createTag.save()
        // send response
        res.status(200).json({ success: true, message: 'Successfully create ' + req.body.tag_name })
    } catch (err) {
        next(err)
    }
}
// edit tag
export const EditTag = async (req, res, next) => {
    try {
        // search id
        const tag = await ProductTagSchema.findOne({
            _id: req.params._id
        });
        if (!tag) return next(new ErrorHandler("Tag not found", 404));
        var query = { _id: req.params._id };
        const update = {
            tag_name: req.body.tag_name,
            tag_slug: req.body.tag_slug,
            tag_description: req.body.tag_description
        }
        await ProductTagSchema.findOneAndUpdate(query, update);
        res.status(200).json({
            update: true,
            message: 'Updated '+req.body.tag_name
        })

    } catch (err) {
        next(err)
    }
}
// all tag with filter
export const AllTag = async (req, res, next) => {
    try {
        const perPage = req.query.limit ? req.query.limit : 2
        const total = await ProductTagSchema.countDocuments();
        const filterFatch = new TagFilter(ProductTagSchema.find(), req.query).search().filter()
        let Tags = await filterFatch.query
        let filter = Tags.length

        filterFatch.pagination(perPage)
        Tags = await filterFatch.query.clone()

        res.status(200).json({ total, filter, perPage, Tags })
    } catch (error) {
        next(error)
    }
}
// single tag
export const SingleTag = async (req, res, next) => {
    try {
        const _id = req.params._id
        const tag = await ProductTagSchema.findById(_id).exec();
        res.status(200).json(tag)
    } catch (error) {
        next(error)
    }
}