// schema
import ProductSchema from '../product/ProductSchema.js'
import CartSchema from "./CartSchema.js"
import ErrorHandler from "../../utils/ErrorHandler.js"


export const Cart = async (req, res, next) => {

    // { _id: '6353b1fad24e78ee120bee5e', proQty: '1' }
    try {
        const { _id, proQty } = req.body
        const user_id = "634fe3ae23ace707a3a4fa26";
        const product_qty = Number.parseInt(proQty);

        // check user cart
        const cart = await CartSchema.findOne({ user_id });

        //-----Get Selected Product Details ----
        const productDetails = await ProductSchema.findById(_id);
        const product_price = Number.parseInt(productDetails.product_price);

        if (cart) {
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
            //no cart for user, create new cart
            const newCart = await CartSchema.create({
                user_id,
                cart_items: [{ item: _id, item_qty: 1, item_price: 2 }],
                totalPrice: 67677
            });

            return res.status(201).send({ mag: 'Add item in cart' });
        }
    } catch (err) {
        next(err)
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

export const getCart = async (req, res, next) => {
    const _id = "634fe3ae23ace707a3a4fa26"

    const cart = await CartSchema.findOne({ user_id: _id }).populate("cart_items.item", "product_title regular_price sales_price discount stock_quantity")

    if (!cart) { next(ErrorHandler("nocart items", 201)) }

    const { user_id, cart_items } = cart

    const pPrice = cart.cart_items.map(p => p.item_price);
    const totalPrice = pPrice.reduce((a, b) => a + b, 0);

    return res.status(201).send({ user_id, cart_items, totalPrice });
}