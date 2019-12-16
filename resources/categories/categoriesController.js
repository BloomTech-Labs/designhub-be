const go = require('../utils/crud');
const db = require('../../data/dbConfig');

const userMatches = require('../utils/userMatches');

exports.getAllCategoryNames = async (req, res) => {
    try {
      const categoryNames = await db('category_names');
  
      return res.status(200).json(categoryNames);
    } catch (err) {
      return res.status(500).json({ message: 'There was an error retrieving the category names from the database.' });
    }
  };


exports.createProjectCategory = async (req, res) => {
    //category
    if (!req.body.category) {
        return res.status(400).json({ message: 'A valid category name is required' });
    }

     try {
        
        //if the category was already added 
        const categories = await db('category_names')
          .where('category', category);          
    
        if (categories.length > 0) {
          return res
            .status(401)
            .json({ message: `You already added this category. ` });
        }    
        
        const [categoryName] = await go.createOne('category_names', '*', {
          category
        });    
    
        return res.status(201).json(categoryName);
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          message: 'An error occured in the database while adding the category.'
        });
      }

};

exports.getAllProjectCategories = async (req, res) => {
    try {
      const projectCategories = await db('project_categories');
  
      return res.status(200).json(projectCategories);
    } catch (err) {
      return res.status(500).json({ message: 'There was an error retrieving the project categories from the database.' });
    }
  };

//add a category to a project
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

  
exports.getCategoriesByUserId = async (req, res) => {
    try {
      const [user] = await db('users')
        .select('id')
        .where('auth0Id', req.user.sub); 
      
      const categories = await db('project_categories')
      //'userId' is the name of the a field in the users table
      .where('userId', user.id);
  
      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'An error occured while retrieving the user categories from the database.' });
    }
};


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
      .select('*');       
  
      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'An error occured while retrieving the project categories from the database.' });
    }
  };

  exports.getProjectsBySearchedCategory = async (req, res) => {
    const category = req.params.category;

    //get the search tag
    //search the categories table to see if tht category exists
    //if it exists, use the project ids that matches the tags to search the projects table and return projects
  
    try {
      const searchData = await go.getCategoriesBySearch('category_names', category);

      /*const searchData = await db('poject_tags')
      .where('tag', 'like', `%${tag}%`);*/
  
      if (searchData.length === 0) {
        return res
          .status(404)
          .json({ message: 'That category does not exist.' });
      }      
         
      
      //const [project] = await go.getById('user_projects', searchData[0].projectId);

      const projects = await db('user_projects')
      .join('project_categories', 'user_projects.id', '=', 'project_categories.projectId')
      .join('category_names', 'category_names.id', '=', 'project_categories.categoryId')
      .where( 'category_names.category', 'like', `%${category}%` ) 
  
      res.status(200).json(projects);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'There was an error retrieving the searched projects from the database.' });
    }
}; 



  
exports.deleteCategoryById = async (req, res) => {

    const id = req.params.id;  
  
    try {
      const category = await go.getById('project_categories', id);          
  
      if (category.length === 0) {
        return res
          .status(404)
          .json({ message: 'A category with that id was not found' });
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
  
//GET Projects by Category Id

exports.getProjectsByCategoryId = async (req, res) => {
  const categoryId = req.params.id;
  //get the category id
  //search the categories table to see if tht category exists
  //if it exists, use the project ids that matches the category id to search the projects table and return projects

  try {
    const searchData = await go.getById('category_names', categoryId);
    /*const searchData = await db('poject_tags')
    .where('tag', 'like', `%${tag}%`);*/

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

    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'There was an error retrieving the searched projects from the database.' });
  }
};