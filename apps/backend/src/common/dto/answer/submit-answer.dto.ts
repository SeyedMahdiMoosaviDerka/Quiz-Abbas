import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class SubmitAnswerDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  quizId: number;

  @IsNumber()
  @IsNotEmpty()
  selectedAnswer: number;
}
