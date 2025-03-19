import { Controller, Post, Body } from '@nestjs/common';
import { AnswerService } from '../services/answer.service';
import { SubmitAnswerDto } from '../../../common/dto/answer/submit-answer.dto';
import { ApiDocDecorator } from '@app/configs/swagger/decorator';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @ApiDocDecorator('submitAnswer')
  submit(@Body() dto: SubmitAnswerDto) {
    return this.answerService.submit(dto);
  }
}
