import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { cihazEkle, cihaziBayiyeAta, cihazSil, cihaziBayidenGeriAl, cihaziOperasyonelBayiyeAta } from '../../helpers/cihazIslemleri';
import { zoom } from '../../helpers/zoom';

test.describe('Tek Cihaz Operasyonel Bayi Atama Testi', () => {
  test('Tek cihazı operasyonel bayiye atama işlemi', async ({ page }) => {

  // Önce sisteme giriş yap
  await login(page);

  // Zoom işlemi
  await zoom(page);

   // Cihaz yönetimi bul ve tıkla
   const cihazYonetimi = page.locator('text="Cihaz Yönetimi"'); 
   await cihazYonetimi.click();
   await page.waitForTimeout(1000);
 
   // Cihaz İşlemleri menü linkini bul ve tıkla
   const cihazIslemleri = page.getByRole('link', { name: ' Cihaz İşlemleri' });
   await cihazIslemleri.click();
   await page.waitForTimeout(2000);

  // Cihaz İşlemleri menü linkini bul ve tıkla
  await cihazEkle(page);
  await page.waitForTimeout(1000);

    // Cihazı bayiye ata
    await cihaziBayiyeAta(page);

    // cihazı operasyonel bayiye ata
    await cihaziOperasyonelBayiyeAta(page);

    // cihazı bayiden geri al
    await cihaziBayidenGeriAl(page);

    // Cihaz silme
    await cihazSil(page);
        
    // Test sonucunu doğrula
    await expect(page).toHaveTitle(/Cihazlar/);
    console.log('✅ Tek cihaz operasyonel bayi atama testi tamamlandı');
  });
}); 