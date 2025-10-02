const { Router } = require("express");
const subCatCtl = require('../controllers/subCategory.controller');
const upload = require("../middlewares/upload");

const subCatRouter = Router();

// Create
subCatRouter.get('/create', subCatCtl.createpage);
subCatRouter.post('/create', upload.single('image'), subCatCtl.createData);

// View
subCatRouter.get('/view', subCatCtl.viewData);

// Delete
subCatRouter.get('/delete/:id', subCatCtl.delete);

// Edit
subCatRouter.get('/edit/:id', subCatCtl.editPage);
subCatRouter.post('/edit/:id', upload.single('image'), subCatCtl.update);

module.exports = subCatRouter;
