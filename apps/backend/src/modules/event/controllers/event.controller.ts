import { Controller, Get, Post, Body } from '@nestjs/common';
import { EventsService } from '../services/event.service';
import { CreateEventDto } from '@common/dto/event/create-event.dto';
import { ApiDocDecorator } from '@configs/swagger/decorator';

@Controller('events')
export class EventController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiDocDecorator('createEvent')
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @Get()
  @ApiDocDecorator('getEvents')
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiDocDecorator('getEvents') // Reuse Swagger for simplicity
  findOne(id: number) {
    return this.eventsService.findOne(id);
  }
}
