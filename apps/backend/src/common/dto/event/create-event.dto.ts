import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { mockData } from '../../../configs/swagger/mock';

export class TeamDto {
  @ApiProperty({ example: 'Manchester City' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'England' })
  @IsNotEmpty()
  @IsString()
  country!: string;

  @ApiProperty({ example: 'https://example.com/logo.png', required: false })
  @IsOptional()
  @IsString()
  logoUrl?: string;
}

export class CreateEventDto {
  @ApiProperty({
    description: 'Name of the sports event',
    example: mockData.createEventDto.name,
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Start time of the event in ISO format',
    example: mockData.createEventDto.startTime,
  })
  @IsNotEmpty()
  @IsString()
  startTime!: string;

  @ApiProperty({
    description: 'Additional information about the event',
    example: mockData.createEventDto.info,
  })
  @IsNotEmpty()
  @IsString()
  info!: string;

  @ApiProperty({
    description: 'Type of sport (e.g., football, basketball)',
    example: 'football',
    required: false,
  })
  @IsOptional()
  @IsString()
  sportType?: string;

  @ApiProperty({
    description: 'Home team details',
    type: TeamDto,
  })
  @IsNotEmpty()
  homeTeam!: TeamDto;

  @ApiProperty({
    description: 'Away team details',
    type: TeamDto,
  })
  @IsNotEmpty()
  awayTeam!: TeamDto;
}
