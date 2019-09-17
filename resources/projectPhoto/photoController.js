require('dotenv').config();
const go = require('../utils/crud');
const uuid = require('uuid/v1');
const AWS = require('aws-sdk');

const accessId = process.env.ACCESS_KEY_ID;
const accessKey = process.env.SECRET_ACCESS_KEY;

// Create s3 user with access key Id and secret access key
const s3 = new AWS.S3({
  accessKeyId: accessId,
  secretAccessKey: accessKey,
  signatureVersion: 'v4',
  region: 'us-east-2'
});

exports.signedUrl = async (req, res) => {
  const key = `${uuid()}.jpeg`;

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
