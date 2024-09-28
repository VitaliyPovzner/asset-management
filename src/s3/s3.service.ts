import { Injectable, Logger } from '@nestjs/common';
import {S3Client,PutObjectCommand} from '@aws-sdk/client-s3'
import { ConfigService } from '@nestjs/config';


@Injectable()
export class S3Service  {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly logger = new Logger(S3Service.name);

  

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      endpoint: this.configService.get<string>('AWS_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
       forcePathStyle: true,
    });
  }

  async writeDataToS3<T>(
    data: T,
    fileName: string = 'data.json',
    bucketName: string = 'assets',
  ): Promise<void> {
    const nowUTC = new Date();
    const year = nowUTC.getUTCFullYear();
    const month = String(nowUTC.getUTCMonth() + 1).padStart(2, '0');
    const day = String(nowUTC.getUTCDate()).padStart(2, '0');
    const hour = String(nowUTC.getUTCHours()).padStart(2, '0');


    const directoryPath = `${year}-${month}-${day}/${hour}`;
    const s3Key = `${directoryPath}/${fileName}`;

    const content = JSON.stringify(data, null, 2);

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
      Body: content,
      ContentType: 'application/json',
    });

     await this.s3Client.send(command);
  }
}
