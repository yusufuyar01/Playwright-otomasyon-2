import { request, FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function globalSetup(config: FullConfig) {
  console.log('🔐 API Test Global Setup başlatılıyor...');
  
  try {
    // API request context oluştur
    const reqContext = await request.newContext();
    
    // Test için basit bir API isteği yap (gerçek projede login endpoint'inizi kullanın)
    const response = await reqContext.get('https://jsonplaceholder.typicode.com/posts/1');
    
    if (!response.ok()) {
      throw new Error(`API isteği başarısız: ${response.status()} ${response.statusText()}`);
    }

    const body = await response.json();
    
    // Test için basit bir token oluştur (gerçek projede login response'undan alın)
    process.env.API_TOKEN = 'test-token-' + Date.now();
    console.log('✅ Test token oluşturuldu ve saklandı');
    
    // Storage state'i kaydet (cookie/session bilgileri için)
    const storageStatePath = path.join(__dirname, 'auth-storage-state.json');
    await reqContext.storageState({ path: storageStatePath });
    console.log('✅ Storage state kaydedildi:', storageStatePath);
    
    // Context'i kapat
    await reqContext.dispose();
    
    console.log('🎉 Global setup tamamlandı!');
    
  } catch (error) {
    console.error('❌ Global setup hatası:', error);
    throw error;
  }
}

export default globalSetup;
