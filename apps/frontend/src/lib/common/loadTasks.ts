import { fetchTasksForUser } from '@/services/common/tasksService';
import { TaskFront } from '@g360/core';

/**
 * Function to load tasks for a given user.
 * @param username - The username for which to fetch tasks.
 * @returns An array of tasks for the specified user.
 */
export async function loadTasks(username: string): Promise<TaskFront[]> {
  try {
    const tasks = await fetchTasksForUser(username);
    return tasks;
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
}