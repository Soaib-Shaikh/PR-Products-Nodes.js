const Product = require("../models/productSchema")

exports.viewpage = async (req,res) => {
    try {
        const products = await Product.find()
        .populate('category', 'name image')
        .populate('subCategory', 'name image')
        .populate('extraCategory', 'name image')

        return res.render('./pages/clientSide', { products })
    } catch (error) {
        console.log(error.message);
        return res.render('./pages/clientSide', { products: [] })
    }
}