import { IsNotEmpty, IsString } from 'class-validator';

export class FindTaskForUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
