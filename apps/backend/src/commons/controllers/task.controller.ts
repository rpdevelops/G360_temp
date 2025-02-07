import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { TaskService } from '../services/task/task.service'; // Adjust the import if necessary
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity'; // Adjust the import if necessary
import { TaskIdParamDto } from '../dto/task-id.dto';
import { FindTaskForUserDto } from '../dto/task-user.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Create a new task
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);  // Return Task
  }

  // Update an existing task by id
  @Put(':id')
  async updateTask(@Param() params: TaskIdParamDto, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskService.updateTask(params.id, updateTaskDto);  // Return Task
  }

  // Get all tasks for a user (attributed or observer)
  @Get()
  async findTasksForUser(@Query() query: FindTaskForUserDto): Promise<Task[]> {
    return this.taskService.findTasksForUser(query.username);  // Return Task[]
  }

  // Get task by id
  @Get(':id')
  async findById(@Param() params: TaskIdParamDto): Promise<Task> {
    return this.taskService.findById(params.id);  // Return Task
  }

  // Delete a task by id
  @Delete(':id')
  async deleteTask(@Param() params: TaskIdParamDto): Promise<void> {
    return this.taskService.deleteTask(params.id);  // Return void (no content)
  }
}
