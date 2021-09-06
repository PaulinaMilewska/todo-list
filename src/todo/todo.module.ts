import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './schemas/todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TodoSchema }]),
  ],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}