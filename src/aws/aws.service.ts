import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { awsS3Client } from './aws-client';

@Injectable()
export class AwsService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const fileExt = extname(file.originalname);
    const key = `images/${uuid()}${fileExt}`;

    await awsS3Client
      .putObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();

    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }

  async deleteImage(key: string): Promise<void> {
    await awsS3Client
      .deleteObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      })
      .promise();
  }
}
