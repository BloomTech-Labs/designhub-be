require('dotenv').config();
const go = require('../utils/crud');
const uuid = require('uuid/v1');
const AWS = require('aws-sdk');
const db = require('../../data/dbConfig');

const userMatches = require('../utils/userMatches');

const accessId = process.env.ACCESS_KEY_ID;
const accessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
    accessKeyId: accessId,
    secretAccessKey: accessKey,
    signatureVersion: 'v4',
    region: 'us-east-2'
});

exports.signedUrl = async (req, res) => {
    const { id } = req.body;
    const key = `${id}/${uuid()}.pdf`;
    console.log(key);

    console.log(accessId, accessKey);
    s3.getSignedUrl(
        'putObject',
        {
            // name of bucket you created
            Bucket: 'my-photo-bucket-123',
            ContentType: 'application/pdf',
            Key: key
        },
        (err, url) => {
            res.send({ key, url });
        }
    );
};

exports.getResearchById = async (req, res) => {
    const id = req.params.id;
    try {
        const research = await go.getById('user_research', id);
        res.status(200).json(research);
    }
    catch (err) {
        res.status(400).json({ message: 'Unable to get user research' });
    }
}

exports.getResearchByProjectId = async (req, res) => {
    const id = req.params.id;
    try {
        const project = await go.getById('user_projects', id);
        if (project.length === 0) {
            return res.status(404).json({ message: 'A project with that ID could not be found!' })
        }

        const research = await db('user_research').where('projectId', id);
        const modResearch = research.map(item => {
            return {
                ...item,
                url: `${process.env.S3_URL}${item.url}`
            };
        });
        res.status(200).json(modResearch);
    }
    catch (err) {
        res.status(500).json({ message: 'Database error' })
    }
}

exports.createUserResearch = async (req, res) => {
    const project = await go.getById('user_projects', req.body.projectId);

    if (project.length === 0) {
        return res.status(404).json({ message: 'A project with that ID could not be found!' });
    }

    if (!(await userMatches(req.user, project[0].userId))) {
        return res.status(401).json({ message: "Unauthorized: You may not add photos to this project." });
    }

    try {
        const [id] = await go.createOne('user_research', 'id', req.body);
        res.status(201).json({ message: 'User Research successfully created', id });
    }
    catch (err) {
        res.status(400).json({ message: 'Unable to create user research' });
    }
}

exports.deleteUserResearchById = async (req, res) => {
    const id = req.params.id;

    try {
        const research = await go.getById('user_research', id);
        if (research.length === 0) {
            res.status(404).json({ message: 'User research with that ID could not be found!' })
        }
        else {
            const project = await go.getById('user_projects', research[0].projectId);
            if (await userMatches(req.user, project[0].userId)) {
                await go.destroyById('user_research', id);
                res.status(200).json({ message: 'Successfully deleted user research.' });
            } else {
                res
                    .status(401)
                    .json({
                        message:
                            "Unauthorized: You may not delete user research that don't belong to you."
                    });
            }
        }
    }
    catch (err) {
        res.status(400).json({ message: 'Unable to delete user research' });
    }
}