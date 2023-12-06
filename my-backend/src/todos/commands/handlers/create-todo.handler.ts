import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Todo as TodoModel } from 'src/todos/models/todo.model';
import { Todo as TodoEntity } from '../../entities/todo.entity';

import { CreateTodoCommand } from '../impl/create-todo.command';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateTodoCommand): Promise<{ id: number }> {
    const { title } = command;
    console.log('Async CreateTodoCommand...', title);

    const todo = new TodoEntity();
    todo.title = title;
    await this.todoRepository.save(todo);

    const todoModel = this.publisher.mergeObjectContext(new TodoModel());
    todoModel.addTodo(title);
    todoModel.commit();

    return { id: todo.id };
  }
}
