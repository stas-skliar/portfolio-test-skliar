import { Test, TestingModule } from '@nestjs/testing';
import { AwsService } from './aws.service';
import { awsS3Client } from './aws-client';

// 👇 Підміняємо awsS3Client методи
jest.mock('./aws-client', () => ({
  awsS3Client: {
    deleteObject: jest.fn().mockReturnThis(), // для .promise()
    putObject: jest.fn().mockReturnThis(),
    promise: jest.fn().mockResolvedValue({}), // симулюємо успішну відповідь
  },
}));

describe('AwsService', () => {
  let service: AwsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsService],
    }).compile();

    service = module.get<AwsService>(AwsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call S3 deleteObject with correct key', async () => {
    const key = 'images/test-image.jpg';
    await service.deleteImage(key);

    expect(awsS3Client.deleteObject).toHaveBeenCalledWith({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });

    const deleteObjectMock = awsS3Client.deleteObject as jest.Mock;
    const deleteCallResult = deleteObjectMock.mock.results[0].value;

    expect(deleteCallResult.promise).toHaveBeenCalled();
  });
});
