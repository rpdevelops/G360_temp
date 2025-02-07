export interface Task {
    id?: number;
    title: string;
    description: string;
    attributed: string;
    observers: string[];
    date: Date;
    startTime: string; // ISO datetime string (e.g., "2024-10-12T10:00:00Z")
    endTime: string;   // ISO datetime string
    status?: string;
  }

  export interface TaskFront {
    id?: number;
    title: string;
    description: string;
    attributed: string;
    observers: string[];
    date: string;
    startTime: string; // ISO datetime string (e.g., "2024-10-12T10:00:00Z")
    endTime: string;   // ISO datetime string
    status?: string;
  }