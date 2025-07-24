import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';
import { cihazEkle, cihazGuncelle, cihazlariBayidenGeriAl, cihazlariBayiyeAta, cihazlariBayiyeAta2, cihazlariBayiyeAta3, cihazSil, cihazUyeIseyerindenGeriAl, UyeIseyerineAta507 } from '../../helpers/cihazIslemleri';

test('Cihazları 507 Üye İşyerine Atama', async ({ page }) => {

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

  // cihazları bayiye ekle
  await cihazlariBayiyeAta(page);
  await cihazlariBayiyeAta2(page);
  await cihazlariBayiyeAta3(page);

  // 507 üye işyerine cihaz atama işlemi
  await UyeIseyerineAta507(page);

  // cihazları üye işyerinden geri al
  await cihazUyeIseyerindenGeriAl(page);
  
  // Cihaz silme
  await cihazSil(page);
  await cihazSil(page);

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 