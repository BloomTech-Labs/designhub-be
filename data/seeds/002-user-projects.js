exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_projects')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('user_projects').insert([
        {
          userId: 1,
          name: 'Project One',
          description:
            'Project is a for a non-profit organization that focuses on design and user experiences and interactions.',
          figma: null,
          invision: 'http://google.com',
          private: false,
          mainImg:
            'https://cdn.dribbble.com/users/182336/screenshots/7150621/media/b0a6aa5b2a19029479da7d91972b2774.png',
          created_at: '2019-09-19T17:20:25.355Z',
          updated_at: '2019-09-19T17:20:25.355Z'
        },
        {
          userId: 1,
          name: 'Project Two',
          description:
            'Project is a for a non-profit organization that focuses on design and user experiences and interactions.',
          figma: null,
          invision: 'http://google.com',
          private: false,
          mainImg:
            'https://cdn.dribbble.com/users/211151/screenshots/7147835/media/427b43495d03b59054564392c589cda4.jpg',
          created_at: '2019-09-19T17:20:26.355Z',
          updated_at: '2019-09-19T17:20:26.355Z'
        },
        {
          userId: 1,
          name: 'Project Three',
          description:
            'Project is a for a non-profit organization that focuses on design and user experiences and interactions.',
          figma: 'http://google.com',
          invision: null,
          private: false,
          mainImg:
            'https://cdn.dribbble.com/users/3281732/screenshots/7150760/media/a11dae58a8eee44d242417ae6a6bed3c.jpg',
          created_at: '2019-09-19T17:20:27.355Z',
          updated_at: '2019-09-19T17:20:27.355Z'
        },
        {
          userId: 1,
          name: 'Project Four',
          description:
            'Project is a for a non-profit organization that focuses on design and user experiences and interactions.',
          figma: null,
          invision: null,
          private: false,
          mainImg:
            'https://cdn.dribbble.com/users/674925/screenshots/7147175/media/ca03b14f14639eddf76bd01174c9f2c5.png',
          created_at: '2019-09-19T17:20:28.355Z',
          updated_at: '2019-09-19T17:20:28.355Z'
        },
        {
          userId: 1,
          name: 'Project Five',
          description:
            'Project is a for a non-profit organization that focuses on design and user experiences and interactions.',
          figma: null,
          invision: null,
          private: false,
          mainImg:
            'https://cdn.dribbble.com/users/1430543/screenshots/7151173/media/c6109e2cedff65261c8a5f33ce618bba.jpg',
          created_at: '2019-09-19T17:20:29.355Z',
          updated_at: '2019-09-19T17:20:29.355Z'
        },
        {
          userId: 1,
          name: 'Project Six',
          description:
            'Project is a for a non-profit organization that focuses on design and user experiences and interactions.',
          figma: null,
          invision: null,
          private: false,
          mainImg:
            'https://cdn.dribbble.com/users/1312159/screenshots/7148680/image.png',
          created_at: '2019-09-19T17:20:30.355Z',
          updated_at: '2019-09-19T17:20:30.355Z'
        },
        {
          userId: 1,
          name: 'Project Seven',
          description:
            'Project is a for a non-profit organization that focuses on design and user experiences and interactions.',
          figma: null,
          invision: null,
          private: false,
          main:
            'https://cdn.dribbble.com/users/2151039/screenshots/7148065/media/2cf88366ac2a35660345ca8226a97085.png',
          created_at: '2019-09-19T17:20:31.355Z',
          updated_at: '2019-09-19T17:20:31.355Z'
        },
        {
          userId: 1,
          name: 'Project Eight',
          description:
            'Project is a for a non-profit organization that focuses on design and user experiences and interactions.',
          figma: null,
          invision: null,
          private: false,
          mainImg:
            'https://cdn.dribbble.com/users/1160700/screenshots/7150660/media/610f9cc1a848c9ec6ba0121a4c569a9f.png',
          created_at: '2019-09-19T17:20:32.355Z',
          updated_at: '2019-09-19T17:20:32.355Z'
        }
      ]);
    });
};
