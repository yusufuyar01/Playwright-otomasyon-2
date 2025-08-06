import { test, expect } from '@playwright/test';
import { login } from '../../../helpers/login';
import { zoom } from '../../../helpers/zoom';
import { cihazEkle, cihazGuncelle, cihazSil, cihazUyeIseyerindenGeriAl, cihazUyeIseyerineAta } from '../../../helpers/cihazIslemleri';

test('Üye İşyerine Atanmış Cihazları Üye İşyerine Ata', async ({ page }) => {

  console.log('===>  Üye İşyerine Atanmış Cihazları Üye İşyerine Ata  <===');

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
 await cihazEkle(page);


//güncelle
await cihazGuncelle(page);

// cihazları üye işyerine ata
await cihazUyeIseyerineAta(page);

await page.waitForTimeout(1000);

// cihazları üye işyerine ata
// PAVDENEME ile başlayan ilk cihazı seç
try {
 const pavdenemeRows = page.getByRole('row').filter({ hasText: /PAVDENEME/ });
 const pavDenemeFirstRow = pavdenemeRows.first();
 await pavDenemeFirstRow.getByRole('checkbox').check();
 console.log(`✅ PAVDENEME cihazı seçildi. (Üye işyerine atanacak cihaz)`);
 } catch (error) {
   console.log('❌ PAVDENEME cihazı seçilemedi:', error);
 } 
 
 // PAVGUNCELLE ile başlayan ilk cihazı seç  
 try {
   const pavguncelleRows = page.getByRole('row').filter({ hasText: /PAVGUNCELLE/ });
   const pavguncelleFirstRow = pavguncelleRows.first();
   await pavguncelleFirstRow.getByRole('checkbox').check();
   console.log(`✅ PAVGUNCELLE cihazı seçildi. (Üye işyerine atanacak cihaz)`);
 } catch (error) {
   console.log('❌ PAVGUNCELLE cihazı seçilemedi:', error);
 } 
 // işlemler dropdownından üye işyerine ata butonuna tıkla
 await page.getByRole('button', { name: 'İşlemler ' }).click();
 await page.getByRole('button', { name: ' Üye İşyerine Ata' }).click();



 
 await page.waitForTimeout(1000);  

 await page.getByRole('dialog').locator('input').fill('er');
 await page.getByRole('option', { name: 'Erdal Bakkal-' }).click();
 await page.locator('ot-data-entry-template').filter({ hasText: 'Şube' }).getByLabel('Select').click();
 await page.getByRole('option', { name: 'Central Branch' }).click();
 await page.locator('ot-data-entry-template').filter({ hasText: 'PF' }).getByLabel('Select').click();
 await page.getByRole('option', { name: 'No PF' }).click();
 await page.locator('ot-data-entry-template').filter({ hasText: 'Tebliğ Tipi' }).getByLabel('Select').click();
 await page.getByRole('option', { name: '507' }).click();
 await page.locator('ot-data-entry-template').filter({ hasText: 'Environment' }).getByLabel('Select').click();
 await page.getByRole('option', { name: 'Demo' }).click();
 await page.getByRole('button', { name: 'Ata' }).click();


 
try {
 // Başarısız işlemler başlığının görünür olmasını bekle
 const basarisizIslemler = page.getByRole('heading', { name: 'Başarısız İşlemler' });
 await basarisizIslemler.waitFor({ state: 'visible', timeout: 1000 });
 // { state: 'visible' }
 if (await basarisizIslemler.isVisible()) {
   console.log('❌ Başarısız işlemler görüntülendi');
   
   // Tablo başlıklarını yazdır
   const headers = [
     'Seri Numarası',
     'Cihaz Adı', 
     'Cihaz Modeli',
     'Cihaz Tipi',
     'Marka',
     'Error Message'
   ];
   console.log('-'.repeat(100));
   
   // Tablodaki tüm satırları oku
   const rows = page.locator('.k-grid-content .k-master-row');
   const rowCount = await rows.count();
   
   for (let i = 0; i < rowCount; i++) {
     const row = rows.nth(i);
     const errorMessage = await row.locator('td').nth(5).textContent() || '';
     // Satırı konsola yazdır
     console.log(` ✅ ${errorMessage} mesajı göründü`);
   }
   
   console.log('='.repeat(100));
 }
 } catch (error) {
 console.log('❌ Başarısız işlemler Gözükmedi');
 }

 

 await page.waitForTimeout(1000);

 await page.getByRole('button', { name: ' Kapat' }).click();



 // cihazları üye işyerinden geri al
 await cihazUyeIseyerindenGeriAl(page);


 // Cihaz silme
 await cihazSil(page);
 await cihazSil(page);





 // // Test sonunda ekranın kapanmasını engellemek için pause
 await page.pause();

}); 