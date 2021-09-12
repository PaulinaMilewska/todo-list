import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/task.interface';
import { CreateTaskDTO } from './tdo/create-task.dto';
    
@Injectable()
export class TodoService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) { }
    
  async addTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const newTask = await new this.taskModel(createTaskDTO); //new???
    return newTask.save();
  }  
    
  async getTask(taskID): Promise<Task> {
    const task = await this.taskModel
      .findById(taskID)
      .exec();
    return task;
  }
    
  async getTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();
    return tasks;
  }

  async getDoneTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();
    const doneTasks = tasks.filter(task => task.isDone === true);
    return doneTasks;
  }

  async getSortTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();
    const sortTasks = tasks.sort( (a,b) => {
      return (a === b)? 0 : a? -1 : 1;
    });
    return sortTasks;
  }

  async editTask(taskID: any, createTaskDTO: CreateTaskDTO): Promise<Task> {
    const editedTask = await this.taskModel
      .findByIdAndUpdate(taskID, createTaskDTO, { new: true });
    return editedTask;
  }
  async deleteTask(taskID): Promise<any> {
    const deletedTask = await this.taskModel
      .findByIdAndRemove(taskID);
    return deletedTask;
  }
}
