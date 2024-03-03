import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserUpdatedEvent } from '../events/user-updated.event';

@Injectable()
export class UserUpdatedListener {
  @OnEvent('user.updated')
  handleUserUpdatedEvent(event: UserUpdatedEvent) {
    // handle and process "UserUpdatedEvent" event
    console.log(event);
  }
}
