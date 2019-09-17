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
  const { id } = req.body;
  const key = `${id}/${uuid()}.jpeg`;
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

exports.getAllPhotos = async (req, res) => {
  try {
    const data = await go.getMany('project_photos');
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Couldn't get photos" });
  }
};

exports.getPhotoById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await go.getById('project_photos', id);

    res.json({ data });
  } catch (err) {
    console.error(err);
    res.json({ message: 'Unable to get photo' });
  }
};

exports.getPhotosByProjectId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db('project_photos')
      .select('*')
      .where('projectId', id);
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.send({ error: err });
  }
};

exports.createProjectPhoto = async (req, res) => {
  console.log(req.body);
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
    const data = await go.destroyById('project_photos', id);
    res.json({ message: 'Successfully deleted photo' });
  } catch (err) {
    console.error(err);
    res.json({ message: 'Unable to delete photo' });
  }
};
