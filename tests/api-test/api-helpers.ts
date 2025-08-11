import { APIRequestContext, request } from '@playwright/test';
import { expect } from '@playwright/test';

export class APIHelper {
  private context: APIRequestContext;
  private baseURL: string;
  private authToken: string;

  constructor(baseURL: string = 'https://jsonplaceholder.typicode.com') {
    this.baseURL = baseURL;
    this.authToken = process.env.API_TOKEN || '';
  }

  /**
   * API request context oluştur
   */
  async createContext(): Promise<void> {
    this.context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        'Authorization': `Bearer ${this.authToken}`,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * GET isteği yap
   */
  async get(endpoint: string, params?: Record<string, any>) {
    if (!this.context) {
      await this.createContext();
    }

    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
    return await this.context.get(url);
  }

  /**
   * POST isteği yap
   */
  async post(endpoint: string, data?: any) {
    if (!this.context) {
      await this.createContext();
    }

    return await this.context.post(endpoint, { data });
  }

  /**
   * PUT isteği yap
   */
  async put(endpoint: string, data?: any) {
    if (!this.context) {
      await this.createContext();
    }

    return await this.context.put(endpoint, { data });
  }

  /**
   * DELETE isteği yap
   */
  async delete(endpoint: string) {
    if (!this.context) {
      await this.createContext();
    }

    return await this.context.delete(endpoint);
  }

  /**
   * Context'i kapat
   */
  async dispose(): Promise<void> {
    if (this.context) {
      await this.context.dispose();
    }
  }

  /**
   * Response'u JSON olarak parse et
   */
  async parseResponse(response: any) {
    try {
      return await response.json();
    } catch (error) {
      console.error('Response parse hatası:', error);
      return null;
    }
  }

  /**
   * Response status kontrolü
   */
  async expectStatus(response: any, expectedStatus: number) {
    expect(response.status()).toBe(expectedStatus);
  }

  /**
   * Response body validation
   */
  async expectResponseBody(response: any, expectedProperties: string[]) {
    const body = await this.parseResponse(response);
    expectedProperties.forEach(prop => {
      expect(body).toHaveProperty(prop);
    });
  }
}

// Singleton instance
export const apiHelper = new APIHelper();
