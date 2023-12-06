import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodosQuery } from '../impl/get-todos.query';
import { Repository } from 'typeorm';
import { Todo } from 'src/todos/entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async execute(query: GetTodosQuery): Promise<Todo[]> {
    return await this.todoRepository.find();
  }
}
