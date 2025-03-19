import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { EventService } from '@modules/event/services/event.service';

@Injectable()
export class TimeGuard implements CanActivate {
  constructor(private readonly eventsService: EventService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const eventId = request.params.eventId || request.body.eventId;
    if (eventId) {
      const event = await this.eventsService.findOne(+eventId);
      if (!event) return true; // Let controller handle not-found
      const now = new Date();
      if (now > event.startTime) {
        // Event has started; restrict quiz-related actions
        return request.method === 'GET'; // Allow reads, block writes
      }
    }
    return true; // No event ID or event not started
  }
}
