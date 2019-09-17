require('dotenv').config();
const go = require('../utils/crud');
const uuid = require('uuid/v1');
const AWS = require('aws-sdk');
const db = require('../../data/dbConfig');

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
  const { projectId } = req.body;
  const key = `${projectId}/${uuid()}.jpeg`;
  console.log(key);

  console.log(accessId, accessKey);
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

exports.getPhotosByProjectId = async (req, res) => {
  const { projectId } = req.body;

  try {
    const data = await db('project_photos')
      .select('*')
      .where('projectId', projectId);
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.send({ error: err });
  }
};

exports.createProjectPhoto = async (req, res) => {
  try {
    const [id] = await go.createOne('project_photos', req.body, 'id');
    res.status(201).json({ message: 'Photo successfully created', id });
  } catch (err) {
    console.error(err);
    res.json({ message: 'Unable to create photo' });
  }
};
