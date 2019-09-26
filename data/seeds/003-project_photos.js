exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('project_photos')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('project_photos').insert([
        {
          projectId: 1,
          url:
            'https://cdn.dribbble.com/users/182336/screenshots/7150621/media/b0a6aa5b2a19029479da7d91972b2774.png',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          projectId: 2,
          url:
            'https://cdn.dribbble.com/users/211151/screenshots/7147835/media/427b43495d03b59054564392c589cda4.jpg',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          projectId: 3,
          url:
            'https://cdn.dribbble.com/users/3281732/screenshots/7150760/media/a11dae58a8eee44d242417ae6a6bed3c.jpg',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          projectId: 4,
          url:
            'https://cdn.dribbble.com/users/674925/screenshots/7147175/media/ca03b14f14639eddf76bd01174c9f2c5.png',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          projectId: 5,
          url:
            'https://cdn.dribbble.com/users/1430543/screenshots/7151173/media/c6109e2cedff65261c8a5f33ce618bba.jpg',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          projectId: 6,
          url:
            'https://cdn.dribbble.com/users/1312159/screenshots/7148680/image.png',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          projectId: 7,
          url:
            'https://cdn.dribbble.com/users/2151039/screenshots/7148065/media/2cf88366ac2a35660345ca8226a97085.png',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          projectId: 8,
          url:
            'https://cdn.dribbble.com/users/1160700/screenshots/7150660/media/610f9cc1a848c9ec6ba0121a4c569a9f.png',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          projectId: 9,
          url:
            'https://cdn.dribbble.com/users/182336/screenshots/7150621/media/b0a6aa5b2a19029479da7d91972b2774.png',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          projectId: 10,
          url:
            'https://cdn.dribbble.com/users/211151/screenshots/7147835/media/427b43495d03b59054564392c589cda4.jpg',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          projectId: 11,
          url:
            'https://cdn.dribbble.com/users/3281732/screenshots/7150760/media/a11dae58a8eee44d242417ae6a6bed3c.jpg',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          projectId: 12,
          url:
            'https://cdn.dribbble.com/users/674925/screenshots/7147175/media/ca03b14f14639eddf76bd01174c9f2c5.png',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          projectId: 13,
          url:
            'https://cdn.dribbble.com/users/1430543/screenshots/7151173/media/c6109e2cedff65261c8a5f33ce618bba.jpg',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          projectId: 14,
          url:
            'https://cdn.dribbble.com/users/1312159/screenshots/7148680/image.png',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          projectId: 15,
          url:
            'https://cdn.dribbble.com/users/2151039/screenshots/7148065/media/2cf88366ac2a35660345ca8226a97085.png',
          created_at: '2019-09-19T17:20:25.355Z'
        },
        {
          projectId: 16,
          url:
            'https://cdn.dribbble.com/users/1160700/screenshots/7150660/media/610f9cc1a848c9ec6ba0121a4c569a9f.png'
        }
      ]);
    });
};
