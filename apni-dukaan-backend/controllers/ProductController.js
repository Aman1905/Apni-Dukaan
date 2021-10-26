const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncErrors = require("../middleware/CatchAsyncErrors");
const ApiFeatures = require("../utils/ApiFeatures")

// Creating Products -- Admin access
exports.createProduct = CatchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        sucess: true,
        product
    })
})

// Get all the Products
exports.getAllProducts = CatchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments()

    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter().pagination(resultPerPage);

    const allProducts = await apiFeature.query;
    res.status(200).json({
        sucess: true,
        allProducts
    })
})

// Get Single Product Details
exports.singleProductDetails = CatchAsyncErrors(async (req, res, next) => {
    const singleProductDetails = await Product.findById(req.params.id)

    if(!singleProductDetails) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    res.status(200).json({
        sucess: true,
        singleProductDetails,
        productCount
    })
})

// Update the Products -- Admin access
exports.updateProduct = CatchAsyncErrors(async (req, res, next) => {
    let updateProduct = Product.findById(req.params.id);

    if(!updateProduct) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        sucess: true,
        updateProduct
    })
})

// Delete the Products -- Admin access 
exports.deleteProduct = CatchAsyncErrors(async (req, res, next) => {
    const deleteProduct = await Product.findById(req.params.id)

    if(!deleteProduct) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    await deleteProduct.remove();

    res.status(200).json({
        sucess: true,
        message: "Product Deleted Sucessfully",
    })
})