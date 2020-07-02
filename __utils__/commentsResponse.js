const comment = {
  id: '1',
  userId: 'google-oauth2|115383560506192673006',
  projectId: '1',
  text: 'This is a comment',
};

nestedUser = {
  user: {
    id: 'google-oauth2|115383560506192673006',
    firstName: 'Michael',
    lastName: 'Vansleen',
    username: 'mansleen',
    email: 'mansleen@designhub.com',
    location: 'Denver, CO',
    bio:
      'I love designing and always looking for ways to improve and innovate. 🤓 #Usersmatter! #LambdaBound #UXEngineer',
    website: 'https://mansleen.io',
    avatar: 'https://avatars3.githubusercontent.com/u/40153979?s=400&v=4',
  },
};

const addComments = {
  userId: 'abc122547564545642',
  projectId: '3',
  text: 'I am a test comment for update!',
};

const updateComments = {
  id: '3',
  userId: 'abc122547564545642',
  projectId: '3',
  text: 'I am a test comment for update again!',
};

module.exports = { comment, nestedUser, addComments, updateComments };
