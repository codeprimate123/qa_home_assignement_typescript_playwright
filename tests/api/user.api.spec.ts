import { test, expect } from '@playwright/test';
import type { User } from '@/types/api.types';


test.describe.serial('Petstore API - User Lifecycle', () => {
  const uniqueUsername = `test-user-${Math.floor(Math.random() * 100000)}`;
  const userData: User = {
    id: Math.floor(Math.random() * 1000),
    username: uniqueUsername,
    firstName: 'Test',
    lastName: 'User',
    email: `${uniqueUsername}@example.com`,
    password: 'password123',
    phone: '1234567890',
    userStatus: 1,
  };

  test('should create a new user', async ({ request }) => {
    const response = await request.post('/v2/user', {
      data: userData,
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody.code).toBe(200);
    expect(responseBody.message).toBe(String(userData.id));
  });

  test('should fetch the created user by username', async ({ request }) => {
    const response = await request.get(`/v2/user/${uniqueUsername}`);

    expect(response.ok()).toBeTruthy();
    const responseBody: User = await response.json();

    expect(responseBody.id).toBe(userData.id);
    expect(responseBody.username).toBe(userData.username);
    expect(responseBody.email).toBe(userData.email);
  });

  test('should update the user', async ({ request }) => {
    const updatedFirstName = `Updated-${userData.firstName}`;

    const response = await request.put(`/v2/user/${uniqueUsername}`, {
      data: {
        ...userData,
        firstName: updatedFirstName,
      },
    });

    expect(response.ok()).toBeTruthy();

    const verifyResponse = await request.get(`/v2/user/${uniqueUsername}`);
    expect(verifyResponse.ok()).toBeTruthy();
    const verifyBody: User = await verifyResponse.json();

    expect(verifyBody.firstName).toBe(updatedFirstName);
  });

  test('should delete the user', async ({ request }) => {
    const response = await request.delete(`/v2/user/${uniqueUsername}`);
    expect(response.ok()).toBeTruthy();
  });

  test('should confirm the user has been deleted', async ({ request }) => {
    const response = await request.get(`/v2/user/${uniqueUsername}`);

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });
});