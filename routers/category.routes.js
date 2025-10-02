const { Router } = require("express");
const categoryCtl = require('../controllers/category.controller');
const upload = require("../middlewares/upload");

const catRouter = Router();

// Add Category
catRouter.get('/add-category', categoryCtl.addCategoryPage);
catRouter.post('/add-category', upload.single('image'), categoryCtl.addData);

// View Category
catRouter.get('/view-category', categoryCtl.viewData);

// Delete
catRouter.get('/delete/:id', categoryCtl.deleteCategory);

// Edit
catRouter.get('/edit/:id', categoryCtl.editCategoryPage);
catRouter.post('/edit/:id', upload.single('image'), categoryCtl.editCategory);

module.exports = catRouter;
