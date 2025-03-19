import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { CreateQuizDto } from '@common/dto/quiz/create-quiz.dto';
import { ApiDocDecorator } from '@configs/swagger/decorator';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post(':eventId')
  @ApiDocDecorator('createQuiz')
  create(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() dto: CreateQuizDto
  ) {
    return this.quizService.create({ ...dto, eventId });
  }

  @Get()
  @ApiDocDecorator('getQuizzes')
  findByEvent(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.quizService.findByEvent(eventId);
  }
}
