import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';
import { mockData } from '../../../configs/swagger/mock';

export class CreateQuizDto {
  @ApiProperty({
    description: 'The quiz question',
    example: mockData.createQuizDto.question,
  })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({
    description: 'Array of possible answers',
    example: mockData.createQuizDto.answers,
  })
  @IsNotEmpty()
  @IsArray()
  answers: string[];

  @ApiProperty({
    description: 'ID of the associated event',
    example: mockData.createQuizDto.eventId,
  })
  @IsNotEmpty()
  @IsNumber()
  eventId: number;
}
