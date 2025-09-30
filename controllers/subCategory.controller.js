const SubCategory = require("../models/subCategorySchema")
const fs = require('fs');
const path = require('path');

exports.createpage = (req,res) => {
    return res.render('pages/add-subcategory')
}

exports.createData = async (req,res) => {
    try {
        req.body.image = req.file.filename;
        await SubCategory.create(req.body);
        console.log('Sub-Category Created.');
        return res.redirect(req.get('Referrer') || '/');
    } catch (error) {
        console.log(error.message);
        return res.redirect(req.get('Referrer') || '/');
    }
}

exports.viewData = async (req,res) => {
    try {
        const subCategories = await SubCategory.find({});
        res.render('./pages/view-subcategory', { subCategories });
    } catch (error) {
        console.log(error.message);
        res.render('./pages/view-subcategory', { subCategories: [] });
    }
};

exports.delete = async (req,res) => {
    try {
        const { id } = req.params;
        const subCategory = await SubCategory.findByIdAndDelete(id);
        fs.unlinkSync(path.join(__dirname,'../uploads/subCategory', subCategory.image))
        console.log('Category Deleted.');
        return res.redirect(req.get('referrer') || '/')
    } catch (error) {
        console.log(error.message);
        res.redirect(req.get('referrer') || '/');
    }
}

exports.editPage = async (req,res) =>{
    try {
    const subCategory = await SubCategory.findById(req.params.id)

    return res.render('./pages/edit-subCategory', { subCategory })
  } catch (error) {
    console.log(error.message);
    
    return res.render('./pages/edit-category')
  }
}

exports.update = async (req,res) => {
    try {
        const { id } = req.params;

        const updateData = req.body;

        if(req.file){
            const subCategory = await SubCategory.findById(id);

            if(subCategory.image){ 
                const oldImagePath = path.join(__dirname, '../uploads/subCategory', subCategory.image);
                try {
                    fs.unlinkSync(oldImagePath); 
                } catch (err) {
                    console.log(err);
                    
                }
            }
            updateData.image = req.file.filename; 
        }
        await SubCategory.findByIdAndUpdate(id, updateData, { new:true });
        console.log('Category Updated.');
        return res.redirect('/sub-category/view'); 
    } catch (error) {
        console.log(error.message);
        return res.redirect(req.get('Referrer') || '/');
    }
}