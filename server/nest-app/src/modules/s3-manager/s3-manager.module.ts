import { Module } from '@nestjs/common';
import { S3ManagerController } from './s3-manager.controller';
import { S3ManagerService } from './s3-manager.service';
import { S3 } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk'

@Module({
  imports: [AwsSdkModule.forFeatures([S3])],
  controllers: [S3ManagerController],
  providers: [S3ManagerService],
  exports: [S3ManagerController],
})
export class S3ManagerModule {}
