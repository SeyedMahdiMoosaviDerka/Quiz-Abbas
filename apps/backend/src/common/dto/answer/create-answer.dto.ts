import {
  IsString,
  IsInt,
  Min,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserAnswerDto {
  @IsInt()
  @Min(0)
  questionIndex: number;

  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  @Min(1)
  eventId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserAnswerDto)
  answers: UserAnswerDto[];
}
