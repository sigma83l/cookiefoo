import { IsString } from 'class-validator';

export class DeleteObject {
    @IsString()
    key: string;
}