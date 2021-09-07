import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './schemas/todo.schema';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TodoSchema }]),
  ],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      { method: RequestMethod.POST, path: '/todo/task' },
      { method: RequestMethod.PUT, path: '/todo/edit' },
      { method: RequestMethod.DELETE, path: '/todo/delete' }
    )
  }
}
