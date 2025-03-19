import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { mockData } from '../../../configs/swagger/mock';
import { AnswerItemDto } from './answer-item.dto';

export class CreateAnswerDto {
  @ApiProperty({
    description: 'Unique identifier of the user submitting the answers',
    example: mockData.createAnswerDto.userId,
  })
  @IsNotEmpty()
  @IsString()
  userId!: string;

  @ApiProperty({
    description: 'ID of the event for which all answers are submitted',
    example: mockData.createAnswerDto.eventId,
  })
  @IsNotEmpty()
  @IsNumber()
  eventId!: number;

  @ApiProperty({
    description:
      'Array containing all user answers for the event’s quiz questions, submitted at once',
    type: [AnswerItemDto],
    example: mockData.createAnswerDto.answers,
  })
  @IsNotEmpty()
  @IsArray()
  answers!: AnswerItemDto[];
}
