// helpers/cacheTemizle.ts
import { Page } from '@playwright/test';

export async function cacheTemizle(page: Page): Promise<void> {
  console.log('🧹 Cache ve storage temizleniyor...');
  
  try {
    // Cookies'leri temizle
    await page.context().clearCookies();
    console.log('✅ Cookies temizlendi');
    
    // LocalStorage ve SessionStorage'ı temizle
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
      console.log('✅ LocalStorage ve SessionStorage temizlendi');
      
      // IndexedDB'yi temizle
      if ('indexedDB' in window) {
        indexedDB.databases().then(databases => {
          databases.forEach(db => {
            indexedDB.deleteDatabase(db.name);
          });
          console.log('✅ IndexedDB temizlendi');
        });
      }
      
      // Service Worker'ları temizle
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => {
            registration.unregister();
          });
          console.log('✅ Service Worker\'lar temizlendi');
        });
      }
    });
    
    // Cache API'yi temizle
    await page.evaluate(async () => {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        console.log('✅ Cache API temizlendi');
      }
    });
    
    console.log('🎉 Tüm cache ve storage başarıyla temizlendi');
    
  } catch (error) {
    console.error('❌ Cache temizleme sırasında hata:', error);
  }
}

export async function sayfaCacheTemizle(page: Page): Promise<void> {
  console.log('🔄 Sayfa cache temizleniyor...');
  
  try {
    // Sayfayı yeniden yükle
    await page.reload({ waitUntil: 'networkidle' });
    console.log('✅ Sayfa yeniden yüklendi');
    
    // Kısa bir bekleme
    await page.waitForTimeout(1000);
    
  } catch (error) {
    console.error('❌ Sayfa cache temizleme sırasında hata:', error);
  }
}
