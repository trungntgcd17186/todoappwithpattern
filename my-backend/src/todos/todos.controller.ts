import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoCommand } from './commands/impl/create-todo.command';
import { CreateTodoDto } from './interfaces/create-todo-dto.interfaces';
import { GetTodosQuery } from './queries/impl/get-todos.query';
import { GetTodoDetail } from './queries/impl/get-todo-detail.query';

@Controller('todo')
export class TodosController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('createTodo')
  async createTodo(@Body() dto: CreateTodoDto): Promise<void> {
    const createdTodo = await this.commandBus.execute(
      new CreateTodoCommand(dto.title),
    );

    return await this.queryBus.execute(new GetTodoDetail(createdTodo.id));
  }

  @Get()
  async getTodos(): Promise<void> {
    return this.queryBus.execute(new GetTodosQuery());
  }
}
