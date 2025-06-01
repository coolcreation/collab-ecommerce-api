import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: false },
//     imageURL: [{ type: String, required: false }],  // changing this to false as some items could potential not have an image (digital items/services/warranties?)
//     brand: { type: String, required: true },
//     price: { type: Number, required: true },
//     stock: { type: Number, required: true },   // jb - adding this to keep track of inventory
//     categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
// });

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String }
}, { _id: false })

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },       // "Red - Large"
  sku: { type: String, required: true },        // Unique identifier for variant
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imageURL: [imageSchema]
}, { _id: false })

const productSchema = new mongoose.Schema({
  baseName: { type: String, required: true },   // e.g. "T-Shirt"
  description: String,
  brand: String,
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [String],                               // Dynamic tags per product
  sku: String,                                  // SKU if product-level only
  stock: { type: Number, default: 0 },          // Stock if product-level only
  imageURL: [imageSchema],                      // Optional product-level images
  variants: [variantSchema]                     // Optional variants

}, { timestamps: true })


const Product = mongoose.model('Product', productSchema);

export default Product;