import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateEventDto } from '@common/dto/event/create-event.dto';
import { ApiDocDecorator } from '@configs/swagger/decorator';
import { EventService } from '../services/event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiDocDecorator('createEvent')
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  @ApiDocDecorator('getEvents')
  async findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  @ApiDocDecorator('getEvents') // Reuse for simplicity
  async findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Put(':id')
  @ApiDocDecorator('createEvent') // Update Swagger if needed
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: CreateEventDto
  ) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @ApiDocDecorator('getEvents') // Update Swagger if needed
  async remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
