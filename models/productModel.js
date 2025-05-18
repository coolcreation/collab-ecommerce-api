import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    imageURL: { type: String, required: false },
    price: { type: Number, required: true },
    
});

const Product = mongoose.model('Product', productSchema);

export default Product;