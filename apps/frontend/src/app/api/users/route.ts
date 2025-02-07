// src/app/api/users/route.ts

import { NextResponse } from 'next/server';

const BACKEND_URL = `${process.env.BACKEND_URL}/commons/users`;

// Function to transform or format user data if needed
const transformUserData = (user: any) => ({
  ...user,
  // Example transformation (customize as needed):
  // name: user.name.toUpperCase(), // if you want to capitalize names
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const groupDn = searchParams.get('groupDn');

  if (!groupDn) {
    return NextResponse.json({ error: 'groupDn is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${BACKEND_URL}?groupDn=${groupDn}`, {
      method: 'GET',
    });

    if (!response.ok) {
      console.error('Backend error response:', await response.text());
      throw new Error('Failed to fetch users from the backend');
    }

    let data = await response.json();

    // If data transformation is required, apply it here
    data = Array.isArray(data) ? data.map(transformUserData) : transformUserData(data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}