const { Router } = require("express");
const multer = require("multer");
const extCtl = require('../controllers/extraCategory.controller')
const extRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/extraCategory/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const extCatUpload = multer({ storage: storage }).single('image');

// Create
extRouter.get('/create',extCtl.createPage );
extRouter.post('/create', extCatUpload, extCtl.create);

// View
extRouter.get('/view', extCtl.viewData);

// Delete
extRouter.get('/delete/:id', extCtl.delete)

// Edit
extRouter.get('/edit/:id', extCtl.editpage);
extRouter.post('/edit/:id',extCatUpload, extCtl.edit);

module.exports = extRouter;