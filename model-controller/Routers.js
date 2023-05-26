import express from "express"
import { CreateOd } from "./order/OrderCon.js"
import { Payment } from "./payment/PaymentController.js"
import { AllCategories, CreateCategory, DeleteCategory, GetCategories, SingleCategory, UpdateCategory } from "./product-category/ProductCategoryController.js"
import { allOrders, CreateOrder, orderDetails, SingleOrder } from "./product-order/OrderController.js"
import { AllTag, CreateTag, EditTag, SingleTag } from "./product-tags/ProductTagController.js"
import { AllProduct, CreateProduct, DeleteProduct, SingleProduct, UpdateProduct } from "./product/ProductController.js"
import { Cart, getCart } from "./user-cart/CartController.js"
import { Checkout, getCheckout } from "./user-ckeckout/CheckoutController.js"
import { AddUser, AllUsers, EditUser, Login, UserData, UserProfile } from "./users/UserController.js"

const route = express.Router()

// users
route.post('/login', Login)
route.post('/add-user', AddUser)
route.post('/edit-user/:_id', EditUser)
route.get('/user/:_id', UserData)
route.get('/all-user', AllUsers)
route.get('/profile', UserProfile)

// Product Category
route.post('/product-category', CreateCategory)
route.get('/product-categories', AllCategories)
route.get('/product-getcategories', GetCategories)
route.get('/single-product-category/:id', SingleCategory)
route.put('/product/update-category/:id', UpdateCategory)
route.delete('/product/delete-category/:id', DeleteCategory)

// tags
route.post('/product-tag', CreateTag)
route.post('/product-tag/:_id', EditTag)
route.get('/product-tags', AllTag)
route.get('/product-single-tag/:_id', SingleTag)


// product
route.post('/create-product', CreateProduct)
route.get('/single-product/:id', SingleProduct)
route.put('/update-product/:id', UpdateProduct)
route.delete('/delete-product/:id', DeleteProduct)
route.get('/all-product', AllProduct)


// order
route.post('/order/new', CreateOrder)
route.get('/order/:_id', SingleOrder)
route.get('/orders', allOrders)
route.get('/orders/details/:_id', orderDetails)

route.post('/od', Payment)


// cart
route.post('/cart/add-cart', Cart)
route.get('/cart', getCart)

// checkout
route.post('/checkout', Checkout)
route.get('/order/proccess', getCheckout)

// payment
route.post('/raju', CreateOd)



export default route
