const go = require('../utils/crud');
const uuid = require('uuid/v1');
const AWS = require('aws-sdk');
// Create s3 user with access key Id and secret access key
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

exports.signedUrl = async (req, res) => {
  const key = `${req.user.id}/${uuid()}.jpeg`;
  s3.getSignedUrl(
    'putObject',
    {
      // name of bucket you created
      Bucket: 'my-photo-bucket-123',
      ContentType: 'jpeg',
      Key: key
    },
    (err, url) => {
      res.send({ key, url });
    }
  );
};
