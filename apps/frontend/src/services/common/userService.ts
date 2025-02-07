// src/services/userService.ts
export async function fetchUsersByGroup(groupDn: string) {
  try {
    const response = await fetch(`/api/users?groupDn=${groupDn}`);
    let data = await response.json();
    return data; // Expected format: [{ user, name }]
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}
