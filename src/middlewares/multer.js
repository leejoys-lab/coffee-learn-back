const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer({
        storage: multerS3({
            s3: new aws.S3(),
            bucket: 'coffee-learn-bucket',
            acl: 'public-read',
            key: function (req, file, cb) {
                const folderName = file.fieldname;
                cb(null, `${folderName}/${file.originalname}`);
            },
        }),
});

/*
const uploadSub = multer({
        storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, "sub/" + file.originalname);
        },
    }),
});
*/


module.exports = upload;