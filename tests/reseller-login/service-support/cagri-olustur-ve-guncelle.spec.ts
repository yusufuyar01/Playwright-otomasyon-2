import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';


test('Çağrı Oluştur ve Güncelle (Service Support - Reseller Login)', async ({ page }) => {
  console.log('===>  Çağrı Oluştur ve Güncelle (Service Support - Reseller Login)  <===');

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

  const cagriNo = await page.getByRole('gridcell').nth(1).textContent();
  console.log('🔍 Çağrı No:', cagriNo);

  await page.getByRole('row', { name: '  ' + cagriNo + ' TALEP Pavo Indus' }).getByRole('button').first().click();
  await page.getByRole('heading', { name: 'Servis Destek Güncelle' }).waitFor({ state: 'visible', timeout: 4000  });
  await page.getByRole('textbox', { name: 'İstek özetini giriniz' }).click();
  await page.getByRole('textbox', { name: 'İstek özetini giriniz' }).fill('deneme güncelleme');
  await page.getByRole('textbox', { name: 'İsteğinizi detaylı açıklayınız' }).click();
  await page.getByRole('textbox', { name: 'İsteğinizi detaylı açıklayınız' }).fill('otomasyon denemesi güncelleme');

  
  await page.getByRole('switch').locator('span').nth(4).click();
  await page.locator('ot-dropdown-entry').filter({ hasText: 'Talep Kanalı' }).locator('span').first().click();


  await page.getByRole('option', { name: 'Sözlü' }).click();
  await page.locator('div').filter({ hasText: /^Talep Sahibi$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Talep Sahibi$/ }).getByRole('textbox').fill('deneme');

  try {
    await page.getByRole('button', { name: 'Güncelle' }).click();
    await page.getByText('Başarılı Servis Destek başarı').waitFor({ state: 'visible', timeout: 2000  });
    if (await page.getByText('Başarılı Servis Destek başarı').isVisible()) {  
      console.log('✅ Çağrı güncellendi');
      await page.waitForTimeout(1000);
      await page.getByText('Başarılı Servis Destek başarı').click();
    } else {
      console.log('❌ Çağrı güncellenemedi');
    }
  } catch (error) {
    console.log('❌ Çağrı güncellenirken bir hata oluştu', error );
  }



  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();
});
