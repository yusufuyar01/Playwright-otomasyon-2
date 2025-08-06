import { test, expect } from '@playwright/test';
import { login } from '../../../helpers/login';
import { zoom } from '../../../helpers/zoom';
import { cihazEkle, cihazGuncelle, cihazlariBayidenGeriAl, cihazSil, cihazUyeIseyerindenGeriAl, cihazUyeIseyerineAta } from '../../../helpers/cihazIslemleri';

test('Üye İşyerine Atalı Cihazları Bayiden Geri Alma', async ({ page }) => {

  console.log('===>  Üye İşyerine Atalı Cihazları Bayiden Geri Alma  <===');

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

  // Cihaz ekleme
  await cihazEkle(page);
  await cihazEkle(page);

  // Cihaz güncelleme
  await cihazGuncelle(page);

  // Cihazları üye işyerine atama
  await cihazUyeIseyerineAta(page);

  // Üye işyerine atalı cihazları bayiden geri alma
  await cihazlariBayidenGeriAl(page);

  // Cihazları üye işyerinden geri alma
  await cihazUyeIseyerindenGeriAl(page);

  // Cihaz silme
  await cihazSil(page);
  await page.waitForTimeout(1000);
  await cihazSil(page);

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 