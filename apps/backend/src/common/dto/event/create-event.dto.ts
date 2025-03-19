import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { mockData } from '../../../configs/swagger/mock';

export class CreateEventDto {
  @ApiProperty({
    description: 'Name of the sports event',
    example: mockData.createEventDto.name,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Start time of the event in ISO format',
    example: mockData.createEventDto.startTime,
  })
  @IsNotEmpty()
  @IsString()
  startTime: string;

  @ApiProperty({
    description: 'Additional information about the event',
    example: mockData.createEventDto.info,
  })
  @IsNotEmpty()
  @IsString()
  info: string;
}
