import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    imageURL: [{ type: String, required: true }],
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});

const Product = mongoose.model('Product', productSchema);

export default Product;