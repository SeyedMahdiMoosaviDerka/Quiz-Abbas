import {
  IsString,
  IsArray,
  IsNumber,
  IsNotEmpty,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  answers: string[];

  @IsNumber()
  @IsNotEmpty()
  eventId: number;
}
