import {
  Controller,
  Post,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AnswerService } from '../services/answer.service';
import { CreateAnswerDto } from '@common/dto/answer/create-answer.dto';
import { ApiDocDecorator } from '@configs/swagger/decorator';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiDocDecorator('submitAnswer')
  async create(
    @Body() createAnswerDto: CreateAnswerDto,
    @Query('validationLevel') validationLevel: 'none' | 'moderate' = 'none'
  ) {
    const result = await this.answerService.create(
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
