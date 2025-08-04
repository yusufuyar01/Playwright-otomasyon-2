import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';
import { cihazEkle, cihazGuncelle, cihazlariBayiyeAta, cihazlariBayiyeAta2, cihazlariBayiyeAta3, cihazSil, cihazUyeIseyerindenGeriAl } from '../../helpers/cihazIslemleri';

test('Cihazları 507 Üye İşyerine Atama (E-Belge Var)', async ({ page }) => {

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

  // 507 üye işyerine cihaz atama işlemi (E-Belge ayarları olan)
   // PAVDENEME ile başlayan ilk cihazı seç
   try {
    const pavdenemeRows = page.getByRole('row').filter({ hasText: /PAVDENEME/ });
    const pavDenemeFirstRow = pavdenemeRows.first();
    await pavDenemeFirstRow.getByRole('checkbox').check();
    console.log(`✅ PAVDENEME cihazı seçildi. (507 Üye işyerine atanacak cihaz - E-Belge Var)`);
    } catch (error) {
      console.log('❌ PAVDENEME cihazı seçilemedi:', error);
    } 
    
    // PAVGUNCELLE ile başlayan ilk cihazı seç  
    try {
      const pavguncelleRows = page.getByRole('row').filter({ hasText: /PAVGUNCELLE/ });
      const pavguncelleFirstRow = pavguncelleRows.first();
      await pavguncelleFirstRow.getByRole('checkbox').check();
      console.log(`✅ PAVGUNCELLE cihazı seçildi. (507 Üye işyerine atanacak cihaz - E-Belge Var)`);
    } catch (error) {
      console.log('❌ PAVGUNCELLE cihazı seçilemedi:', error);
    } 
    // işlemler dropdownından üye işyerine ata butonuna tıkla
    await page.getByRole('button', { name: 'İşlemler  ' }).click();
    await page.getByRole('button', { name: '  Üye İşyerine Ata' }).click();
  
    await page.waitForTimeout(1000);  
  
    // E-Belge ayarları olan üye işyeri seçimi
    await page.locator('kendo-searchbar').getByRole('combobox').fill('4548992552');
    await page.getByRole('option').first().click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'Şube' }).getByLabel('Select').click();
    await page.getByRole('option', { name: 'Central Branch' }).click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'PF' }).getByLabel('Select').click();
    await page.getByRole('option', { name: 'No PF'}).click(); // E-Belge ayarları için PF seçimi
    await page.locator('ot-data-entry-template').filter({ hasText: 'Tebliğ Tipi' }).getByLabel('Select').click();
    await page.getByRole('option', { name: '507' }).click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'Environment' }).getByLabel('Select').click();
    await page.getByRole('option', { name: 'Demo' }).click();
    await page.getByRole('button', { name: 'Ata' }).click();
  
    await page.waitForTimeout(1000);

   // cihazları üye işyerinden geri al
   await cihazUyeIseyerindenGeriAl(page);
  
  // Cihaz silme
  await cihazSil(page);
  await cihazSil(page);

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 