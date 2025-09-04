import { test, expect } from '@playwright/test';
import { login2, logout2 } from '../../../helpers/login2';
import { serviceLogin } from '../../../helpers/serviceLogin';
import { zoom } from '../../../helpers/zoom';

test('Servis destek görevini üstüne al ve bitir (reseller login)', async ({ page }) => {
    
console.log('===>  Servis destek görevini üstüne al ve bitir (reseller login)  <===');
    /*
  // Giriş
  await login2(page);

  // Zoom
  await zoom(page);

  await page.getByText('Servis Destek').click();
  await page.getByRole('link', { name: ' Çağrılarım' }).click();

 
  await page.getByRole('button', { name: 'Çağrı Oluştur' }).click();
  await page.waitForTimeout(1000);

  await page.locator('ot-dropdown-entry').filter({ hasText: 'Çağrı Tipi' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'TALEP' }).click();
  await page.getByText('Seçiniz...').first().click();
  await page.getByRole('option', { name: 'Pavo Indus Portal' }).click();

  await page.getByRole('textbox', { name: 'İstek özetini giriniz' }).click();
  await page.getByRole('textbox', { name: 'İstek özetini giriniz' }).fill('deneme');
  await page.getByRole('textbox', { name: 'İsteğinizi detaylı açıklayınız' }).click();
  await page.getByRole('textbox', { name: 'İsteğinizi detaylı açıklayınız' }).fill('otomasyon denemesi');

  try {
    await page.getByRole('button', { name: 'Oluştur', exact: true }).click();
    await page.waitForTimeout(1000);
    if (await page.getByText('Başarılı Servis Destek başarı').isVisible()) {
      console.log('✅ Çağrı oluşturuldu');
      await page.waitForTimeout(1000);
      await page.getByText('Başarılı Servis Destek başarı').click();
    } else {
      console.log('❌ Çağrı oluşturulamadı');
    }
  } catch (error) {
    console.log('❌ Çağrı oluşturulurken bir hata oluştu', error );
  } 
  await page.waitForTimeout(2000);
  

  await logout2(page);
*/


  // Giriş
  await serviceLogin(page);

  // Zoom
  await zoom(page);

  await page.pause();
});

