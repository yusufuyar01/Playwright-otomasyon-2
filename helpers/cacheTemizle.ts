// helpers/cacheTemizle.ts
import { Page } from '@playwright/test';

export async function cacheTemizle(page: Page): Promise<void> {
  
  try {
    // Cookies'leri temizle
    await page.context().clearCookies();
    
    // Sayfanın yüklenmesini bekle
    try {
      await page.waitForLoadState('domcontentloaded', { timeout: 5000 });
    } catch (error) {
      console.log('⚠️ Sayfa yüklenme beklendi ama timeout oldu, devam ediliyor...');
    }
    
    // LocalStorage ve SessionStorage'ı güvenli şekilde temizle
    await page.evaluate(() => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.clear();
          console.log('✅ LocalStorage temizlendi');
        }
      } catch (error) {
        console.log('⚠️ LocalStorage temizlenemedi:', error.message);
      }
      
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.clear();
          console.log('✅ SessionStorage temizlendi');
        }
      } catch (error) {
        console.log('⚠️ SessionStorage temizlenemedi:', error.message);
      }
      
      // IndexedDB'yi güvenli şekilde temizle
      try {
        if (typeof window !== 'undefined' && 'indexedDB' in window) {
          indexedDB.databases().then(databases => {
            databases.forEach(db => {
              indexedDB.deleteDatabase(db.name);
            });
            console.log('✅ IndexedDB temizlendi');
          }).catch(error => {
            console.log('⚠️ IndexedDB temizlenemedi:', error.message);
          });
        }
      } catch (error) {
        console.log('⚠️ IndexedDB erişimi hatası:', error.message);
      }
      
      // Service Worker'ları güvenli şekilde temizle
      try {
        if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => {
              registration.unregister();
            });
            console.log('✅ Service Worker\'lar temizlendi');
          }).catch(error => {
            console.log('⚠️ Service Worker temizlenemedi:', error.message);
          });
        }
      } catch (error) {
        console.log('⚠️ Service Worker erişimi hatası:', error.message);
      }
    });
    
    // Cache API'yi güvenli şekilde temizle
    await page.evaluate(async () => {
      try {
        if (typeof window !== 'undefined' && 'caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map(name => caches.delete(name)));
          console.log('✅ Cache API temizlendi');
        }
      } catch (error) {
        console.log('⚠️ Cache API temizlenemedi:', error.message);
      }
    });
    
    
  } catch (error) {
    console.error('❌ Cache temizleme sırasında hata:', error);
    // Hata olsa bile devam et, test çalışmaya devam etsin
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
