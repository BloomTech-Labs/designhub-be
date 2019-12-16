const express = require('express');
const router = express.Router();

const secured = require('../utils/secured');

const controller = require('./categoriesController');

//category_names
router.get('/all', controller.getAllCategoryNames); 
router.post('/create', secured, controller.createProjectCategory); //add a category name 

//project_categories
router.get('/all', controller.getAllProjectCategories); 
router.post('/add', secured, controller.addCategoryToAProject); //add a poject category 
router.get('/user/:id', secured, controller.getCategoriesByUserId); 
router.get('/:id', secured, controller.getCategoryByCategoryId); 
router.get('/projects/:id', secured, controller.getCategoriesByProjectId); 
router.get('/projects/:category', secured, controller.getProjectsBySearchedCategory);
router.delete('/:id', secured, controller.deleteCategoryById); 

module.exports = router;


