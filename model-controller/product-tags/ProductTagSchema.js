import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema(
    {
        tag_name: {
            type: String,
            required: [true, 'Tag Name Empty']
        },
        tag_slug: {
            type: String,
            unique: true,
            required: [true, 'Tag Slug Empty']
        },
        tag_description: {
            type: String,
        },
        products_count: {
            type: Number,
            default: 0
        },
        products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        },
    },
    { timestamps: true }
);
export default mongoose.model('ProductTag', TagSchema, 'Product Tags')