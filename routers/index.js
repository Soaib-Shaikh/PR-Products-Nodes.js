const { Router } = require("express");

const adminCtl = require('../controllers/admin.controller');
const upload = require("../middlewares/upload");
const router = Router();

router.get('/', adminCtl.homePage);

router.get('/viewProduct', adminCtl.tablePage);

router.get('/addProduct', adminCtl.formBasicPage);
router.post('/addProduct', upload.single('image'), adminCtl.formBasic);

router.get('/delete/:id', adminCtl.deleteProduct);

router.get('/edit/:id', adminCtl.editProductPage);
router.post('/edit/:id', upload.single('image'), adminCtl.editProduct);

router.use('/category', require('./category.routes'));
router.use('/sub-category', require('./subCategory.routes'));
router.use('/ext-category', require('./extraCategory.routes'));
router.use('/client', require('./clientSide.routes'));

module.exports = router;
