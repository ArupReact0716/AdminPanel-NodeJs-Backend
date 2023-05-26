// schema
import CkeckoutSchema from './CkeckoutSchema.js'
import CartSchema from '../user-cart/CartSchema.js'
import ErrorHandler from "../../utils/ErrorHandler.js"


export const Checkout = async (req, res, next) => {

    // { _id: '6353b1fad24e78ee120bee5e', proQty: '1' }
    try {

        const user_id = "634fe3ae23ace707a3a4fa26";


        // check user cart
        const checkout = await CkeckoutSchema.findOne({ user_id });

        // find cart
        const { cart_items } = await CartSchema.findOne({ user_id }).populate("cart_items.item", "product_title regular_price sales_price discount stock_quantity")




        if (checkout) {
            //cart exists for user
            let itemIndex = cart.cart_items.findIndex(p => p.product_id == _id);

            if (itemIndex > -1) {
                //check if product exist,just add the previous quantity with the new quantity and update the total price-------
                cart.cart_items[itemIndex].item_qty = product_qty;
                // cart.cart_items[itemIndex].total_price = Number(cart.cart_items[itemIndex].product_price * cart.cart_items[itemIndex].item_qty);
            } else {
                //product does not exists in cart, add new item
                cart.cart_items.push({ item: _id, item_qty: 8658, item_price: 465864 });
            }

            // const pPrice = cart.cart_items.map(p => p.total_price);
            // const totalPrice = pPrice.reduce((a, b) => a + b, 0);
            // cart.totalPrice = totalPrice;

            const carts = await cart.save();
            return res.status(202).send(carts);
        } else {
            //no checkout for user, create new cart
            const subTotal = Object.values(cart_items).reduce((t, item) => t + (item.item_qty * item.item.sales_price), 0)
            const taxPrice = subTotal * 0.18
            const totalPrice = subTotal + taxPrice
            const newCheckout = await CkeckoutSchema.create({
                user_id,
                items: cart_items,
                subTotal,
                taxPrice,
                totalPrice
            });

            return res.status(201).json({ newCheckout });
        }
    } catch (err) {
        next(err)
    }
}


export const getCheckout = async (req, res, next) => {
    try {
        const user_id = "634fe3ae23ace707a3a4fa26";


        // check user cart
        const checkout = await CkeckoutSchema.find({ user_id: user_id });


        return res.status(201).send({ checkout });
    } catch (error) {
        next(error)
    }
}