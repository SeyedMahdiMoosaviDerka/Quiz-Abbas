import { Body, Controller, Post, Query } from '@nestjs/common';
import { AnswerService } from '../services/answer.service';
import { CreateAnswerDto } from '@common/dto/answer/create-answer.dto';
import { SW } from '@configs/swagger/swagger-config';
import { ApiDocDecorator } from '@app/configs/swagger/decorator';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @ApiDocDecorator('submitAnswer')
  async create(
    @Body() createAnswerDto: CreateAnswerDto,
    @Query('validationLevel')
    validationLevel: 'none' | 'moderate' | 'strict' = 'none'
  ) {
    const result = await this.answerService.create(
      createAnswerDto,
      validationLevel
    );
    return {
      statusCode: 201,
      data: {
        message: result.warnings.length
          ? 'All answers saved with warnings'
          : 'All answers saved successfully',
        warnings: result.warnings,
      },
      message: 'Operation successful',
    };
  }
}
