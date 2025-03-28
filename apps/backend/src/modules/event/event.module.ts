import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '@database/event/event.entity';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService], // Export for AnswerService
})
export class EventModule {}
