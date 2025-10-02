const { Router } = require("express");
const extCtl = require('../controllers/extraCategory.controller');
const upload = require("../middlewares/upload");

const extRouter = Router();

// Create
extRouter.get('/create', extCtl.createPage);
extRouter.post('/create', upload.single('image'), extCtl.create);

// View
extRouter.get('/view', extCtl.viewData);

// Delete
extRouter.get('/delete/:id', extCtl.delete);

// Edit
extRouter.get('/edit/:id', extCtl.editpage);
extRouter.post('/edit/:id', upload.single('image'), extCtl.edit);

module.exports = extRouter;
