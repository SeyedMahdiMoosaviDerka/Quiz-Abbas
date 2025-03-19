import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { mockData } from '../../../configs/swagger/mock';

export class AnswerItemDto {
  @ApiProperty({
    description: 'Index of the question being answered',
    example: mockData.createAnswerDto.answers[0].questionIndex,
  })
  @IsNumber()
  questionIndex: number;

  @ApiProperty({
    description: 'User’s answer to the question',
    example: mockData.createAnswerDto.answers[0].answer,
  })
  @IsString()
  answer: string;
}
