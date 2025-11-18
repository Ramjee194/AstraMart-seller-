import AWS from 'aws-sdk';
import multer from 'multer'
import multerS3 from 'multer-s3'
import path from 'path';
import dotenv from 'dotenv'

dotenv.config()
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const key = `uploads/${Date.now().toString()}_${Math.random().toString(36).slice(2)}${ext}`;
      cb(null, key);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});


export  {upload,s3}