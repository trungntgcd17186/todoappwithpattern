import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands/handlers';
import { Todo } from './entities/todo.entity';
import { EventHandlers } from './events/handlers';
import { TodosController } from './todos.controller';
import { TodoService } from './todos.service';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), CqrsModule],
  controllers: [TodosController],
  providers: [
    TodoService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class TodosModule {}
