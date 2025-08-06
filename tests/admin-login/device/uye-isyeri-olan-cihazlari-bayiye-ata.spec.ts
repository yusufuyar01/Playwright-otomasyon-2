import { test, expect } from '@playwright/test';
import { login } from '../../../helpers/login';
import { zoom } from '../../../helpers/zoom';
import { cihazEkle, cihazGuncelle, cihazSil, cihazUyeIseyerindenGeriAl, cihazUyeIseyerineAta, cihazlariBayiyeAta,  } from '../../../helpers/cihazIslemleri';

test('Üye İşyeri Olan Cihazları Bayiye Atama', async ({ page }) => {

  console.log('===>  Üye İşyeri Olan Cihazları Bayiye Atama  <===');

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

  // Cihaz ekleme, birisi güncellenecek
  await cihazEkle(page);
  await cihazEkle(page);

  // Cihaz güncelleme
  await cihazGuncelle(page);

  // Cihazı üye işyerine atama
  await cihazUyeIseyerineAta(page);

  // ===== ADIM 4: Cihazları Bayiye  Atama =====
  await cihazlariBayiyeAta(page);

  // Cihazları bayiye atamaya çalıştık ve başarısız işlemler tablosu çıktı, tabloyu kapattık. Eğer üye işyerine atama yapmasaydık cihazları bayiye atayacaktı.
  await page.getByRole('button', { name: ' Kapat' }).click();

  // cihazları üye işyerinden geri al
  await cihazUyeIseyerindenGeriAl(page);
  await page.waitForTimeout(1000);
  
  // // Cihaz silme
  await cihazSil(page);
  await cihazSil(page);

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 