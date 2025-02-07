import axios from 'axios';
import { Task, TaskFront } from '@g360/core';

// Use the Next.js API routes instead of the direct backend URL
const BASE_URL = '/api/tasks';

// Fetch all tasks for a user by username
export const fetchTasksForUser = async (username: string): Promise<TaskFront[]> => {
  try {
    const response = await axios.get(`${BASE_URL}?username=${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Fetch a task by ID
export const fetchTaskById = async (taskId: number): Promise<Task> => {
  try {
    const response = await axios.get(`${BASE_URL}?id=${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData: Task): Promise<Task> => {
  try {
    const response = await axios.post(BASE_URL, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update an existing task by ID
export const updateTask = async (taskId: number, taskData: Task): Promise<Task> => {
  try {
    const response = await axios.put(`${BASE_URL}?id=${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Delete a task by ID
export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}?id=${taskId}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
