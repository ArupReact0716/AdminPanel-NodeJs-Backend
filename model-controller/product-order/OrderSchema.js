import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        // items
        orderItems: [
            {
                name: { type: String, required: true },
                image: { type: String, required: true },
                qty: { type: Number, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products',
                    required: true,
                },
            },
        ],
        //  shipping address
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true }
        },
        // payment
        paymentMethod: { type: String, required: true },
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        },
        // price
        subTotal: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        packingPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        // user & seller
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
        // Paid
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        // Delivered
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
    },
    {
        timestamps: true,
    }
);
export default mongoose.model('Orders', OrderSchema, 'Orders')
