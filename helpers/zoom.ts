import { Page } from '@playwright/test';

export async function zoom(page: Page): Promise<void> {

    
  // Sayfa yüklendikten sonra zoom ayarla
  await page.waitForLoadState('networkidle');
  
  // Daha güvenilir zoom yöntemi
  await page.evaluate(() => {
    // CSS transform ile zoom
    document.body.style.transform = 'scale(0.8)';
    document.body.style.transformOrigin = 'top left';
    
    // Alternatif olarak CSS zoom (desteklenirse)
    if (document.body.style.zoom !== undefined) {
      document.body.style.zoom = '80%';
    }
  });

} 