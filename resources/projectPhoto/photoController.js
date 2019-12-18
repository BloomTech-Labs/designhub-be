require('dotenv').config();
const go = require('../utils/crud');
const uuid = require('uuid/v1');
const AWS = require('aws-sdk');
const db = require('../../data/dbConfig');

const userMatches = require('../utils/userMatches');

const accessId = process.env.ACCESS_KEY_ID;
const accessKey = process.env.SECRET_ACCESS_KEY;

// Create s3 user with access key Id and secret access key.
const s3 = new AWS.S3({
  accessKeyId: accessId,
  secretAccessKey: accessKey,
  signatureVersion: 'v4',
  region: 'us-east-2'
});

exports.signedUrl = async (req, res) => {
  const { id } = req.body;
  const key = `${id}/${uuid()}.jpeg`;
  console.log('\nphoto signed key', key);

  console.log('\nphoto access id and access key', accessId, accessKey);
  s3.getSignedUrl(
    'putObject',
    {
      // name of bucket you created
      Bucket: 'my-photo-bucket-123',
      ContentType: 'image/*',
      Key: key
    },
    (err, url) => {
      res.send({ key, url });
    }
  );
};

// exports.getAllPhotos = async (req, res) => {
//   try {
//     const data = await go.getMany('project_photos');
//     res.status(200).json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: "Couldn't get photos" });
//   }
// };

exports.getPhotoById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await go.getById('project_photos', id);
    res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Unable to get photo' });
  }
};

exports.getPhotosByProjectId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db('project_photos')
      .select('*')
      .where('projectId', id);
    const newData = data.map(item => {
      return {
        ...item,
        url: `${process.env.S3_URL}${item.url}`
      };
    });
    res.status(200).json(newData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err });
  }
};


exports.createProjectPhoto = async (req, res) => {
  console.log(req.body);

  const project = await go.getById('user_projects', req.body.projectId);

  if (project.length == 0) {
    return res
      .status(404)
      .json({ message: 'A project with that ID could not be found!' });
  }
  if (!(await userMatches(req.user, project[0].userId))) {
    return res
      .status(401)
      .json({
        message:
          "Unauthorized: You may not add photos to this project."
      });

  }
  try {
    const [id] = await go.createOne('project_photos', 'id', req.body);
    res.status(201).json({ message: 'Photo successfully created', id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Unable to create photo' });
  }

};

exports.deletePhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await go.getById('project_photos', id);

    console.log("data", data);

    if (data.length === 0) {
      res
        .status(404)
        .json({ message: 'A photo with that ID could not be found!' });
    } else {
      const project = await go.getById('user_projects', data[0].projectId);

      if (await userMatches(req.user, project[0].userId)) {
        await go.destroyById('project_photos', id);
        res.status(200).json({ message: 'Successfully deleted photo.' });
      } else {
        res
          .status(401)
          .json({
            message:
              "Unauthorized: You may not delete photos that don't belong to you."
          });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Unable to delete photo' });
  }
};

