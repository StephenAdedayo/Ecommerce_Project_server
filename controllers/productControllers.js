import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'


// function for add product
const addProduct = async (req, res) => {
     try {
        
        const {name, description, price, category, subCategory, sizes, bestSeller} = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

    //    this will post all the images and show undefined for path wiht no image
        console.log(image1, image2, image3, image4); 
        

        // checking if item is undefined and not adding it to the db
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined) 

        // this will post all only the images and show nothing for the path with no image
        console.log(images);
        
        
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type : 'image'})
                return result.secure_url
            })
        )

        // console.log(name, description, price, category, subCategory, sizes, bestSeller);
        // console.log(imagesUrl);
     const productData = {
        name, 
        description,
        category,
        price: Number(price),
        subCategory,
        bestSeller: bestSeller === "true" ? true : false,
        sizes: JSON.parse(sizes),
        image : imagesUrl,
        date : Date.now()

     }

     console.log(productData);

     const product = new productModel(productData)
     await product.save()
     

        res.json({success : true, message : 'Product Added'})
        
        

     } catch (error) {
        res.json({success: false , message : error.message})
        console.log(error);
        
     }
}

// function for list product

const listProduct = async (req, res) => {
      

    try {
        const products = await productModel.find({})
    res.json({success : true, products})
    } catch (error) {
         res.json({success: false, message : error.message})
         console.log(error);
         
    }
}


// function for removing product
const removeProduct = async (req, res) => {
    

    try {

        await productModel.findByIdAndDelete(req.body.id)

        res.json({success : true, message : 'Product Removed'})
        
    } catch (error) {
        res.json({success: false, message : error.message})
        console.log(error);
    }
   
}


// function for single product info
const singleProduct = async (req, res) => {
    
   try {
     const {productId} = req.body

     const product = await productModel.findById(productId)
     res.json({success : true, data : product})

   } catch (error) {
    res.json({success: false, message : error.message})
    console.log(error);
   }

}


export {listProduct, addProduct, removeProduct, singleProduct}