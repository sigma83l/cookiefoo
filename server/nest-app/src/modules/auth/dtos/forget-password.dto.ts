import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { CustomMatchPasswords } from 'src/common/utils/password.util';

export class ForgetPasswordDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
}

export class ResetPasswordtDto {
  @IsNotEmpty()
  @MinLength(8, { message: 'password is too short' })
  @MaxLength(50, { message: 'password is too long' })
  password: string;

  @Validate(CustomMatchPasswords, ['password'])
  passwordConfirm: string;
}
