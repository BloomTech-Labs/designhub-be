const projects = [
  {
    id: '1',
    private: false,
    name: 'My Public Post',
    description: 'Description',
    category: 'Web Design',
    figma: null,
    invision: null,
    mainImg: 'https://i.imgur.com/EMlwt0i.png',
  },
  {
    id: '2',
    private: false,
    name: 'My Other Public Post',
    description: 'Other Description',
    category: 'Web Design',
    figma: null,
    invision: null,
    mainImg: 'https://i.imgur.com/jidEDG6.png',
  },
];

const project = {
  id: '1',
  private: false,
  name: 'My Public Post',
  description: 'Description',
  category: 'Web Design',
  figma: null,
  invision: null,
  mainImg: 'https://i.imgur.com/EMlwt0i.png',
};

const nestedProject = {
  comments: [
    {
      id: '1',
      projectId: '1',
      text: 'This is a comment',
    },
  ],
};

const nestedPhoto = {
  photos: [
    {
      id: '1',
      projectId: '1',
      url: 'www.testing.com',
      description: 'Hello there',
      title: 'Testing is this thing on?',
    },
  ],
};

const addProject = {
  userId: 'abc1225475645456',
  private: true,
  name: 'testing',
  description: 'i am a tester for the update',
  category: 'Web Design',
  mainImg: 'wwwkjhbnkjnbcxc',
};

const updateProject = {
  id: '3',
  userId: 'abc1225475645456',
  name: 'testing updates',
  description: 'i am a tester for the update again',
  category: 'UI Design',
  mainImg: 'wwwkjhbnkjnbcxcasdf',
};

module.exports = {
  projects,
  project,
  addProject,
  updateProject,
  nestedProject,
  nestedPhoto,
};
