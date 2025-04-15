import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config();

export const awsS3Client = new AWS.S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
