import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileRepository } from './file.repository'; 
import { S3ManagerModule } from '../s3-manager/s3-manager.module';

@Module({
  imports: [S3ManagerModule],
  providers: [FileService, FileRepository],
  controllers: [FileController]
})
export class FileModule {}
