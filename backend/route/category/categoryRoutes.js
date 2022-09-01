const express = require("express");
const { categoryCtrl,fetchCategoriesCtrl,fetchcategoryctrl,categoryUpdateCtrl,deleteCategoryCtrl } = require("../../controllers/Category/CategoryController");
const authmidlewarres = require("../../middlewares/error/auth");
const categoryRoutes = express.Router();


categoryRoutes.post('/',authmidlewarres,categoryCtrl)
categoryRoutes.get('/',fetchCategoriesCtrl);
categoryRoutes.delete('/:id',deleteCategoryCtrl)
categoryRoutes.put('/:id',authmidlewarres,categoryUpdateCtrl)
categoryRoutes.get('/:id',fetchcategoryctrl);








module.exports = categoryRoutes;
