import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({    
    name: { type: String, required: true },
    description: { type: String, required: false, null: true },
    
});

const Category = mongoose.model('Category', categorySchema);

export default Category;