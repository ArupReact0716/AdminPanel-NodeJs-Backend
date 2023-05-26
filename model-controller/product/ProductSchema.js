import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        product_title: {
            type: String,
            required: [true, 'product name empty']
        },
        product_slug: {
            type: String,
            unique: true,
            required: [true, 'slug name empty']
        },
        product_type: {
            type: String,
            required: [true, 'slug name empty']
        },
        regular_price: {
            type: Number,
            required: [true, 'slug name empty']
        },
        sales_price: {
            type: Number,
            required: [true, 'slug name empty']
        },
        discount: {
            type: Number,
            required: [true, 'slug name empty']
        },
        product_sku: {
            type: String,
            unique: true,
            required: [true, 'slug name empty']
        },
        stock_quantity: {
            type: Number,
            required: [true, 'slug name empty']
        },
    },
    { timestamps: true }
);

export default mongoose.model('Products', ProductSchema, 'Products')