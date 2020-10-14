import { response } from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @description Fetch all products
// @ route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: "i"
    }
  } : {}
  const count = await Product.countDocuments({...keyword})
  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize  * (page -1))
  res.json({products ,page , pages: Math.ceil(count / pageSize)});
});

// @description Fetch single product
// @ route GET /api/products/:id
// @access Public

const getProductsByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// @description Delete a product
// @ route Delete /api/products/:id
// @access private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "product  Removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @description create a product
// @ route POST /api/products/
// @access private/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = await new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/image/sample.jpg",
    brand: "default",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
    rating: 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @description update A product
// @ route put /api/products/:id
// @access private/admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    brand,
    countInStock,
    image,
    category,
    rating,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.rating = rating;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @description create new Review
// @ route put /api/products/:id/reviews
// @access private

const createProductReview = asyncHandler(async (req, res) => {
  const {
   comment,
    rating,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
   const alreadyReview = product.reviews.find(r => r.user.toString() === req.user._id.toString())
   if(alreadyReview){
     res.status(400)
     throw new Error("Product already reviewd")
   }

   const review = {
     name: req.user.name,
     rating : Number(rating),
     comment,
     user:req.user._id
   }

   product.reviews.push(review)
   product.numReviews = product.reviews.length
   product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

   await product.save()

   res.status(201).json({message: "Review added"})
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// @description get top rated products
// @ route Get /api/products/top
// @access publuc

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({rating: -1}).limit(3)

  res.json(products)
});

export {
  getProducts,
  getProductsByID,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
};
