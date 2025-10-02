const Product = require('../models/productSchema');
const Category = require('../models/categorySchema');
const SubCategory = require('../models/subCategorySchema');
const ExtraCategory = require('../models/extraCatSchema');

exports.homePage = (req, res) => {
    return res.render('index');
}

exports.tablePage = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category', 'name image')
            .populate('subCategory', 'name image')
            .populate('extraCategory', 'name image');
        return res.render('./pages/viewProduct', { products });
    } catch (error) {
        console.log(error.message);
        return res.render('./pages/viewProduct', { products: [] });
    }
}

exports.formBasicPage = async (req, res) => {
    try {
        const categories = await Category.find();
        const subCategories = await SubCategory.find();
        const extCategories = await ExtraCategory.find();
        return res.render('./pages/addProduct', { categories, subCategories, extCategories });
    } catch (error) {
        console.log(error.message);
        return res.render('./pages/addProduct', { categories: [] });
    }
}

exports.formBasic = async (req, res) => {
    try {
        if (req.file) req.body.image = req.file.path; // Cloudinary URL
        await Product.create(req.body);
        console.log('Product created.');
        return res.redirect(req.get('Referrer') || '/');
    } catch (error) {
        console.log(error.message);
        return res.redirect(req.get('Referrer') || '/');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        console.log('Product Deleted.');
        return res.redirect('/viewProduct');
    } catch (error) {
        console.log(error.message);
        res.redirect(req.get('referrer') || '/');
    }
};

exports.editProductPage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.redirect(req.get('Referrer') || '/');

        const categories = await Category.find();
        const subCategories = await SubCategory.find();
        const extraCategories = await ExtraCategory.find();

        return res.render('./pages/editProduct', { product, categories, subCategories, extraCategories });
    } catch (error) {
        console.log(error.message);
        return res.redirect(req.get('Referrer') || '/');
    }
}

exports.editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, description, category, subCategory, extraCategory } = req.body;

        const updateData = { title, price, description, category, subCategory, extraCategory };

        if (req.file) updateData.image = req.file.path; // Cloudinary URL

        await Product.findByIdAndUpdate(id, updateData, { new: true });
        console.log('Product Updated.');
        return res.redirect('/viewProduct');
    } catch (error) {
        console.log(error.message);
        return res.redirect(req.get('Referrer') || '/');
    }
};
