import OrderSchema from "./OrderSchema.js"
import ProductSchema from '../product/ProductSchema.js'

import ErrorHandler from "../../utils/ErrorHandler.js"

// create order
export const CreateOrder = async (req, res, next) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, paymentResult, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body

        const order = await OrderSchema.create({
            orderItems, shippingAddress, paymentMethod, paymentResult, itemsPrice, shippingPrice, taxPrice, totalPrice,
            paid_At: Date.now(),
            user: "634fe3ae23ace707a3a4fa26"
        })

        res.status(201).json({
            success: true,
            order
        })

    } catch (err) {
        next(err)
    }
}

// get single order
export const SingleOrder = async (req, res, next) => {
    try {
        const order = await OrderSchema.findById(req.params._id).populate("user", "firstname user_email")
        if (!order) { next(new ErrorHandler("orde not found", 404)) }

        res.status(200).json({
            success: true,
            order
        })

    } catch (err) {
        next(err)
    }
}
// user see order
export const MyOrder = async (req, res, next) => {
    try {
        const orders = await OrderSchema.find({ user: req.user._id })

        res.status(200).json({
            success: true,
            orders
        })

    } catch (err) {
        next(err)
    }
}

// all orders
export const allOrders = async (req, res, next) => {
    try {
        const orders = await OrderSchema.find().populate("user"," user_email")
        if (!orders) { next(new ErrorHandler("No order exists", 404)) }

        res.status(200).json({
            success: true,
            orders
        })

    } catch (error) {
        next(error)
    }
}
// get single order
export const orderDetails = async (req, res, next) => {
    try {
        const order = await OrderSchema.findById(req.params._id).populate("orderItems.product", "product_title").populate("user", "firstname user_email")
        if (!order) { next(new ErrorHandler("orde not found", 404)) }

        res.status(200).json({
            success: true,
            order
        })

    } catch (err) {
        next(err)
    }
}