import { NextResponse } from 'next/server';

// Backend URL for your NestJS server
const BACKEND_URL = process.env.BACKEND_URL + '/tasks' || '';

// Utility function to format dates
const formatDateToYYYYMMDD = (dateString: string) => {
    return new Date(dateString.split('T')[0]).toLocaleDateString("pt-BR"); // Extracts 'YYYY-MM-DD' part
  };
  
  // Function to transform date fields in the task object
  const transformTaskDates = (task: any) => {
    return {
      ...task,
      date: formatDateToYYYYMMDD(task.date), // Format the 'date' field
      // Add any other date fields if needed
      // e.g. `someOtherDateField: formatDateToYYYYMMDD(task.someOtherDateField)`
    };
  };
  
  // Handle GET requests (by username or task ID)
  export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    const taskId = searchParams.get('id'); // For getting by task ID
  
    try {
      let url = BACKEND_URL;
      if (taskId) {
        url = `${BACKEND_URL}/${taskId}`; // Get task by ID
      } else if (username) {
        url = `${BACKEND_URL}?username=${username}`; // Get tasks by username
      }
  
      console.log(`Fetching from ${url}`);
  
      const response = await fetch(url, {
        method: 'GET',
      });
  
      if (!response.ok) {
        console.error('Backend error response:', await response.text());
        throw new Error('Failed to fetch tasks from the backend');
      }
  
      let data = await response.json();
  
      // Transform the date fields before sending to the frontend
      if (Array.isArray(data)) {
        // If it's an array of tasks, format each one
        data = data.map(transformTaskDates);
      } else {
        // If it's a single task, format its dates
        data = transformTaskDates(data);
      }
  
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
    }
  }

// Handle POST requests (create a new task)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Backend error response:', await response.text());
      throw new Error('Failed to create task');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
  }
}

// Handle PUT requests (update a task)
export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get('id');

  if (!taskId) {
    return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
  }

  try {
    const body = await req.json();

    const response = await fetch(`${BACKEND_URL}/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Backend error response:', await response.text());
      throw new Error('Failed to update task');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Error updating task' }, { status: 500 });
  }
}

// Handle DELETE requests (delete a task by ID)
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get('id');

  if (!taskId) {
    return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error('Backend error response:', await response.text());
      throw new Error('Failed to delete task');
    }

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Error deleting task' }, { status: 500 });
  }
}
