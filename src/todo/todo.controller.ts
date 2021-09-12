import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete, Patch } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTaskDTO } from './tdo/create-task.dto'; 
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) { }
    
  // Submit a task
  @Post('/task')
  async addTask(@Res() res, @Body() createTaskDTO: CreateTaskDTO) {
    const newTask = await this.todoService.addTask(createTaskDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Task has been submitted successfully!',
      task: newTask,
    });
  }

  // Fetch a particular task using ID
  @Get('task/:taskID')
  async getTask(@Res() res, @Param('taskID', new ValidateObjectId()) taskID) {
    const task = await this.todoService.getTask(taskID);
    if (!task) {
        throw new NotFoundException('Task does not exist!');
    }
    return res.status(HttpStatus.OK).json(task);
  }
    
  // Fetch all tasks
  @Get('tasks')
  async getTasks(@Res() res) {
    const tasks = await this.todoService.getTasks();
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Get('done-tasks')
  async getDoneTasks(@Res() res) {
    const tasks = await this.todoService.getDoneTasks();
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Get('sort-tasks')
  async getSortTasks(@Res() res) {
    const tasks = await this.todoService.getSortTasks();
    return res.status(HttpStatus.OK).json(tasks);
  }

  // Edit a particular task using ID
  @Put('/edit')
  async editTask(
    @Res() res,
    @Query('taskId', new ValidateObjectId()) taskId,
    @Body() createTaskDTO: CreateTaskDTO
  ) {
    const editedTask = await this.todoService.editTask(taskId, createTaskDTO);
    if (!editedTask) {
        throw new NotFoundException('Task does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Task has been successfully updated',
      task: editedTask,
    });
  }

  // Delete a task using ID
  @Delete('/delete')
  async deleteTask(
    @Res() res, 
    @Query('taskID', new ValidateObjectId()) taskID
    ) {
    const deletedTask = await this.todoService.deleteTask(taskID);
    if (!deletedTask) {
        throw new NotFoundException('Task does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Task has been deleted!',
      task: deletedTask,
    });
  }

}
