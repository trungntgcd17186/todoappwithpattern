import { AggregateRoot } from '@nestjs/cqrs';
import { TodoCreatedEvent } from '../events/impl/todo-created.event';

export class Todo extends AggregateRoot {
  constructor(private readonly id?: string) {
    super();
  }

  addTodo(title: string) {
    this.apply(new TodoCreatedEvent(title));
  }
}
