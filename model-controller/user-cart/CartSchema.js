import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
    {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        cart_items: [
            {
              name: {type: String} ,
              image: {type: String },
              qty: {type: Number, default: 1 },
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
        packingPrice: { type: Number, default: 0 },
        shippingPrice: { type: Number, default: 0 },
        taxPrice: { type: Number, default: 0 },
        totalPrice: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model('Cart', CartSchema, 'User Cart')
