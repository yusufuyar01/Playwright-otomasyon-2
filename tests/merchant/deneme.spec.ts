import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { vknUret } from '../../helpers/vknUret';
import { rastgeleString } from '../../helpers/stringUret';
import { ePostaUret } from '../../helpers/ePostaUret';
import { telNoUret } from '../../helpers/telNoUret';
import { zoom } from '../../helpers/zoom';
import { cihazEkle, cihazGuncelle, cihazSil  } from '../../helpers/cihazIslemleri';


test('Deneme', async ({ page }) => {

  // Önce sisteme giriş yap
  await login(page);

  // Zoom işlemi
  await zoom(page);

  // Cihaz İşlemleri menü linkini bul ve tıkla
  await cihazEkle(page);

  // Cihaz güncelleme
  await cihazGuncelle(page);

  // Cihaz silme
  await cihazSil(page);
  await cihazSil(page);


  // // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 