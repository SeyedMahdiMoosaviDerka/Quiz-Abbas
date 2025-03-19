import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '@database/event/event.entity';
import { EventController } from './controllers/event.controller';
import { EventsService } from './services/event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventsService],
  exports: [EventsService], // Export for AnswerService
})
export class EventModule {}
