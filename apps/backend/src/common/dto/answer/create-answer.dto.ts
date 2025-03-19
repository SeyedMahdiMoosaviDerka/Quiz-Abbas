import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { mockData } from '../../../configs/swagger/mock';
import { AnswerItemDto } from './answer-item.dto';

export class CreateAnswerDto {
  @ApiProperty({
    description: 'Unique identifier of the user submitting the answer',
    example: mockData.createAnswerDto.userId,
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'ID of the event the answer is for',
    example: mockData.createAnswerDto.eventId,
  })
  @IsNotEmpty()
  @IsNumber()
  eventId: number;

  @ApiProperty({
    description: 'Array of user answers for the quiz questions',
    type: [AnswerItemDto],
    example: mockData.createAnswerDto.answers,
  })
  @IsNotEmpty()
  @IsArray()
  answers: AnswerItemDto[];
}
