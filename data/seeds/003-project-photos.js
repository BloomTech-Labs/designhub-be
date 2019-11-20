
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('project_photos').insert([
    {
      projectId: 1,
      url: '',
      description: 'http://my-photo-bucket-123.s3.us-east-2.amazonaws.com/100/222b93a0-0646-11ea-a9f3-b7750d36b3d8.jpeg',
      title: 'hi'
    },
    {
      projectId: 2,
      url: 'http://my-photo-bucket-123.s3.us-east-2.amazonaws.com/100/222f8b40-0646-11ea-a9f3-b7750d36b3d8.jpeg',
      description: '',
      title: 'hello'
    }
  ])
};
