import OrderS from "./OrderS.js"
import SellerSc from "./SellerSc.js";


export const CreateOd = async (req, res, next) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;
        const newOrder = new OrderS({
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


        if (order) {
            orderItems.forEach(async (element) => {
                const seller = new SellerSc({
                    orderItems: element,
                    seller: element.seller,
                    shippingAddress,
                    paymentMethod,
                })
                await seller.save();
            });
            res.status(201).json({ message: 'New Order Created' });

        }


    } catch (error) {
        next(error)
    }
}


// export const seller = async (array) => {
//     orderItems.forEach(element => {
//         const seller = new SellerSc({
//             orderItems: element,
//             seller: element.seller,
//             shippingAddress,
//             paymentMethod,
//         })
//         const order = await SellerSc.save();
//     });
// }