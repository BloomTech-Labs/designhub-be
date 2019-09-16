const go = require('../utils/crud');
const uuid = require('uuid/v1');
const AWS = require('aws-sdk');
const config = require('../utils/s3Config');

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY } = config;

// Create s3 user with access key Id and secret access key
const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY
});

exports.signedUrl = async (req, res) => {
  const key = `userId/${uuid()}.jpeg`;

  console.log(ACCESS_KEY_ID, SECRET_ACCESS_KEY);
  s3.getSignedUrl(
    'putObject',
    {
      // name of bucket you created
      Bucket: 'my-photo-bucket-123',
      ContentType: 'image/jpeg',
      Key: key
    },
    (err, url) => {
      console.log(url);
      res.send({ key, url });
    }
  );
};
