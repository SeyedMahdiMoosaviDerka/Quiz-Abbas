import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  info: string;
}
