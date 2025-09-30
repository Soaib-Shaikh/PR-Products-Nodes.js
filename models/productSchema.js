const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    image: String,
    title: String,
    price: String,
    description: String,
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'category',
    },
    
    subCategory: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'subCategory',
    },
    extraCategory: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'extraCategory',
    }
})


const Product = mongoose.model('productTbl', productSchema);

module.exports = Product;