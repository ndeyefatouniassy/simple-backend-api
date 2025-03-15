const express = require('express');
const Product = require('../models/product.model'); 
const router = express.Router();
const {getProducts,getProduct,createProduct,updateProduct} = require('../controllers/product.controller.js')

router.get('/',getProducts );
router.get("/:id",getProduct);

router.post('/',createProduct);

//update
router.put('/:id', updateProduct);


module.exports = router;