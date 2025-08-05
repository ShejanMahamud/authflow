import { InjectQueue } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { FileTypeResult } from 'file-type';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Util } from 'src/utils/util';
@Injectable()
export class UploadService {
  private readonly bucketName: string;
  private readonly cloudfrontUrl: string;
  constructor(
    //inject bullmq service
    @InjectQueue('uploader') private readonly uploadQueue: Queue,
    //inject config service
    private readonly config: ConfigService,
  ) {
    //cloudfront url
    this.cloudfrontUrl = this.config.get<string>(
      'AWS_CLOUDFRONT_URL',
    ) as string;
    //bucket name
    this.bucketName = this.config.get<string>('AWS_PUBLIC_BUCKET') as string;
  }

  //file uploader queue method
  private async enqueueUpload(file: Express.Multer.File): Promise<string> {
    const { fileTypeFromBuffer } = await import('file-type');
    const fileType: FileTypeResult | undefined = await fileTypeFromBuffer(
      file.buffer,
    );
    if (!fileType || !fileType.mime.startsWith('image/')) {
      throw new BadRequestException('Invalid or unsupported file type!');
    }
    //check mime type
    if (
      !['image/gif', 'image/jpg', 'image/jpeg', 'image/png'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('Mime type not supported');
    }
    //create tmp dir
    const tmpDir = os.tmpdir();
    const tmpFilePath = path.join(
      tmpDir,
      this.generateFileName(file.originalname),
    );
    //stream the file
    fs.writeFileSync(tmpFilePath, file.buffer);
    //generate key
    const key = this.generateFileName(file.originalname);
    await this.uploadQueue.add('upload-image', {
      filePath: tmpFilePath,
      mimeType: file.mimetype,
      bucketName: this.bucketName,
      key,
    });
    return key;
  }

  //generate unique filenames
  private generateFileName(fileName: string): string {
    const uuid = Util.genToken(16);
    const ext = path.extname(fileName);
    return `${Date.now()}-${uuid}${ext}`;
  }

  //get cloudfront url
  public async uploadAndGetUrl(file: Express.Multer.File): Promise<string> {
    const fileName = await this.enqueueUpload(file);
    return `${this.cloudfrontUrl}/${fileName}`;
  }
}
