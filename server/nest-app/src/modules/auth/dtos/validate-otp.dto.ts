import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class ValidateOtpDto {
  @IsNumber()
  otp: number;
  
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
}