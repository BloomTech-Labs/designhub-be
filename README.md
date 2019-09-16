

# API Documentation

#### 1️⃣ Backend delpoyed at STAGING: https://designhubx-staging.herokuapp.com/ PRODUCTION: https://designhubx.herokuapp.com/  <br>

## 1️⃣ Getting started

To get the server running locally:


- Clone this repo
- **yarn ** to install all required dependencies
- **yarn dev** to start the local server




## 2️⃣ Endpoints


#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/api/v1/users`         | N/A                 | returns list of users in ascending order           |
| GET    | `/api/v1/users/:id`     | N/A                 | expects user (id) in params                        |
| POST   | `/api/v1/users/`        | N/A                 | expects a (req.body) with user info                |
| PUT    | `/api/v1/users/:id`     | N/A                 | expects a (req.body) with updated object and (id)  |
| DELETE | `/api/v1/users/:id`     | N/A                 | expects (id) of the user that needs to delete      |        

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/api/v1/projects`      | N/A                 | returns list of projects in ascending order        |
| GET    | `/api/v1/projects/:id`  | N/A                 | expects user (id) in params                        |
| POST   | `/api/v1/projects/`     | N/A                 | expects a (req.body) with project info             |
| PUT    | `/api/v1/projects/:id`  | N/A                 | expects a (req.body) with updates and id           |
| DELETE | `/api/v1/projects/:id`  | N/A                 | expects (id) of the project that needs to delete   |      

# Data Model



#### USERS

---

```
{
  id: AUTO increment
  auth0Id: required: references users auth0 id
  username: required and unique
  email: STRING
  phoneNumber: STRING
  firstName: STRING
  lastName: STRING
  location: STRING
  bio: TEXT
  website: STRING
  avatar: STRING
  created_at: AUTO timestamp
  
}
```

#### USERS

---

```
{
  id: AUTO increment
  userId: required: references users id who made the post
  private: boolean for if its a private repository or not. Default to false
  projectName: required: name of project
  created_at: AUTO timestamp
  updated_at: AUTO timestamp should be updated every time there is an update to the project
  
  
}
```

## 2️⃣ Actions

🚫 This is an example, replace this with the actions that pertain to your backend

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

🚫 These are just examples, replace them with the specifics for your app
    
    *  STAGING_DB - optional development db for using functionality not available in SQLite
    *  NODE_ENV - set to "development" until ready for "production"
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])
    *  SENDGRID_API_KEY - this is generated in your Sendgrid account
    *  stripe_secret - this is generated in the Stripe dashboard
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
