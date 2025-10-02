const SubCategory = require("../models/subCategorySchema");

exports.createpage = (req,res) => {
    return res.render('pages/add-subcategory');
}

exports.createData = async (req,res) => {
    try {
        if(req.file) req.body.image = req.file.path;
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
        await SubCategory.findByIdAndDelete(id);
        console.log('Sub-Category Deleted.');
        return res.redirect(req.get('referrer') || '/');
    } catch (error) {
        console.log(error.message);
        res.redirect(req.get('referrer') || '/');
    }
}

exports.editPage = async (req,res) =>{
    try {
        const subCategory = await SubCategory.findById(req.params.id);
        return res.render('./pages/edit-subCategory', { subCategory });
    } catch (error) {
        console.log(error.message);
        return res.render('./pages/edit-subCategory');
    }
}

exports.update = async (req,res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if(req.file) updateData.image = req.file.path;

        await SubCategory.findByIdAndUpdate(id, updateData, { new:true });
        console.log('Sub-Category Updated.');
        return res.redirect('/sub-category/view'); 
    } catch (error) {
        console.log(error.message);
        return res.redirect(req.get('Referrer') || '/');
    }
}
