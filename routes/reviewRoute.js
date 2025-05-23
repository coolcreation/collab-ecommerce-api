import express from 'express'
import Review from "../models/reviewModel.js";
import Product from "../models/product/productModel.js";

const router = express.Router()

// POST NEW REVIEW
router.post("/:productId", async (req, res) => {
  try {
    const { user, rating, comment } = req.body
    const productId = req.params.productId

    // Check if product exists
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ status: "Product not found" })
    }

    const newReview = new Review({ user, product: productId, rating, comment })
    await newReview.save()

    res.status(201).json(newReview)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ code: 500, status: "Error saving review" })
  }
})

// GET ALL REVIEWS FOR A PRODUCT
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId

    // Check if product exists
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ status: "Product not found" })
    }

    const reviews = await Review.find({ product: productId })
    res.json(reviews)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ code: 500, status: "Error fetching reviews" })
  }
})

// GET A REVIEW BY ID
router.get("/review/:reviewId", async (req, res) => {
  try {
    const reviewId = req.params.reviewId

    const review = await Review.findById(reviewId)
    if (!review) {
      return res.status(404).json({ status: "Review not found" })
    }

    res.json(review)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ code: 500, status: "Error fetching review" })
  }
})

// UPDATE A REVIEW
router.put("/review/:reviewId", async (req, res) => {
  try {
    const reviewId = req.params.reviewId

    const review = await Review.findById(reviewId)
    if (!review) {
      return res.status(404).json({ status: "Review not found" })
    }

    const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, { new: true })
    res.json(updatedReview)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ code: 500, status: "Error updating review" })
  }
})

// DELETE A REVIEW
router.delete("/review/:reviewId", async (req, res) => {
  try {
    const reviewId = req.params.reviewId

    const review = await Review.findByIdAndDelete(reviewId)
    if (!review) {
      return res.status(404).json({ status: "Review not found" })
    }

    res.json({ status: "Review deleted successfully" })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ code: 500, status: "Error deleting review" })
  }
})

export default router
