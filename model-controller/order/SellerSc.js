import mongoose from 'mongoose';

const Order = new mongoose.Schema(
    {
        orderItems: [
            {
                slug: { type: String},
                name: { type: String},
                quantity: { type: Number},
                image: { type: String},
                price: { type: Number},
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products',
                    required: true,
                },
            }
        ],
        shippingAddress: {
            fullName: { type: String},
            address: { type: String},
            city: { type: String},
            postalCode: { type: String},
            country: { type: String},
            location: {
                lat: Number,
                lng: Number,
                address: String,
                name: String,
                vicinity: String,
                googleAddressId: String,
            }
        },
        paymentMethod: { type: String},
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        },
        itemsPrice: { type: Number},
        shippingPrice: { type: Number},
        taxPrice: { type: Number},
        totalPrice: { type: Number},
        seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
    },
    {
        timestamps: true,
    }
);
export default mongoose.model('Sl', Order, 'Sl')
