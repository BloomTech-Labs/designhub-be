const express = require('express');
const router = express.Router();

const secured = require('../utils/secured');

const controller = require('./categoriesController');

//category_names
router.get('/all', controller.getAllCategoryNames); 
// router.post('/create', secured, controller.createProjectCategory); //add a category name - to be added later.

//project_categories
router.get('/project/all', controller.getAllProjectCategories); 
router.post('/add', secured, controller.addCategoryToAProject); //add a poject category 
router.get('/user/:id', secured, controller.getCategoriesByUserId); 
router.get('/:id', secured, controller.getCategoryByCategoryId); 
router.get('/projects/:id', secured, controller.getCategoriesByProjectId); 
// router.get('/projects/category/:category', secured, controller.getProjectsBySearchedCategory); To be added later.
router.get('/projectsByCategory/:id', controller.getProjectsByCategoryId);
router.delete('/:id', secured, controller.deleteCategoryById); 

module.exports = router;


