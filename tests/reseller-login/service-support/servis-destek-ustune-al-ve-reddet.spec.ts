import { test, expect, Page } from '@playwright/test';
import { login2, logout2 } from '../../../helpers/login2';
import { serviceLogin, serviceLogout } from '../../../helpers/serviceLogin';
import { zoom } from '../../../helpers/zoom';

async function Generic_Exception(page: Page) {
  
    console.log('❌ Generic Exception hatası oluştu, "işi tamamla" butonuna yeniden tıklanılacak');
    await page.getByText('Unexpected Generic Exception').click();
    await page.getByRole('button', { name: 'Reddet' }).click();
    if (await page.getByText('Unexpected Generic Exception').isVisible()) {
    Generic_Exception(page);
    }
}

test('Servis destek görevini üstüne al ve reddet (reseller login)', async ({ page }) => {
    
console.log('===>  Servis destek görevini üstüne al ve reddet (reseller login)  <===');
    
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
    await page.waitForTimeout(2000);
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

  const talepNo = await page.locator('tr:nth-child(1) > td:nth-child(2)').textContent();
  console.log('🔍 Talep No:', talepNo);
  await page.waitForTimeout(20000);
  
  await logout2(page);

  // Giriş
  await serviceLogin(page);

  // Zoom
  await zoom(page);
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Bekleyen Görevler' }).click();

  try {
    await page.getByRole('row', { name: ' ' + talepNo + ' TALEP Pavo Indus Portal' }).getByRole('button').click();
  } catch (error) {
    console.log('❌ Aranan talep Numarasına göre satır bulunamadı.', error);
  }
  await page.waitForTimeout(1000);

  try { 
  await page.getByRole('button', { name: 'İşi Üzerine Al' }).click();
  await page.waitForTimeout(1000);
  if (await page.getByText('Başarılı Service Support baş').isVisible()) {
    console.log('✅ İş üzerine alındı');
    await page.waitForTimeout(1000);
    await page.getByText('Başarılı Service Support baş').click();
  } else {
    console.log('❌ İş üzerine alınamadı');
  }
  } catch (error) {
    console.log('❌ İşi üzerine alınırken bir hata oluştu', error);
  }

  await page.getByText('Servis Destek', { exact: true }).click();
  await page.getByRole('link', { name: ' Görevlerim' }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('spinbutton', { name: 'ID Filter' }).click();
  await page.getByRole('spinbutton', { name: 'ID Filter' }).fill(talepNo);
  await page.waitForTimeout(1000);
  await page.getByRole('spinbutton', { name: 'ID Filter' }).fill('0');
  await page.waitForTimeout(1000);
  await page.getByRole('spinbutton', { name: 'ID Filter' }).fill(talepNo);

  try {
  await page.getByRole('row', { name: '  ' + talepNo + ' TALEP Pavo Indus' }).getByRole('button').nth(1).click();
  } catch (error) {
    console.log('❌ Aranan talep Numarasına göre satır bulunamadı', error);
  }
  await page.waitForTimeout(1000);


  await page.getByRole('button', { name: 'Reddet' }).click();
  await page.waitForTimeout(1000);
  await page.getByText('Seçiniz...').click();
  await page.getByRole('option', { name: 'Yapılmayacak' }).click();
  await page.waitForTimeout(1000);

  try {
  await page.getByRole('button', { name: 'Reddet' }).click();
  await page.waitForTimeout(1000);
  if (await page.getByText('Unexpected Generic Exception').isVisible()) {
    Generic_Exception(page);
  } else {}
  await page.waitForTimeout(1000);
  if (await page.getByText('Başarılı Servis Destek başarı').isVisible()) {
    console.log('✅ İş reddedildi');
    await page.waitForTimeout(1000);
    await page.getByText('Başarılı Servis Destek başarı').click();
  } else {
    console.log('❌ İş reddedilemedi');
  }
  } catch (error) {
    console.log('❌ İşi reddetmekte bir hata oluştu', error);
  }
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: ' Tüm Çağrılar' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('spinbutton', { name: 'Id Filter' }).click();
  await page.getByRole('spinbutton', { name: 'Id Filter' }).fill(talepNo);
  await page.waitForTimeout(1000);

  if (await page.getByRole('gridcell', { name: talepNo }).isVisible()) {
    console.log('✅ talepNo talep Numaralı çağrı tüm çağrılar ekranında bulundu');
    await page.getByRole('gridcell', { name: talepNo }).click();
  } else {
    console.log('❌ ' + talepNo + ' talep Numarası tüm çağrılar ekranında bulunamadı');
  }

//   await serviceLogout(page);

  await page.pause();
});
