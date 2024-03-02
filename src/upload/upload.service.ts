import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@Injectable()
export class UploadService {
  private logger = new MyLoggerService(UploadService.name);
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });
  constructor(private configService: ConfigService) {}
  async uploadFilesS3(filename: string, file: Buffer): Promise<any> {
    this.logger.log(`UploadService:uploadFilesS3...`, UploadService.name);

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_BUCKET'),
        Key: filename ?? 'yaman2',
        Body: file ?? 'asd',
      }),
    );
  }
}
