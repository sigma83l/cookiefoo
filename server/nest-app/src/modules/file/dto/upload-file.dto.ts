import { IsString, MaxLength } from 'class-validator';

export class UploadFileDto {
  @IsString()
  @MaxLength(30, { message: clientMessages.file.validation.maxTitle })
  title: string;

  file: any;
}