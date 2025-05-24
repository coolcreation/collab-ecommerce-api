import express from 'express'
import Category from './../../models/product/categoryModel';   // jb- change 'models/category/' to 'models/product'
const router = express.Router()

// GET ALL CATEGORIES
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find() 
        res.json(categories)  
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ code: 500, status: "Error fetching categories" })
    }
})

// GET CATEGORY by ID
router.get("/:id", async (req, res) => {
    try {
        const selectedCategory = await Category.findById(req.params.id)
        if (!selectedCategory) {
            return res.status(404).json({ status: "Category not found" })
        }
        res.json({ status: `Category ${selectedCategory.name} selected` })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ code: 500, status: "Error deleting category" })
    }
})

// POST NEW CATEGORY
router.post("/", async (req, res) => {
  const { name, age } = req.body  
  console.log('Request body:', req.body)
  try {
      const newCategory = new Category({ name, age })  
      await newCategory.save()  
      res.status(201).json(newCategory)  
      console.log("New Category created")
  } catch (err) {
      console.log(err.message)
      res.status(500).json({ code: 500, status: "Error saving category" })
  }
})

router.put('/:id', async (req, res) => {
    try {
      const productId = req.params.id
      const updatedCategory = await Category.findByIdAndUpdate(productId, req.body, { new: true })
  
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' })
      }
  
      res.json(updatedCategory)
    } catch (error) {
      console.error('Error updating category:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
})

// DELETE CATEGORY
router.delete("/:id", async (req, res) => {
    try {
        const selectedCategory = await Category.findByIdAndDelete(req.params.id)
        if (!selectedCategory) {
            return res.status(404).json({ status: "Category not found" })
        }
        res.json({ status: `Category ${selectedCategory.name} selected` })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ code: 500, status: "Error deleting category" })
    }
})

export default router