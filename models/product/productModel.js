import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    imageURL: [{ type: String, required: false }],  // changing this to false as some items could potential not have an image (digital items/services/warranties?)
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },   // jb - adding this to keep track of inventory
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});

const Product = mongoose.model('Product', productSchema);

export default Product;