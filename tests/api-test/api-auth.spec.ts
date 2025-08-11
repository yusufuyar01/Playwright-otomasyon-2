import { test, expect } from '@playwright/test';

test.describe('API Authentication Tests', () => {
  let authToken: string;

  test.beforeAll(async () => {
    // Global setup'tan gelen token'ı al
    authToken = process.env.API_TOKEN || '';
    expect(authToken).toBeTruthy();
    console.log('🔑 Test için token alındı');
  });

  test('should access API endpoint with valid token', async ({ request }) => {
    // API endpoint'e token ile istek at
    const response = await request.get('https://jsonplaceholder.typicode.com/posts', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    expect(response.ok()).toBeTruthy();
    
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    
    console.log('✅ API endpoint başarıyla erişildi');
  });

  test('should access API endpoint without token', async ({ request }) => {
    // Token olmadan API endpoint'e istek at
    const response = await request.get('https://jsonplaceholder.typicode.com/posts', {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Bu endpoint public olduğu için 200 döner
    expect(response.ok()).toBeTruthy();
    
    console.log('ℹ️ Public endpoint token olmadan erişilebilir');
  });

  test('should validate token format', () => {
    // Token format kontrolü (test token için)
    expect(authToken).toMatch(/^test-token-\d+$/);
    console.log('✅ Test token format doğrulandı');
  });
});
