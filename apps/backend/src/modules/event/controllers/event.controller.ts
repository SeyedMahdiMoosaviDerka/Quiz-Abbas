import { Controller, Get, Post, Body } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../../../common/dto/event/create-event.dto';
import { ApiDocDecorator } from '@app/configs/swagger/decorator';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiDocDecorator('createEvent')
  create(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }

  @Get()
  @ApiDocDecorator('getEvents')
  findAll() {
    return this.eventService.findAll();
  }
}
