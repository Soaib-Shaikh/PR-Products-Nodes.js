const { Router } = require("express");
const subCatCtl = require('../controllers/subCategory.controller');
const multer = require("multer");
const subCatRouter = Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/subCategory/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const subCatUpload = multer({ storage: storage }).single('image');

// Create
subCatRouter.get('/create',subCatCtl.createpage);
subCatRouter.post('/create',subCatUpload, subCatCtl.createData);

// View
subCatRouter.get('/view', subCatCtl.viewData);

// Delete
subCatRouter.get('/delete/:id', subCatCtl.delete);

// Edit
subCatRouter.get('/edit/:id', subCatCtl.editPage);
subCatRouter.post('/edit/:id',subCatUpload, subCatCtl.update);

module.exports = subCatRouter;
