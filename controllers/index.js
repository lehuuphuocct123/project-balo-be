const { Router } = require("express");
const routerUser = require("./user");
const routerCategory = require("./category");
const routerProduct = require("./product");
const routerAuth = require("./auth");
const routerUpload = require("./upload");

const router = Router();

router.use('/user', routerUser)
router.use('/category', routerCategory)
router.use('/product', routerProduct)
router.use('/', routerAuth)
router.use('/upload', routerUpload)

module.exports = router;
