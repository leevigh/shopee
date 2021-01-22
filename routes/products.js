const express = require('express');
const router = express.Router();
const check = require('../middleware/check');
const multer = require('multer');
const prodCont = require('../controllers/products');
const {upload} = require('../middleware/multer');

router.get('/', prodCont.getProducts);
router.post('/create', check, upload.single('productImage'), prodCont.createProduct);
router.get('/:productId', prodCont.getProduct);
router.delete('/:productId', prodCont.deleteProduct);
// router.post('/upload', multerUploads, (req, res, next) => {
//     console.log('req file: ', req.file);
//     next();
// })

module.exports = router;
