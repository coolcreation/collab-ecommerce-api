import express from 'express'
import Product from "../../models/product/productModel.js"
const router = express.Router()

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    try {
        const products = await Product.find() 
        res.json(products)  
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ code: 500, status: "Error fetching products" })
    }
})

// GET PRODUCT by ID
router.get("/:id", async (req, res) => {
    try {
        const selectedProduct = await Product.findById(req.params.id)
        if (!selectedProduct) {
            return res.status(404).json({ status: "Product not found" })
        }
        res.json({ status: `Product ${selectedProduct.name} selected` })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ code: 500, status: "Error deleting product" })
    }
})

// POST NEW PRODUCT
router.post("/", async (req, res) => {
  const { name, age } = req.body  
  console.log('Request body:', req.body)
  try {
      const newProduct = new Product({ name, age })  
      await newProduct.save()  
      res.status(201).json(newProduct)  
      console.log("New Product created")
  } catch (err) {
      console.log(err.message)
      res.status(500).json({ code: 500, status: "Error saving product" })
  }
})

router.put('/:id', async (req, res) => {
    try {
      const productId = req.params.id
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true })
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' })
      }
  
      res.json(updatedProduct)
    } catch (error) {
      console.error('Error updating product:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
})

// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
    try {
        const selectedProduct = await Product.findByIdAndDelete(req.params.id)
        if (!selectedProduct) {
            return res.status(404).json({ status: "Product not found" })
        }
        res.json({ status: `Product ${selectedProduct.name} selected` })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ code: 500, status: "Error deleting product" })
    }
})

export default router