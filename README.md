

# API Documentation

#### 1️⃣ Backend delpoyed at STAGING: https://designhubx-staging.herokuapp.com/ PRODUCTION: https://designhubx.herokuapp.com/  <br>

![Travis CI](https://travis-ci.com/Lambda-School-Labs/designhub-be.svg?branch=master)

## 1️⃣ Getting started

To get the server running locally:


- Clone this repo
- **yarn ** to install all required dependencies
- **yarn dev** to start the local server




## 2️⃣ Endpoints


#### USER Routes

| Method | Endpoint                | Access Control | Description                                        | Attached to req                | Returned                         |
| ------ | ----------------------- | -------------- | -------------------------------------------------- |------------------------------- |--------------------------------- |
| GET    | `/api/v1/users`         | N/A            | Get list of users                                  | N/A                            | Returns list of users in ascending order   |
| GET    | `/api/v1/users/:id`     | N/A            | Get single user by ID                              | { `id` } ->  from req.params.  | Returns found user                        |
| POST   | `/api/v1/users/`        | N/A            | { `sub`(required), `avatar`(if exists) } -> You will use this endpoint everytime you log in. It will look up the user by sub. | N/A |  If the user exists, it will return the the existing user. If no user found, it will make 1 |
| PUT    | `/api/v1/users/:id`     | N/A            | Update a user by ID                                | { `id` } -> from req.params. && { `updated key/value pairs` } -> from req.body (see user schema down below to see what data it needs. | Returns updated user |
| DELETE | `/api/v1/users/:id`     | N/A            | Delete a single user                               | { `id` } -> from req.params.   |  Returns message "User successfully deleted" |       


#### PROJECT Routes

| Method | Endpoint                | Access Control | Description                                        | Attached to req                | Returned                         |
| ------ | ----------------------- | -------------- | -------------------------------------------------- |------------------------------- |--------------------------------- |
| GET    | `/api/v1/projects`      | N/A            | Get list of all projects                           |                                | Returns list of projects in ascending order |
| GET    | `/api/v1/projects/:id`  | N/A            | Get single project by ID                           | { `id`} -> from req.params     | Returns found project                       |
| POST   | `/api/v1/projects/`     | N/A            | Add a new project                                  | { `key/value pairs` } -> from req.body (check schema below) | Returns success message and created project |
| PUT    | `/api/v1/projects/:id`  | N/A            | Updates a project                                  | { `id` } -> from req.params { `updated key/value pairs` } -> from req.body (check schema below to see what it needs) | Returns updated project |
| DELETE | `/api/v1/projects/:id`  | N/A            | Delete a single project                            | { `id` } -> from req.params.   | Returns success message                     |
   

#### PROJECT PHOTOS Routes

| Method | Endpoint                                 | Access Control | Description                                        | Attached to req                | Returned                         |
| ------ | ---------------------------------------- | -------------- | -------------------------------------------------- |------------------------------- |--------------------------------- |
| POST   | `/api/v1/photo/projects/signed`          | N/A            | The id should reference the project's id that you are posting the photo to. This ensures that the photos will be placed in a folder based on the project's id. | req.body: { id } | This endpoint will return a presigned url and a key. The URL will be used to make a put request to aws to store the photo. The key will be used to store in our database's project_photos table. You will pass it to another asynchronous method. Keep in mind that the key is the right half of the URL that we are reading the photo from. This ensures that if we wanted to change cloud services, we could do so without losing any data |
| GET    | `/api/v1/photo/projects/:id`             | N/A            | The id should reference the project id.            | req.params: { id }             | This will return an array of photo records based on the project id. |
| GET    | `/api/v1/photo/projects/one/:id`         | N/A            | The id should reference the project_photo's id.    | req.params: { id }             | This will return a single record based on the project_photos.id |
| POST   | `/api/v1/photo/projects`                 | N/A            | The url will come from the response of the presigned url. Make sure that you are saving the key to the url column. Example: url:key, not url:url. | req.body: { projectId, url, description, title } | This will return the new record you created. |
| DELETE | `/api/v1/photo/projects/:id`             | N/A            | The id should match the project_photos.id          | req.params: { id }             | This will return a message saying you successfully deleted the photo. |

#### COMMENTS Routes

| Method | Endpoint                           | Access Control   | Description                                        | Attached to req                | Returned                                                      |
| ------ | ---------------------------------- | ---------------- | -------------------------------------------------- |------------------------------- |-------------------------------------------------------------- |
| POST   |`/api/v1/comments/project`          | N/A              | The userId will reference the users.id, the username will reference the users.username, the projectId will reference the users.projectId, text will reference the comment's text you made. | req.body: { userId, username, projectId, text, top, left } | It will return the comment record you created |
| GET    | `/api/v1/comments/project/:id`     | N/A              | The id should reference the user_projects.id.                   | req.params: { id }             | This will return all the records based on the project's id. (user_projects.id) |
| PUT    | `/api/v1/comments/:id`      | N/A              | The id should reference the comment id.       | req.params: { id } req.body: { key/value pairs of the updated comment } | This will return the updated record |
| DELETE | `/api/v1/comments/:id`  | N/A              | The id in the req.params should reference the comments.id       | req.params: { id } | This will return a message that the comments record is deleted |


#### PHOTO COMMENTS Routes

| Method | Endpoint                    | Access Control | Description    | Attached to req                | Returned                         |
| ------ | --------------------------- | -------------- | -------------- |------------------------------- |--------------------------------- |
| POST   | `/api/v1/comments/photo`    | N/A            | The userId will reference the users.id, the username will reference the users.username, the imageId will reference the users.imageId, text will reference the comment's text you made and top and left are used for sticky comments | req.body: { userId, username, imageId, text, top, left } | It will return the comment record you created. |
| GET    | `/api/v1/comments/photo/:id`| N/A            | The id should reference the project_photos.id.     | req.params: { id }             | This will return all the records based on the image's id. (project_photos.id) |
| PUT    | `/api/v1/comments/:id`      | N/A            | The id should reference the image id. (project_photos.id) | req.params: { id } req.body: { key/value pairs of the updated comment } | This will return the updated record. |
| DELETE | `/api/v1/comments/:id`      | N/A            | The id in the req.params should reference the comments.id | req.params: { id }      | This will return a message that the comments record is deleted |

#### FOLLOWERS Routes

| Method | Endpoint                                 | Access Control | Description                                        | Attached to req                | Returned                         |
| ------ | ---------------------------------------- | -------------- | -------------------------------------------------- |------------------------------- |--------------------------------- |
| POST   | `/api/v1/followers`                      | N/A            | The followingId should reference the person who is following another user. ( ref: users.id )The followedId should reference the person who is being followed. ( ref: users.id ) | req.body: { followingId, followedId } | It will return the follow record you created. |
| GET    | `/api/v1/followers/count/following/:id`  | N/A            | The id should reference the users id.              | req.params: { id }             | This will return the count of the total amount of people that the user is following based on the users.id |
| GET    | `/api/v1/followers/count/followers/:id`  | N/A            | The id should reference the users id.              | req.params: { id }             | This will return a single record based on the project_photos.id |
| POST   | `/api/v1/followers/unfollow/:id`         | N/A            | The id in the req.body should reference the user who is doing the unfollowing. The id in the req.params should reference the person who is being unfollowed. | req.body: { id } req.params: { id } | This will return a message that the user is successfully unfollowed. |

#### HEATMAP Routes

| Method | Endpoint                                 | Access Control | Description                                        | Attached to req                | Returned                         |
| ------ | ---------------------------------------- | -------------- | -------------------------------------------------- |------------------------------- |--------------------------------- |
| POST   | `/api/v1/heatmap`                        | N/A            | The userId should reference the users.id. The projectId should reference the user_projects.id. The contribution should be a description of what the contribution was | req.body: {userId, projectId, contribution } | It will return the heatmap record you created. |
| GET    | `/api/v1/heatmap/:id`                    | N/A            | The id should reference the users.id.              | req.params: { id }             | This will return all the heatmap records based on the users.id |
| GET    | `/api/v1/heatmap/count/:id`              | N/A            | The id should reference the users id.              | req.params: { id }             | This will return the count of the total heat map records based on the user id. This way we can specifiy how many contributions a user has made total |
| DELETE | `/api/v1/heatmap/:id`                    | N/A            | The id should reference the users.id.              | req.params: { id }             | This will return a message that the heatmap record has been deleted. |


#### STARRED Routes

| Method | Endpoint                                 | Access Control | Description                                        | Attached to req                | Returned                         |
| ------ | ---------------------------------------- | -------------- | -------------------------------------------------- |------------------------------- |--------------------------------- |
| POST   | `/api/v1/star`                           | N/A            | The userId will reference the user that is doing the starring. The projectId will reference the project that is being starred. | req.body: { userId, projectId } | It will return the star record you created. |
| POST   | `/api/v1/star/unstar/:id`                | N/A            | The id in the req.params should reference the project's id. The id in the body should reference the user's id | req.params: { id } req.body: { id } | This will return a message saying you unstarred the project |
| GET    | `/api/v1/star/count/:id`                 | N/A            | The id should reference the projects id            | req.params: { id }             | This will return the count of the total stars that the project has. |

# Data Model



#### USERS

---

```
{
  id: AUTO increment PK,
  auth0Id: (required, unique) integer, references user's auth0 id
  username: (unique) string,
  email: string,
  phoneNumber: (unique) string,
  firstName: string,
  lastName: string,
  location: string,
  bio: text,
  website: string,
  avatar: string,
  created_at: AUTO timestamp
}
```

#### PROJECTS

---

```
{
  id: AUTO increment PK,
  userId: (required) integer, references user's id who created the project,
  private: boolean for if its a private repository or not. Default to false,
  name: (required) string,
  description: text,
  created_at: AUTO timestamp,
  updated_at: AUTO timestamp should be updated every time there is an update to the project,
  figma: string,
  invision: string,
  mainImg: text,
}
```

## 2️⃣ Actions

`getAllUsers()` -> Returns all users

`getSingleUser(userId)` -> Returns a single user when supplied with user's ID

`updateUser(userId, changes object)` -> Updates a single user by ID

<br>
<br>
<br>

`getAllProjects()` -> Returns all projects

`addProject(project object)` -> Creates a new project and returns that project

`getSingleProject(projectId)` -> Returns a single project when supplied with the project's ID

`updateProject(projectId, changes object)` -> Updates a single project by ID and returns the newly updated project

`deleteProject(projectId)` -> Deletes a single project when supplied with project's ID

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
