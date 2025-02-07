import { Task } from '@g360/core';
import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty, IsDateString } from 'class-validator';

export class CreateTaskDto implements Task{
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  attributed: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  observers: string[];

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsString()
  status: string;
}
