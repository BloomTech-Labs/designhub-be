exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          auth0Id: 'auth0|5d83b8d3d8e1cf0df49647e3',
          username: 'eriklambert',
          email: 'eriklambert@designhubx.com',
          phoneNumber: '555-555-0000',
          firstName: 'Erik',
          lastName: 'Lambert',
          location: 'Austin, TX',
          bio:
            'I love designing and always looking for ways to improve and innovate. 🤓 #Usersmatter! #LambdaBound #UXEngineer',
          website: 'eriklambertux.io',
          avatar:
            'https://s.gravatar.com/avatar/a70f8b0c3761764491eebc5d0484a738?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fer.png',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          auth0Id: 'sub|2',
          username: 'ericalambert',
          email: 'eriklambert@designhub.com',
          phoneNumber: 8005550129,
          firstName: 'Erik',
          lastName: 'Lambert',
          location: 'Austin, TX',
          bio:
            'I love designing and always looking for ways to improve and innovate. 🤓 #Usersmatter! #LambdaBound #UXEngineer',
          website: 'https://eriklambert.io',
          avatar:
            'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
        },
        {
          auth0Id: 'sub|3',
          username: 'kimmilang',
          email: 'kimmilang@designhub.com',
          phoneNumber: 8615556958,
          firstName: 'Kimmi',
          lastName: 'Lang',
          location: 'San Francisco, CA',
          bio:
            'I am a UX Designer for DesignHub. I love creating fun and lively user interactions and experiences that are unique. Give me a follow and see more of my work!!',
          website: 'https://kimmilangux.io',
          avatar:
            'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
          auth0Id: 'sub|4',
          username: 'daddyteddy',
          email: 'davidholmes@designhub.com',
          phoneNumber: 8315246958,
          firstName: 'David',
          lastName: 'Holmes',
          location: 'Los Angelas, CA',
          bio:
            'Design Lead at Monster Tech in Los Angelas. I run off of coffee and cat memes if you could not tell through my designs. Check out mywebsitefor more professional work and case study!',
          website: 'https://davidholmes.io',
          avatar:
            'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
          auth0Id: 'sub|5',
          username: 'angieux',
          email: 'angieux@designhub.com',
          phoneNumber: 8315255858,
          firstName: 'Angie',
          lastName: 'Wilson',
          location: 'New York City, NY',
          bio:
            'UI Designer for NY Bikes Tech. Check out my projects for case studies and see all my awesome designs!',
          website: 'https://angieuiux.io',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
          auth0Id: 'sub|6',
          username: 'austinrobo',
          email: 'austinrobo@designhub.com',
          phoneNumber: 5315256850,
          firstName: 'Austin',
          lastName: 'Roberts',
          location: 'Salt Lake City, UT',
          bio:
            'Freelance UI UX Designers. I aim to create unique and powerful designs that users can feel and relate to. Design is my passion and I design with the users in mind FIRST! #DESIGN4LIFE',
          website: 'https://austinrobo.io',
          avatar:
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        }
      ]);
    });
};
