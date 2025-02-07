import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class getAtendentesByFilialDTO {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  filial: number;
}