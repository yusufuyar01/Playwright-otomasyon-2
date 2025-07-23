import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';
import { cihazEkle, cihazGuncelle, cihazlariBayidenGeriAl, cihazlariBayiyeAta, cihazSil } from '../../helpers/cihazIslemleri';

test('Bayiye Atalı Cihazları Bayiden Geri Alma', async ({ page }) => {

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
  await page.waitForTimeout(1000);

  //cihaz ekleme
  await cihazEkle(page);
  await cihazEkle(page);

  // Cihaz güncelleme
  await cihazGuncelle(page);

  // cihazları bayiye atama
  await cihazlariBayiyeAta(page);

  // cihazları bayiden geri alma
  await cihazlariBayidenGeriAl(page);


  // Cihaz silme
  await cihazSil(page);
  await cihazSil(page);

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 