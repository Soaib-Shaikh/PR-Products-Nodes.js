const { Router } = require("express");
const categoryCtl = require('../controllers/category.controller')
const multer = require("multer")

const catRouter = Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/category/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const categoryUpload = multer({ storage: storage }).single('image');

// Add Category
catRouter.get('/add-category', categoryCtl.addCategoryPage);
catRouter.post('/add-category',categoryUpload, categoryCtl.addData);

// View Category
catRouter.get('/view-category', categoryCtl.viewData)

// Delete
catRouter.get('/delete/:id', categoryCtl.deleteCategory)

// Edit
catRouter.get('/edit/:id', categoryCtl.editCategoryPage);
catRouter.post('/edit/:id',categoryUpload, categoryCtl.editCategory);

module.exports = catRouter;

