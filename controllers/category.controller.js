const Category = require("../models/categorySchema");
const path = require('path');
const fs = require('fs');

exports.addCategoryPage = (req,res) => {
    return res.render('./pages/add-category')
}

exports.addData = async (req,res) => {
    try {
        req.body.image = req.file.filename;
        await Category.create(req.body);
        console.log('Category created.');
        return res.redirect(req.get('Referrer') || '/');
    } catch (error) {
        console.log(error.message);
        return res.redirect(req.get('Referrer') || '/');
    }
}

exports.viewData = async (req,res) => {
    try {
        const categories = await Category.find({});
        return res.render('./pages/view-category', { categories})
    } catch (error) {
        console.log(error.message);
        return res.render('./pages/view-category', { categories: []})
        
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        fs.unlinkSync(path.join(__dirname,'../uploads/category', category.image))
        console.log('Category Deleted.');
        return res.redirect('/category/view-category')
    } catch (error) {
        console.log(error.message);
        res.redirect(req.get('referrer') || '/');
    }
};

// Edit
exports.editCategoryPage = async (req,res) => {
  try {
    const category = await Category.findById(req.params.id)

    return res.render('./pages/edit-category', { category })
  } catch (error) {
    console.log(error.message);
    
    return res.render('./pages/edit-category')
  }
};

exports.editCategory = async (req,res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updateData = { name };

        if(req.file){
            const category = await Category.findById(id);

            if(category.image){ 
                const oldImagePath = path.join(__dirname, '../uploads/category', category.image);
                try {
                    fs.unlinkSync(oldImagePath); 
                } catch (err) {
                    console.log(err);
                    
                }
            }
            updateData.image = req.file.filename; 
        }
        await Category.findByIdAndUpdate(id, updateData, { new:true });
        console.log('Category Updated.');
        return res.redirect('/category/view-category'); 
    } catch (error) {
        console.log(error.message);
        return res.redirect(req.get('Referrer') || '/');
    }
}