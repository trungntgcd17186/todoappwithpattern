import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoDetail } from '../impl/get-todo-detail.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo as TodoEntity } from 'src/todos/entities/todo.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetTodoDetail)
export class GetTodoDetailHandler implements IQueryHandler<GetTodoDetail> {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async execute(query: GetTodoDetail): Promise<any> {
    return this.todoRepository.findOneBy({ id: query.id });
  }
}
