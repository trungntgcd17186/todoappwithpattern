import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoCreatedEvent } from '../impl/todo-created.event';

@EventsHandler(TodoCreatedEvent)
export class TodoCreatedHandler implements IEventHandler<TodoCreatedEvent> {
  constructor() {}

  async handle(event: TodoCreatedEvent): Promise<void> {
    const { title } = event;
    console.log('Async TodoCreatedEvent...', title);
  }
}
