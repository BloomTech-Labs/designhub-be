const go = require('../utils/crud');
const db = require('../../data/dbConfig');

const userMatches = require('../utils/userMatches');

//get all category names: /api/v1/projectCategories/all
exports.getAllCategoryNames = async (req, res) => {
    try {
      const categoryNames = await db('category_names');
  
      return res.status(200).json(categoryNames);
    } catch (err) {
      return res.status(500).json({ message: 'There was an error retrieving the category names from the database.' });
    }
  };

//all categories that have projects assigned: /api/v1/projectCategories/projects/all
exports.getAssignedProjectCategories = async (req, res) => {

    try {
      const projectCategories = await db('project_categories')     
      .join('category_names', 'project_categories.categoryId', '=', 'category_names.id')    
      .select('category_names.id', 'category_names.category', 'project_categories.projectId'); 
      
      if(projectCategories.length < 0){
        res.status(404).json({ message: 'No projects have been assigned a category.' });
      }
  
      return res.status(200).json(projectCategories);

    } catch (err) {
      return res.status(500).json({ message: 'There was an error retrieving the project categories from the database.' });
    }
  };

//add a category to a project /api/v1/projectCategories/add
exports.addCategoryToAProject = async (req, res) => {
    // projectId
    // userId
    // categoryId
  
    if (!req.body.projectId) {
      return res.status(400).json({ message: 'A valid project id is required' });
    }
    if (!req.body.userId) {
      return res.status(400).json({ message: 'A valid user id is required' });
    }
    if (!req.body.categoryId) {
      return res.status(400).json({ message: 'A valid category id required' });
    }
  
    const { projectId, userId, categoryId } = req.body;  
  
    const [project] = await go.getById('user_projects', projectId);
  
    // Does the project exist?
    if (!project) {
      return res
        .status(404)
        .json({ message: 'A project with that ID does not exist!' });
    }
  
    // Is this person allowed to add categories to this project?
    if (!(await userMatches(req.user, project.userId))) {
      return res
        .status(401)
        .json({ message: 'You may not add categories to this project!' });
    }
    try {
      
      //if the category was already added to the project
      const categories = await db('project_categories')
        .where('categoryId', categoryId) 
        .andWhere('projectId', projectId)
        .andWhere('userId', userId);
  
      if (categories.length > 0) {
        return res
          .status(401)
          .json({ message: `You already added this category to this project!` });
      }  
      
      const [categoryTag] = await go.createOne('project_categories', '*', {
        projectId,
        userId,
        categoryId
      });    
  
      return res.status(201).json(categoryTag);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'An error occured in the database while adding the category to the project.'
      });
    }
  };

//all categories that a user assigned to all their projects /api/v1/projectCategories/user/:id 
exports.getCategoriesByUserId = async (req, res) => {
    try {
      const [user] = await db('users')
        .select('id')
        .where('auth0Id', req.user.sub); 
      
      const categories = await db('project_categories') 
      .join('category_names', 'category_names.id', '=', 'project_categories.categoryId')    
      .where('userId', user.id)
      .select('project_categories.id', 'project_categories.projectId', 'project_categories.userId', 
              'project_categories.categoryId', 'category_names.category');
  
      res.status(200).json(categories);

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'An error occured while retrieving the user categories from the database.' });
    }
};

///api/v1/projectCategories/:id
exports.getCategoryByCategoryId = async (req, res) => {
    const categoryId = req.params.id;
  
    try {

    const category = await db('category_names')      
    .where('category_names.id', categoryId);    
        
    res.status(200).json(category);
    }
    catch (err) {
      res.status(500).json({ message: 'An error occured while retrieving the category from the database.' })
    }
  
}

//get all categories assigned to a project /api/v1/projectCategories/projects/:id
exports.getCategoriesByProjectId = async (req, res) => {
    const projectId = req.params.id;
  
    try {
      const project = await go.getById('user_projects', projectId);
  
      if (project.length === 0) {
        return res
          .status(404)
          .json({ message: 'A project with that id does not exist.' });
      }

      const categories = await db('project_categories')
      .join('category_names', 'project_categories.categoryId', '=', 'category_names.id')    
      .where('projectId', projectId)
      .select('project_categories.id as projectCategoryId', 'project_categories.projectId', 'project_categories.userId', 
              'project_categories.categoryId', 'category_names.id', 'category_names.category');   
              
      if(categories.length === 0){
        res.status(200).json({message: 'There are no categories assigned to this project.' });
      }
  
      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'An error occured while retrieving the project categories from the database.' });
    }
  }; 

//delete a category from a project by project_category id /api/v1/projectCategories/:id
exports.deleteCategoryFromProject = async (req, res) => {

    const id = req.params.id;  
  
    try {
      const category = await go.getById('project_categories', id);          
  
      if (category.length === 0) {
        return res
          .status(404)
          .json({ message: 'That category is not assigned to this project.' });
      }
  
      const project = await go.getById('user_projects', category[0].projectId);
  
      if (await userMatches(req.user, project[0].userId)) {
          await go.destroyById('project_categories', id)
          return res.status(200).json({ message: 'This category has been deleted from your project.' });      
      } else {
        return res
          .status(401)
          .json({ message: 'You are not authorized to delete this category from the project.' });
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: 'An error occurred in the database while deleting this category from the project.' });
    }
};
  
//get all projects assigned to a category
exports.getProjectsByCategoryId = async (req, res) => {
  const categoryId = req.params.id;
  //get the category id
  //search the categories table to see if tht category exists
  //if it exists, use the project ids that match the category id to search the projects table and return projects

  try {
    const searchData = await go.getById('category_names', categoryId);
   
    if (searchData.length === 0) {
      return res
        .status(404)
        .json({ message: 'That category does not exist.' });
    }    
    
    //const [project] = await go.getById('user_projects', searchData[0].projectId);
    const projects = await db('user_projects')
    .join('project_categories', 'user_projects.id', '=', 'project_categories.projectId')
    .join('category_names', 'category_names.id', '=', 'project_categories.categoryId')
    .where( 'project_categories.categoryId', categoryId ) 
    .andWhere('user_projects.privateProjects', '=', false)
    .select(
      'user_projects.id',
      'user_projects.userId',      
      'user_projects.privateProjects',
      'user_projects.name',
      'user_projects.description',
      'user_projects.figma',
      'user_projects.invision',
      'user_projects.mainImg',
      'user_projects.created_at',
      'user_projects.updated_at'
    )    
    .orderBy('id', 'asc');

    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'There was an error retrieving the searched projects from the database.' });
  }
};