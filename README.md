# DesignHub - API Documentation

- A seamless collaborative design asset platform for designers by designers.
- You can find the deployed project at <https://www.designhubx.com>
- STAGING: <https://designhubx-staging.herokuapp.com/>
- PRODUCTION: <https://designhubx.herokuapp.com/>

![Travis CI](https://travis-ci.com/Lambda-School-Labs/designhub-be.svg?branch=master)

[![maintainability](https://api.codeclimate.com/v1/badges/0a4a96bab029d8b3eb1c/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/designhub-be/maintainability)

[![maintainability](https://api.codeclimate.com/v1/badges/0a4a96bab029d8b3eb1c/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/designhub-be/test_coverage)

## Installation Instructions

To get the server running locally:

- Clone this repo
- **yarn** to install required dependencies
- **yarn dev** to start the local server


To view GQL Playground go to [localhost:8000/graphql](http://localhost:8000/graphql).

### Endpoints ( `/api/v1/...` )

## USERS

| Method | Endpoint                 | Access Control | Description                                                                      | Attached to req                                                                                                                              | Returned                                                                                                      |
| -----: | :----------------------- | :------------: | :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
|    GET | `/users`                 |      N/A       | Get list of users                                                                | N/A                                                                                                                                          | Returns list of users in ascending order                                                                      |
|    GET | `/users/:id`             |      N/A       | Get single user by ID                                                            | {`id`} -> from req.params                                                                                                                    | Returns found user                                                                                            |
|    GET | `/users/check/:username` |      N/A       | Check if username currently exists in database (used for onboarding form)        | {`username`} -> from req.params                                                                                                              | Returns username if it exists, or status 204 and an empty array if username does not exist                    |
|   POST | `/users`                 |      N/A       | You will use this endpoint everytime you log in. It will look up the user by sub | {`sub` (required), `avatar` (if exists) }                                                                                                    | If the user exists, it will return the the existing user. If no user found, it will create a new user account |
|    PUT | `/users/:id`             |      N/A       | Update a user by ID                                                              | {`id`} -> from req.params && {`auth0Id` (required)} -> from req.body && {`updated key/value pairs`} -> from req.body (see user schema below) | Returns updated user                                                                                          |
| DELETE | `/users/:id`             |      N/A       | Delete a single user                                                             | {`id`} -> from req.params                                                                                                                    | Returns message "User successfully deleted"                                                                   |


## PROJECTS

| Method | Endpoint                   | Access Control | Description                 | Attached to req                                                                                          | Returned                                                |
| -----: | :------------------------- | :------------: | :-------------------------- | :------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ |
|    GET | `/projects`                |      N/A       | Get list of all projects    | N/A                                                                                                      | Returns list of projects in ascending order             |
|    GET | `/projects/:id`            |      N/A       | Get single project by ID    | {`id`} -> from req.params                                                                                | Returns found project                                   |
|    GET | `/projects/users/:userId`  |      N/A       | Get all projects by userId  | {`userId`} -> from req.params                                                                            | Returns list of all projects made by the user           |
|    GET | `/projects/recent/:userId` |      N/A       | Get all projects by userId  | {`userId`} -> from req.params                                                                            | Returns list of 8 most recent projects made by the user |
|   POST | `/projects`                |      N/A       | Add a new project           | {`key/value pairs`} -> from req.body (check project schema below)                                        | Returns success message and created project             |
|   POST | `/name`                    |      N/A       | Find project by projectName | {`projectName`} -> from req.body                                                                         | Returns success message and found project               |
|    PUT | `/projects/:id`            |      N/A       | Updates a project           | { `id` } -> from req.params && {`updated key/value pairs`} -> from req.body (check project schema below) | Returns updated project                                 |
| DELETE | `/projects/:id`            |      N/A       | Delete a single project     | { `id` } -> from req.params                                                                              | Returns success message                                 |

## PROJECT PHOTO

| Method | Endpoint                  | Access Control | Description                                                                                                                                                    | Attached to req                                    | Returned                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -----: | :------------------------ | :------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    GET | `/photo/projects/:id`     |      N/A       | The id should reference the project id                                                                                                                         | req.params: {`id`}                                 | This will return an array of all photos for the given project id                                                                                                                                                                                                                                                                                                                                                                             |
|    GET | `/photo/projects/one/:id` |      N/A       | The id should reference the photo's id                                                                                                                         | req.params: {`id`}                                 | This will return a single photo that matches the given id                                                                                                                                                                                                                                                                                                                                                                                    |
|   POST | `/photo/projects/signed`  |      N/A       | The id should reference the project's id that you are posting the photo to. This ensures that the photos will be placed in a folder based on the project's id. | req.body: {`id`}                                   | This endpoint will return a presigned url and a key. The URL will be used to make a put request to aws to store the photo. The key will be used to store in our database's project_photos table. You will pass it to another asynchronous method. Keep in mind that the key is the right half of the URL that we are reading the photo from. This ensures that if we wanted to change cloud services, we could do so without losing any data |
|   POST | `/photo/projects`         |      N/A       | The url will come from the response of the presigned url. Make sure that you are saving the key to the url column. Example: url:key, not url:url.              | req.body: { `projectId, url, description, title` } | This will return the new record you created.                                                                                                                                                                                                                                                                                                                                                                                                 |
| DELETE | `/photo/projects/:id`     |      N/A       | The id should match the project_photos.id                                                                                                                      | req.params: { `id` }                               | This will return a message saying you successfully deleted the photo                                                                                                                                                                                                                                                                                                                                                                         |

## COMMENTS

| Method | Endpoint                | Access Control | Description                                                                                                                                                                                | Attached to req                                                             | Returned                                                       |
| -----: | :---------------------- | :------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- | :------------------------------------------------------------- |
|    GET | `/comments/project/:id` |      N/A       | The id should reference the user_projects id                                                                                                                                               | req.params: { `id` }                                                        | This will return all the comments for the given project's id   |
|   POST | `/comments/project`     |      N/A       | The userId will reference the users id, the username will reference the users username, the projectId will reference the users projectId, text will reference the comment's text you made. | req.body: { `userId, username, projectId, text` }                           | It will return the comment record you created                  |
|    PUT | `/comments/:id`         |      N/A       | The id should reference the comment id                                                                                                                                                     | req.params: { `id` } req.body: { `key/value pairs` of the updated comment } | This will return the updated record                            |
| DELETE | `/comments/:id`         |      N/A       | The id in the req.params should reference the comments.id                                                                                                                                  | req.params: { `id`}                                                         | This will return a message that the comments record is deleted |

## PHOTO COMMENTS

| Method | Endpoint              | Access Control | Description                                                                                                                                                                                                                                                                               | Attached to req                                                             | Returned                                                                      |
| -----: | :-------------------- | :------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
|    GET | `/comments/photo/:id` |      N/A       | The id should reference the project_photos id                                                                                                                                                                                                                                             | req.params: { `id` }                                                        | This will return all the records based on the image's id. (project_photos id) |
|   POST | `/comments/photo`     |      N/A       | The userId will reference the users id, the username will reference the users.username, the imageId will reference the users.imageId, text will reference the comment's text you made and top and left are px values automatically generated by sticky comments component on the frontend | req.body: { `userId, username, imageId, text, top, left` }                  | It will return the comment record you created.                                |
|    PUT | `/comments/:id`       |      N/A       | The id should reference the image id. (project_photos id)                                                                                                                                                                                                                                 | req.params: { `id` } req.body: { `key/value pairs` of the updated comment } | This will return the updated record.                                          |
| DELETE | `/comments/:id`       |      N/A       | The id in the req.params should reference the comments id                                                                                                                                                                                                                                 | req.params: { `id` }                                                        | This will return a message that the comments record is deleted                |

## FOLLOWERS

| Method | Endpoint                              | Access Control | Description                                                                                                                                                                      | Attached to req                           | Returned                                                                                                  |
| -----: | :------------------------------------ | :------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
|    GET | `/followers/:followingId/:followedId` |      N/A       |                                                                                                                                                                                  | req.params: { `followingId, followedId` } | This will return a boolean                                                                                |
|    GET | `/followers/count/following/:id`      |      N/A       | The id should reference the users id                                                                                                                                             | req.params: { `id` }                      | This will return the count of the total amount of people that the user is following based on the users id |
|    GET | `/followers/count/followers/:id`      |      N/A       | The id should reference the users id                                                                                                                                             | req.params: { `id` }                      | This will return the count of the total amount of people that are following the users id                  |
|    GET | `/followers/following/:id`            |      N/A       | The id should reference the users id                                                                                                                                             | req.params: { `id` }                      | This will return the user info of all people that the user is following                                   |
|    GET | `/followers/followers/:id`            |      N/A       | The id should reference the users id                                                                                                                                             | req.params: { `id` }                      | This will return the user info of all people that are following the user                                  |
|   POST | `/followers`                          |      N/A       | The followingId should reference the person who is following another user. ( ref: users id ) The followedId should reference the person who is being followed. ( ref: users id ) | req.body: { `followingId, followedId` }   | It will return the follow record you created                                                              |
|   POST | `/followers/unfollow/:id`             |      N/A       | The id in the req.body should reference the user who is doing the unfollowing. The id in the req.params should reference the person who is being unfollowed                      | req.body: { `id` } req.params: { `id` }   | This will return a message that the user is successfully unfollowed                                       |

## HEATMAP

| Method | Endpoint             | Access Control | Description                                                                                                                                                          | Attached to req                                 | Returned                                                                                                                                             |
| -----: | :------------------- | :------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
|    GET | `/heatmap/:id`       |      N/A       | The id should reference the users id                                                                                                                                 | req.params: { `id` }                            | This will return all the heatmap records based on the users id                                                                                       |
|    GET | `/heatmap/count/:id` |      N/A       | The id should reference the users id                                                                                                                                 | req.params: { `id` }                            | This will return the count of the total heat map records based on the user id. This way we can specifiy how many contributions a user has made total |
|   POST | `/heatmap`           |      N/A       | The userId should reference the users id. The projectId should reference the user_projects id. The contribution should be a description of what the contribution was | req.body: { `userId, projectId, contribution` } | It will return the heatmap record you created                                                                                                        |
| DELETE | `/heatmap/:id`       |      N/A       | The id should reference the users id                                                                                                                                 | req.params: { `id` }                            | This will return a message that the heatmap record has been deleted                                                                                  |

## STARRED

| Method | Endpoint           | Access Control | Description                                                                                                                   | Attached to req                         | Returned                                                           |
| -----: | :----------------- | :------------: | :---------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- | :----------------------------------------------------------------- |
|    GET | `/star/count/:id`  |      N/A       | The id should reference the projects id                                                                                       | req.params: { `id` }                    | This will return the count of the total stars that the project has |
|   POST | `/star`            |      N/A       | The userId will reference the user that is doing the starring. The projectId will reference the project that is being starred | req.body: { `userId, projectId` }       | It will return the star record you created                         |
|   POST | `/star/unstar/:id` |      N/A       | The id in the req.params should reference the project's id. The id in the body should reference the user's id                 | req.params: { `id` } req.body: { `id` } | This will return a message saying you unstarred the project        |

## INVITE

| Method | Endpoint           | Access Control | Description                           | Attached to req                                                                                         | Returned                                                            |
| -----: | :----------------- | :------------: | :------------------------------------ | :------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------ |
|    GET | `/invite/:id`      |      N/A       | The id should reference the users id  | req.params: { `id` }                                                                                    | This will return all notifications for the given user id            |
|    GET | `/invite/bool/:id` |      N/A       | The id should reference the users id  | req.params: { `id` }                                                                                    | This will return a COUNT of all notifications for the given user id |
|   POST | `/invite/team`     |      N/A       | Invites a user to join a team         | req.body: { `activeUsername, type, invitedUserId, activeUserId, mainImgUrl, teamId, activeUserAvatar` } | Returns a new team invite notification                              |
|   POST | `/invite/follow`   |      N/A       | Creates a follow notification         | req.body: { `activeUsername, invitedUserId, activeUserAvatar` }                                         | Returns a new follow notification                                   |
|   POST | `/invite/star`     |      N/A       | Creates a star notification           | req.body: { `id` }                                                                                      | Returns a new star notification                                     |
|   POST | `/invite/comments` |      N/A       | Creates a comment notification        | req.body: { `activeUsername, commentText, invitedUserId, mainImgUrl, activeUserAvatar` }                | Returns a new comment notification                                  |
|    PUT | `/:id`             |      N/A       | The id should reference the invite id | req.params: { `id` } req.body: { `key/value pairs` of the updated invite }                              | This will return the updated record.                                |
| DELETE | `/:id`             |      N/A       | The id should reference the invite id | req.params: { `id` }                                                                                    | Returns success message                                             |

## SEARCHBAR

| Method | Endpoint  | Access Control | Description                                              | Attached to req            | Returned               |
| -----: | :-------- | :------------: | :------------------------------------------------------- | :------------------------- | :--------------------- |
|   POST | `/search` |      N/A       | Searches users and projects that are LIKE the searchText | req.body: { `searchText` } | Returns search results |

## EXPLORE

| Method | Endpoint       | Access Control | Description                               | Attached to req      | Returned                                                                           |
| -----: | :------------- | :------------: | :---------------------------------------- | :------------------- | :--------------------------------------------------------------------------------- |
|    GET | `/explore/:id` |      N/A       | Populates Explore page on frontend client | req.params: { `id` } | Returns projects by followed users, recent projects by all users, popular projects |

## CATEGORIES

| Method | Endpoint                 | Access Control | Description                     | Attached to req                  | Returned                                |
| -----: | :----------------------- | :------------: | :------------------------------ | :------------------------------- | :-------------------------------------- |
|    GET | `/projects/all`          |      N/A       | Get Assigned Project Categories | N/A                              | Returns categories assigned to projects |
|   POST | `/project/add`           |      N/A       | Add Category to Project         | req.params: { `id`, `category` } | Assigns category to project             |
|    GET | `/user/:id`              |      N/A       | Get Category By User Id         | req.params: { `id` }             | Returns categories associated with user |
|    GET | `/projects/:id`          |      N/A       | Get Categories By Project Id    | req.params: { `id` }             | Returns categories assigned to project  |
|    GET | `/projects/category/:id` |      N/A       | Get Projects By Category Id     | req.params: { `id` }             | Returns projects assigned to a category |
| DELETE | `/project/:id`           |      N/A       | Delete Category By Id           | req.params: { `id` }             | Delete category                         |
|    PUT | `/project/:id`           |      N/A       | Update Category By Id           | req.params: { `id`, `category` } | Update category                         |

## USER RESEARCH

| Method | Endpoint       | Access Control | Description                                                                                                                                                 | Attached to req                | Returned                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -----: | :------------- | :------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   POST | `/signed`      |      N/A       | The id should reference the project's id that you are posting the photo to. This ensures that the pdf will be placed in a folder based on the project's id. | req.body: {`id`}               | This endpoint will return a presigned url and a key. The URL will be used to make a put request to aws to store the pdf. The key will be used to store in our database's user_research table. You will pass it to another asynchronous method. Keep in mind that the key is the right half of the URL that we are reading the pdf from. This ensures that if we wanted to change cloud services, we could do so without losing any data |
|   POST | `/`            |      N/A       | The url will come from the response of the presigned url. Make sure that you are saving the key to the url column. Example: url:key, not url:url.           | req.body: { `projectId, url` } | This will return the new record you created.                                                                                                                                                                                                                                                                                                                                                                                            |
|    GET | `/:id`         |      N/A       | Get User Research By Id                                                                                                                                     | req.params: { `id` }           | Returns user research                                                                                                                                                                                                                                                                                                                                                                                                                   |
|    GET | `/project/:id` |      N/A       | Get User Research By Project Id                                                                                                                             | req.params: { `id` }           | Returns user research assigned to project                                                                                                                                                                                                                                                                                                                                                                                               |
| DELETE | `/:id`         |      N/A       | Delete User Research By Id                                                                                                                                  | req.params: { `id` }           | Delete user research                                                                                                                                                                                                                                                                                                                                                                                                                    |

## PROJECT INVITE

| Method | Endpoint                     | Access Control | Description                                   | Attached to req                                                                    | Returned                                                     |
| -----: | :--------------------------- | :------------: | :-------------------------------------------- | :--------------------------------------------------------------------------------- | :----------------------------------------------------------- |
|    GET | `/projectInvites/all`        |      N/A       | Get list of all project invites               | N/A                                                                                | This will return all project invites accross the application |
|    GET | `/projectInvites/`           |      N/A       | Get list of all invites sent to a user        | N/A                                                                                | This will return all project invites sent to a user          |
|    GET | `/projectInvites/:id`        |      N/A       | The id should reference project invite id     | req.params: { `id` }                                                               | This will return a single project invite                     |
|    GET | `/projectInvites/invite/:id` |      N/A       | Get list of all invites created by user       | N/A                                                                                | This will return all project invites issued by user          |
|   POST | `/projectInvites/create`     |      N/A       | Creates a project invite                      | req.body: { `projectId, email, write` }                                            | Returns a new project invite notification                    |
|    PUT | `projectInvites/accept/:id`  |      N/A       | The id should reference the project invite id | req.params: { `id` } req.body: { `key/value pairs` of the updated invite }         | This will accept the invite.                                 |
|    PUT | `projectInvites/:id`         |      N/A       | The id should reference the project invite id | req.params: { `id` } req.body: { `key/value pairs` of the updated project invite } | This will return the updated record.                         |
| DELETE | `projectInvites/:id`         |      N/A       | The id should reference the project invite id | req.params: { `id` }                                                               | Returns success message                                      |

## Data Model

### users

```javascript
{
  id: PK - AUTO increment,
  auth0Id: (required, unique) integer, references user's auth0 id
  username: (unique) string,
  email: string,
  phoneNumber: string,
  firstName: string,
  lastName: string,
  location: string,
  bio: text,
  website: string,
  avatar: string,
  created_at: AUTO timestamp
}
```

---

### user_projects

```javascript
{
 id: PK - AUTO increment,
 userId: FK - (required) integer, references user's id who created the project,
 teamId: FK - references team id
 privateProjects: boolean for if its a private repository or not. Default to false,
 name: (required) string,
 description: text,
 created_at: AUTO timestamp,
 updated_at: AUTO timestamp should be updated every time there is an update to the project,
 figma: string,
 invision: string,
 mainImg: text (url that displays main thumbnail image for the project),
}
```

---

### user_followers

```javascript
{
 id: PK - AUTO increment,
 followingId: FK - (required) integer, references user id doing the the following,
 followedId: FK - (required) integer, references user id being followed,
 created_at: AUTO timestamp
}
```

---

### project_photos

```javascript
{
 id: PK - AUTO increment,
 projectId: FK - (required) integer, references the project,
 url: (required) string, url of the photo,
 description: text,
 title: text,
 created_at: AUTO timestamp
}
```

---

### heatmap

```javascript
{
 id: PK - AUTO increment,
 userId: FK - (required) integer, references user's id,
 projectId: FK - integer, references the project,
 imageId: FK - integer, references the project image,
 count: integer, default to 1,
 date: string,
 contribution: text,
}
```

---

### comments

```javascript
{
 id: PK - AUTO increment,
 userId: FK - (required) integer, references user's id,
 projectId: FK - integer, references the project,
 username: FK - (required) string, refereces username
 imageId: FK - integer, references the project image,
 top: string, px value provided by frontend client,
 left: string, px value provided by frontend client,
 text: (required) string, comment text,
 created_at: AUTO timestamp,
}
```

---

### starred_projects

```javascript
{
 id: PK - AUTO increment,
 userId: FK - (required) integer, references user's id,
 projectId: FK - (required) integer, references the project,
 count: integer, default to 1,
 created_at: AUTO timestamp,
}
```

---

### invite

```javascript
{
 id: PK - AUTO increment,
 activeUserId: FK - (required) integer, references user id sending the invite,
 invitedUserId: FK - (required) integer, references user id receiving the invite,
 starredProjectsId: FK - integer, references the star,
 commentsId: FK - integer, references the comment,
 projectId: FK - integer, references the project,
 projectName: string,
 imageId: FK - integer, references the project image,
 activeUserAvatar: string, url to the userAvatar sending the invite,
 mainImgUrl: FK - string, references the main project image,
 commentText: text, the comment text,
 activeUserName: FK - (required) string, references the user sending the invite,
 teamId: FK - string, references team id,
 followersId: FK - integer, references the follow,
 type: string, the type of invite being created,
 message: text,
 unread: boolean, default to true,
 created_at: AUTO timestamp,
}
```

---

### team

```javascript
{
 id: PK - AUTO increment,
 avatar: string, url to avatar image,
 name: (required) string,
 description: text,
 created_at: AUTO timestamp,
 updated_at: AUTO timestamp,
}
```

---

### team_member

```javascript
{
 id: PK - AUTO increment,
 userId: FK - (required) integer, references user's id,
 teamId: FK - (required) string, references team id,
 role: integer, default to 0,
 description: text,
 created_at: AUTO timestamp,
 updated_at: AUTO timestamp,
}
```

---

### category

```javascript
{
 id: PK - AUTO increment,
 category: (required) string
}
```

---

### user_research

```javascript
{
 id: PK - AUTO increment,
 url: (required) string,
 projectId: (required) integer, references project id,
 created_at: AUTO timestamp,
}
```

---

### project_teams

```javascript
{
 id: PK - AUTO increment,
 email: (required) string,
 projectId: (required) integer, references project id,
 boolean: (required) write,
 boolean: pending
 created_at: AUTO timestamp,
 updated_at: AUTO timestamp,
}
```

---

## Actions

`getAllUsers()` -> Returns all users

`getSingleUser(userId)` -> Returns a single user when supplied with user's ID

`updateUser(userId, changes object)` -> Updates a single user by ID

`getAllProjects()` -> Returns all projects

`addProject(project object)` -> Creates a new project and returns that project

`getSingleProject(projectId)` -> Returns a single project when supplied with the project's ID

`updateProject(projectId, changes object)` -> Updates a single project by ID and returns the newly updated project

`deleteProject(projectId)` -> Deletes a single project when supplied with project's ID

---

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

Create a .env file that includes the following:

```bash
* PORT

* DATABASE_URL

* REACT_APP_SENTRY_DSN

* ACCESS_KEY_ID

* SECRET_ACCESS_KEY

* SENTRY_DSN

* STAGING_DB - optional development db for using functionality not available in SQLite
* NODE_ENV - set to "development" until ready for "production"

* JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice
('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])

* SENDGRID_API_KEY - this is generated in your Sendgrid account
```

---

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

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

## Frontend Documentation

See [https://github.com/Lambda-School-Labs/designhub-fe](https://github.com/Lambda-School-Labs/designhub-fe) for details on the frontend of our project.
