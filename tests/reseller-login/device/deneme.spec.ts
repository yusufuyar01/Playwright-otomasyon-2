import { test, expect } from '@playwright/test';
import { login } from '../../../helpers/login';
import { zoom } from '../../../helpers/zoom';
import { cihazEkle, cihazGuncelle, cihazSil } from '../../../helpers/cihazIslemleri';

test('Cihazları Bayiye Atama (checkbox işaretli)', async ({ page }) => {

  console.log('===>  Cihazları Bayiye Atama (checkbox işaretli)  <===');

  // Önce sisteme giriş yap
  await login(page);

  // Zoom işlemi
  await zoom(page);

   // ===== ADIM 11: Üye işyeri Silme =====
await page.getByText('Üye İşyeri Yönetimi').click();
await page.waitForTimeout(1000);
await page.getByRole('link', { name: ' Üye İşyeri', exact: true }).click();

await page.waitForTimeout(1000);

  
  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

});