const ExtraCategory = require("../models/extraCatSchema");
const fs = require('fs');
const path = require('path');

exports.createPage = (req, res) => {
    return res.render('./pages/add-ext-subCategory')
}

exports.create = async (req, res) => {
    try {
        req.body.image = req.file.filename;
        await ExtraCategory.create(req.body);
        console.log('Extra Sub-Category Created.');
        return res.redirect(req.get('Referrer') || '/');
    } catch (error) {
        console.log(error.message);
        return res.redirect(req.get('Referrer') || '/');
    }
}

exports.viewData = async (req, res) => {
    try {
        const extCategories = await ExtraCategory.find({});
        res.render('./pages/view-ext-subCategory', { extCategories });
    } catch (error) {
        console.log(error.message);
        res.render('./pages/view-ext-subCategory', { extCategories: [] });
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const extCategory = await ExtraCategory.findByIdAndDelete(id);
        fs.unlinkSync(path.join(__dirname, '../uploads/extraCategory', extCategory.image))
        console.log('Extra Sub-Category Deleted.');
        return res.redirect(req.get('referrer') || '/')
    } catch (error) {
        console.log(error.message);
        res.redirect(req.get('referrer') || '/');
    }
}

exports.editpage = async (req, res) => {
    try {
        const extCategory = await ExtraCategory.findById(req.params.id)

        return res.render('./pages/edit-extCategory', { extCategory })
    } catch (error) {
        console.log(error.message);
        res.redirect(req.get('referrer') || '/');
    }
}

exports.edit = async (req, res) => {
    try {
        const { id } = req.params;

        const updateData = req.body;

        if (req.file) {
            const extCategory = await ExtraCategory.findById(id);

            if (extCategory.image) {
                const oldImagePath = path.join(__dirname, '../uploads/extraCategory', extCategory.image);
                try {
                    fs.unlinkSync(oldImagePath);
                } catch (err) {
                    console.log(err);

                }
            }
            updateData.image = req.file.filename;
        }
        await ExtraCategory.findByIdAndUpdate(id, updateData, { new: true });
        console.log('Extra Sub-Category Updated.');
        return res.redirect('/ext-category/view');
    } catch (error) {
        console.log(error.message);
        return res.redirect(req.get('Referrer') || '/');
    }
}