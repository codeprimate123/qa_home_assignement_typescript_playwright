import { test, expect } from '@playwright/test';
import type { Pet } from '@/types/api.types';

test.describe('Petstore API - Find Pets', () => {
  test('should be able to find pets by status', async ({ request }) => {
    const response = await request.get('/v2/pet/findByStatus', {
      params: {
        status: 'available',
      },
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody: Pet[] = await response.json();

    expect(Array.isArray(responseBody)).toBe(true);

    if (responseBody.length > 0) {
      expect(responseBody[0]).toHaveProperty('status', 'available');
    }
  });
});

test.describe.serial('Petstore API - Create and Delete Pet', () => {
  const petId = Math.floor(Math.random() * 90000) + 10000;
  const petName = `test-pet-${petId}`;

  test('should be able to create a new pet', async ({ request }) => {
    const petData: Pet = {
      id: petId,
      name: petName,
      photoUrls: ['string'],
      status: 'available',
    };
    const response = await request.post('/v2/pet', {
      data: petData,
    });

    expect(response.ok()).toBeTruthy();
    const responseBody: Pet = await response.json();

    expect(responseBody.name).toBe(petName);
    expect(responseBody.id).toBeDefined();
    expect(responseBody.id).toBe(petId);
  });

  test('should be able to fetch the created pet by ID', async ({ request }) => {
    const response = await request.get(`/v2/pet/${petId}`);
    expect(response.ok()).toBeTruthy();
    const responseBody: Pet = await response.json();
    expect(responseBody.id).toBe(petId);
    expect(responseBody.name).toBe(petName);
  });

  test.afterAll(async ({ request }) => {
    const response = await request.delete(`/v2/pet/${petId}`);
    expect(response.ok()).toBeTruthy();
  });
});