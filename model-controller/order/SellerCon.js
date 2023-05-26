import SellerSc from "./SellerSc.js";
export const CreateOd = async (req, res, next) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;


        const newOrder = new SellerSc({
            seller: req.body.orderItems[0].seller,
            orderItems: orderItems.map((x) => ({ ...x, product: x._id })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        });

        
        const order = await newOrder.save();
        res.status(201).json({ message: 'New Order Created' });
    } catch (error) {
        next(error)
    }
}