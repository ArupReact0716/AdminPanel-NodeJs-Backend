import mongoose from 'mongoose';

const CheckoutSchema = new mongoose.Schema(
    {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        items: [
            {
                name: { type: String, required: true },
                image: { type: String, required: true },
                qty: {type: Number, default: 1, required: true },
                price: {type: Number,default: 0},
                packingPrice: {type: Number,default: 0},
                item: {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "Products",
                      required: true
                },
            }
        ],
        subTotal: { type: Number, default: 0 },
        taxPrice: { type: Number, default: 0 },
        totalPrice: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model('Checkout', CheckoutSchema, 'User Checkout')
