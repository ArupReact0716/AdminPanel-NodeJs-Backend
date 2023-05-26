import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        category_name: {
            type: String,
            required: [true,'category name empty']
        },
        category_slug: {
            type: String,
            unique: true,
            required: [true, 'slug name empty']
        },
        category_parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductCategory'
           
        },
        category_desc: {
            type: String,
        },
        category_thumbnail: {
            type: String,
            default: null
        },
        category_icon: {
            type: String,
            default: null
        },
        products_count: {
            type: Number,
            default: 0
        },
        products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductCategory'
        },
    },
    { timestamps: true }
);

export default mongoose.model('ProductCategory', UserSchema, 'Product Category')