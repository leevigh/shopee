const mongoose = require('mongoose');
const Product = require('../models/product');
const cloudinary = require('../config/cloudinaryConfig');


module.exports = {
    getProducts: (req, res, next) => {
        Product.find().exec()
        .then(products => {
            console.log(products);
            res.status(200).json({
                count: products.length,
                data: products
            });
        })
        .catch(err => console.error(err));
    },

    createProduct: async (req, res, next) => {
        //Upload image to Cloudinary
        const image = await cloudinary.uploader.upload(req.file.path);
        console.log(image)
        console.log(req.file)
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            productImage: image.secure_url,
            price: req.body.price
        });
        product.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Product created successfully",
                data: result
            });
        })
        .catch(err => console.log(err));
    },
    getProduct: (req, res, next) => {
        productId = req.params.productId;
        Product.findById(productId)
        .then(product => {
            console.log(product);
            return res.status(200).json({
                message: 'Product found',
                data: product
            });
        })
        .catch(err => console.error(err));
    },
    deleteProduct: (req, res, next) => {
        productId = req.params.productId
        Product.deleteOne({_id: productId})
        .then(result => {
            console.log("deleted product", result)
            return res.status(202).json({
                message: "Product deleted",
                data: result
            })
        })
        .catch(err => {console.log(err)});
    }
    
}
