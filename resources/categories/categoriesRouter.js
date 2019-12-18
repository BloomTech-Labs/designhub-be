const express = require('express');
const router = express.Router();

const secured = require('../utils/secured');

const controller = require('./categoriesController');

//category_names
router.get('/all', controller.getAllCategoryNames); 

//project_categories
router.get('/projects/all', controller.getAssignedProjectCategories); //all categories that are assigned to projects
router.post('/project/add', secured, controller.addCategoryToAProject); 
router.get('/user/:id', secured, controller.getCategoriesByUserId); 
router.get('/:id', secured, controller.getCategoryByCategoryId); 
router.get('/projects/:id', secured, controller.getCategoriesByProjectId); 
router.get('/projects/category/:id', controller.getProjectsByCategoryId);
router.delete('/project/:id', secured, controller.deleteCategoryFromProject); 
router.put('/project/:id', secured, controller.updateProjectCategoryById);

module.exports = router;


