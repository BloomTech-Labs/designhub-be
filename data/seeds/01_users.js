exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        {
          id: 'auth0|5d83b8d3d8e1cf0df49647e3',
          username: 'eriklambert',
          email: 'eriklambert@designhubx.com',
          firstName: 'Erik',
          lastName: 'Lambert',
          location: 'Austin, TX',
          bio:
            'I love designing and always looking for ways to improve and innovate. 🤓 #Usersmatter! #LambdaBound #UXEngineer',
          website: 'eriklambertux.io',
          avatar:
            'https://s.gravatar.com/avatar/a70f8b0c3761764491eebc5d0484a738?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fer.png',
          created_at: '2019-09-19T17:20:25.355Z',
        },
        {
          id: 'google-oauth2|115383560506192673006',
          username: 'mansleen',
          email: 'mansleen@designhub.com',
          firstName: 'Michael',
          lastName: 'Vansleen',
          location: 'Denver, CO',
          bio:
            'I love designing and always looking for ways to improve and innovate. 🤓 #Usersmatter! #LambdaBound #UXEngineer',
          website: 'https://mansleen.io',
          avatar: 'https://avatars3.githubusercontent.com/u/40153979?s=400&v=4',
          created_at: '2019-09-19T17:20:25.355Z',
        },
        {
          id: 'auth0|5dc999e4d958d80e7bb7b597',
          username: 'test',
          email: 'test@test.com',
          firstName: 'Kimmi',
          lastName: 'Lang',
          location: 'San Francisco, CA',
          bio:
            'I am a UX Designer for DesignHub. I love creating fun and lively user interactions and experiences that are unique. Give me a follow and see more of my work!!',
          website: 'https://kimmilangux.io',
          avatar:
            'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        },
        {
          id: 'sub|4',
          username: 'daddyteddy',
          email: 'davidholmes@designhub.com',
          firstName: 'David',
          lastName: 'Holmes',
          location: 'Los Angelas, CA',
          bio:
            'Design Lead at Monster Tech in Los Angelas. I run off of coffee and cat memes if you could not tell through my designs. Check out mywebsitefor more professional work and case study!',
          website: 'https://davidholmes.io',
          avatar:
            'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        },
        {
          id: 'sub|5',
          username: 'angieux',
          email: 'angieux@designhub.com',
          firstName: 'Angie',
          lastName: 'Wilson',
          location: 'New York City, NY',
          bio:
            'UI Designer for NY Bikes Tech. Check out my projects for case studies and see all my awesome designs!',
          website: 'https://angieuiux.io',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        },
        {
          id: 'sub|6',
          username: 'austinrobo',
          email: 'austinrobo@designhub.com',
          firstName: 'Austin',
          lastName: 'Roberts',
          location: 'Salt Lake City, UT',
          bio:
            'Freelance UI UX Designers. I aim to create unique and powerful designs that users can feel and relate to. Design is my passion and I design with the users in mind FIRST! #DESIGN4LIFE',
          website: 'https://austinrobo.io',
          avatar:
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        },
      ]);
    });
};
