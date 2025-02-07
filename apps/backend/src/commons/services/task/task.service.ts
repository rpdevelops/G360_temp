import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { UpdateTaskDto } from '../../dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task, 'dbseiConnection')  // Inject the repository using the dbseiConnection
    private readonly taskRepository: Repository<Task>,
  ) {}

  // Create a new task
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      date: new Date(createTaskDto.date),  // Convert the string to Date
    });
    return this.taskRepository.save(task);
  }

  // Update an existing task
  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = {
      ...updateTaskDto,
      ...(updateTaskDto.date && { date: new Date(updateTaskDto.date) }),  // Convert the string to Date if present
    };
    await this.taskRepository.update(id, updatedTask);
    return this.findById(id);
  }

  // Find all tasks where the user is attributed or an observer
  async findTasksForUser(username: string): Promise<Task[]> {
    return this.taskRepository
      .createQueryBuilder('task')
      .where('task.attributed = :username', { username })
      .orWhere(':username = ANY(task.observers)', { username })
      .getMany();
  }

  // Get task by id
  async findById(id: number): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }

  // Delete a task by id
  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
