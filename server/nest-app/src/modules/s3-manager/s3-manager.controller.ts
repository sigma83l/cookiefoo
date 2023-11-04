import { Get,
         Post,
         Delete,
         Patch,
         Param,
         Controller,
         Body,
         UploadedFile,
         UseInterceptors,
} from '@nestjs/common';
import { Roles } from '../../common/decorators/index'
import { Role } from '../auth/types/index';
import { S3ManagerService } from './s3-manager.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from '../../common/interfaces/file.interface';
import { DeleteObject } from './dto/delete-object.dto';

@Controller('s3-manager')
export class S3ManagerController {
    constructor(private readonly s3: S3ManagerService) {}

    @Roles(Role.Admin)
    @Get('buckets')
    async listBuckets(): Promise<any>{
        return await this.s3.listBuckets();
    }

    @Roles(Role.Admin)
    @Get('buckets/:bucketName')
    async listObjects(@Param('bucketName') bucketName: string): Promise<any> {
        return this.s3.listObjects(bucketName);
    }

    @Roles(Role.Admin)
    @Post('buckets/:bucketName')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @Param('bucketName') bucketName: string,
        @UploadedFile() file: File,
    ): Promise<any> {
        return await this.s3.uploadFile(bucketName, file);
    }

    @Roles(Role.Admin)
    @Delete('buckets/:bucketName')
    async deleteObject(
        @Param('bucketName') bucketName: string,
        @Body() body: DeleteObject,
    ) {
        return await this.s3.deleteFile(bucketName, body.key);
    }
}
