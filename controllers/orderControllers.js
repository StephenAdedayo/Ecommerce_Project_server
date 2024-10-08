import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"


// placing order using cod method



const placeOrder = async (req, res) => {
     

      try {
        
           const {userId, items, amount, address} = req.body

           const orderData = {
            userId,
            items,
            address,
            amount,
            PaymentMethod : 'COD',
            payment : false,
            date : Date.now()
           }


           const newOrder = new orderModel(orderData)
           await newOrder.save()


        //    clear the user cart after making an order

        await userModel.findByIdAndUpdate(userId, {cartData : {}})

        res.json({success : true, message : 'Order Placed'})

      } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message})
        
      }


}


// placing order using stripe method


const placeOrderStripe = async (req, res) => {
     
}



// placing order using razorpay method


const placeOrderRazorPay = async (req, res) => {
     
}


// All order data for Admin Panel


const allOrders = async (req, res) => {

}


// user order data

const userOrders = async (req, res) => {

}


// const updatestatus

const updateStatus = async (req, res) => {

}


export {placeOrder, placeOrderRazorPay, placeOrderStripe, allOrders, userOrders, updateStatus}