import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { vknUret } from '../../helpers/vknUret';
import { rastgeleString } from '../../helpers/stringUret';
import { ePostaUret } from '../../helpers/ePostaUret';
import { telNoUret } from '../../helpers/telNoUret';
import { zoom } from '../../helpers/zoom';
import { cihazEkle, cihazGuncelle, cihazSil , cihazUyeIseyerindenGeriAlma, cihazUyeIseyerineAtama, cihazlariBayiyeAta, cihazlariBayidenGeriAl} from '../../helpers/cihazIslemleri';


test('Deneme', async ({ page }) => {

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
  await cihazEkle(page);


   // Cihaz güncelleme
   await cihazGuncelle(page);

   // Cihazı üye işyerine atama
  // await cihazUyeIseyerineAtama(page);

  // // Cihazı üye işyerinden geri alma
  // await cihazUyeIseyerindenGeriAlma(page);

  // cihazları bayiye atama
  await cihazlariBayiyeAta(page);

  // cihazları bayiden geri alma
  await cihazlariBayidenGeriAl(page); 

  // Cihaz silme
  await cihazSil(page);
  await cihazSil(page);



  // // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 