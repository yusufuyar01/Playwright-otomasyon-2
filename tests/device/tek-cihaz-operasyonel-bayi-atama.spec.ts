import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { cihazEkle, cihaziBayiyeAta, cihazSil, cihaziBayidenGeriAl, cihaziOperasyonelBayiyeAta, cihaziOperasyonelBayiyeBoşAta, cihaziBayiyeAta2, cihaziBayiyeAta3 } from '../../helpers/cihazIslemleri';
import { zoom } from '../../helpers/zoom';

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


  // cihaz ekleme
  await cihazEkle(page);

  // cihazı bayiye ata
  await cihaziBayiyeAta(page);

  // cihazı bayiye ata2
  await cihaziBayiyeAta2(page);

  // cihazı bayiye ata3
  await cihaziBayiyeAta3(page);

  // operasyonel bayiye ata
  await cihaziOperasyonelBayiyeAta(page);

  // operasyonel bayiye boş ata
  await cihaziOperasyonelBayiyeBoşAta(page);

  // Cihaz silme
   await cihazSil(page);

        
  await page.pause();

});