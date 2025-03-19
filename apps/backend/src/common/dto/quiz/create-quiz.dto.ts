import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  ArrayMaxSize,
} from 'class-validator';
import { mockData } from '../../../configs/swagger/mock';

export class CreateQuizDto {
  @ApiProperty({
    description: 'The quiz question',
    example: mockData.createQuizDto.question,
  })
  @IsNotEmpty()
  @IsString()
  question!: string;

  @ApiProperty({
    description: 'Array of up to 6 possible answer options',
    example: mockData.createQuizDto.options,
    maxItems: 6,
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMaxSize(6) // Enforce max 6 options per task requirement
  options!: string[];

  @ApiProperty({
    description: 'ID of the associated event',
    example: mockData.createQuizDto.eventId,
  })
  @IsNotEmpty()
  @IsNumber()
  eventId!: number;
}
