import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { cihazEkle, cihazGuncelle, cihazlariBayidenGeriAl, cihazlariBayiyeAta, cihazlariOperasyonelBayiyeAta, cihazSil } from '../../helpers/cihazIslemleri';
import { zoom } from '../../helpers/zoom';

test('Birden fazla cihaza operasyonel bayi atama işlemi', async ({ page }) => {
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
  await cihazEkle(page);
  await page.waitForTimeout(1000);

  // cihazı güncelle
  await cihazGuncelle(page);

  // cihazları bayiye ata
  await cihazlariBayiyeAta(page);

  // cihazları operasyonel bayiye ata
  await cihazlariOperasyonelBayiyeAta(page);

  // Cihazları bayiden geri al
  await cihazlariBayidenGeriAl(page);

  // Cihazları sil
  await cihazSil(page);
  await cihazSil(page);

  await page.pause();




  });