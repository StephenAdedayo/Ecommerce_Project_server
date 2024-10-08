import userModel from "../models/userModel.js"



// add product to cart


const addToCart = async (req, res) => {
      
   try {
    const {userId, itemId, size } = req.body

    // find the user cart and perform actions
    
    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData

    // check if cartdata has the itemid available
    if(cartData[itemId]){
        // check if cartdata has the itemid and size available
        if(cartData[itemId][size]){
            // increment by 1
            cartData[itemId][size] += 1
        } else{
            // set it to 1 if it not available
            cartData[itemId][size] = 1
        }
    }  else {
           cartData[itemId] = {}
           cartData[itemId][size] = 1
    }

    // await usermodel to update using userId and also update cartdata in the db
    await userModel.findByIdAndUpdate(userId, {cartData})

    res.json({success : true, message : 'Added To cart'})
   } catch (error) {
    console.log(error);
    res.json({success : false, message : error.message})
    
   }
}


//  update cart

const updateCart = async (req, res) => {
    
      try {
        
          const {userId, itemId, size, quantity} = req.body 

          const userData = await userModel.findById(userId)
          let cartData = await userData.cartData
             
        //   this updates the quantity in the cart data
          cartData[itemId][size] = quantity

          await userModel.findByIdAndUpdate(userId, {cartData})

          res.json({success : true, message : 'Cart Updated'})

      } catch (error) {
        console.log(error);
    res.json({success : false, message : error.message})
      }

}


// get user cart data

const getUserCart = async (req, res) => {

    try {
        
        const {userId} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        res.json({success : true, cartData})

    } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message})
    }
}


export {addToCart, updateCart, getUserCart}