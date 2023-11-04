import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
  IsPhoneNumber,
} from 'class-validator';
import { CustomMatchPasswords } from 'src/common/utils/password.util';

export class VerificationDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
}

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1000, { message: "otp shouldn't be less then 4 numbers" })
  @Max(9999, { message: "otp shouldn't be more then 4 numbers" })
  otp?: number;

  
  @IsPhoneNumber()
  phone?: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'password is too short' })
  @MaxLength(50, { message: 'password is too long' })
  password: string;

  @Validate(CustomMatchPasswords, ['password'])
  passwordConfirm: string;
}
