import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { CreateQuizDto } from '@app/common/dto/quiz/create-quiz.dto';
import { CreateEventDto } from '@app/common/dto/event/create-event.dto';

@Controller('events')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createEvent(@Body() dto: CreateEventDto) {
    return this.appService.createEvent(dto);
  }

  @Get()
  getEvents() {
    return this.appService.getEvents();
  }

  @Post(':eventId/quizzes')
  createQuiz(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() dto: CreateQuizDto
  ) {
    return this.appService.createQuiz({ ...dto, eventId });
  }

  @Get(':eventId/quizzes')
  getQuizzes(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.appService.getQuizzes(eventId);
  }
}
