import { CreateAnswerDto } from '@app/common/dto/answer/create-answer.dto';
import {
  Controller,
  Post,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AnswerService } from '../services/answer.service';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswerService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createAnswerDto: CreateAnswerDto,
    @Query('validationLevel') validationLevel: 'none' | 'moderate' = 'none'
  ) {
    const result = await this.answersService.create(
      createAnswerDto,
      validationLevel
    );
    if (result.warnings.length > 0) {
      return {
        message: 'Answers saved with warnings',
        warnings: result.warnings,
      };
    }
    return { message: 'Answers saved successfully' };
  }
}
