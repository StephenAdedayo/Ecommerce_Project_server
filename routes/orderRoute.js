import express from 'express'


import { placeOrder, placeOrderRazorPay, placeOrderStripe, allOrders, updateStatus, userOrders, verifyStripe } from '../controllers/orderControllers.js'
import adminAuth from '../middlewares/adminAuth.js'
import authUser from '../middlewares/auth.js'

const orderRouter = express.Router()

// admin features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// payment features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorPay)

// user features
orderRouter.post('/userorders', authUser, userOrders)
orderRouter.post('/verifyStripe', authUser, verifyStripe)


export default orderRouter