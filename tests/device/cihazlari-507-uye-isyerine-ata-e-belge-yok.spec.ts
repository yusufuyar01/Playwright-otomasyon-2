import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';
import { cihazEkle, cihazGuncelle, cihazlariBayidenGeriAl, cihazlariBayiyeAta, cihazlariBayiyeAta2, cihazlariBayiyeAta3, cihazSil, cihazUyeIseyerindenGeriAl, UyeIseyerineAta507 } from '../../helpers/cihazIslemleri';

test('Cihazları 507 Üye İşyerine Atama', async ({ page }) => {

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

  // 507 üye işyerine cihaz atama işlemi
   // PAVDENEME ile başlayan ilk cihazı seç
   try {
    const pavdenemeRows = page.getByRole('row').filter({ hasText: /PAVDENEME/ });
    const pavDenemeFirstRow = pavdenemeRows.first();
    await pavDenemeFirstRow.getByRole('checkbox').check();
    console.log(`✅ PAVDENEME cihazı seçildi. (507 Üye işyerine atanacak cihaz)`);
    } catch (error) {
      console.log('❌ PAVDENEME cihazı seçilemedi:', error);
    } 
    
    // PAVGUNCELLE ile başlayan ilk cihazı seç  
    try {
      const pavguncelleRows = page.getByRole('row').filter({ hasText: /PAVGUNCELLE/ });
      const pavguncelleFirstRow = pavguncelleRows.first();
      await pavguncelleFirstRow.getByRole('checkbox').check();
      console.log(`✅ PAVGUNCELLE cihazı seçildi. (507 Üye işyerine atanacak cihaz)`);
    } catch (error) {
      console.log('❌ PAVGUNCELLE cihazı seçilemedi:', error);
    } 
    // işlemler dropdownından üye işyerine ata butonuna tıkla
    await page.getByRole('button', { name: 'İşlemler ' }).click();
    await page.getByRole('button', { name: ' Üye İşyerine Ata' }).click();
  
    await page.waitForTimeout(1000);  
  
    await page.locator('kendo-searchbar').getByRole('combobox').fill('5968910304');;
    await page.getByRole('option').first().click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'Şube' }).getByLabel('Select').click();
    await page.getByRole('option', { name: 'Merkez Şube' }).click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'PF' }).getByLabel('Select').click();
    await page.getByRole('option', { name: 'No PF' }).click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'Tebliğ Tipi' }).getByLabel('Select').click();
    await page.getByRole('option', { name: '507' }).click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'Environment' }).getByLabel('Select').click();
    await page.getByRole('option', { name: 'Demo' }).click();
    await page.getByRole('button', { name: 'Ata' }).click();
  
    await page.waitForTimeout(1000);

     


    
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
      // Error Message sütunu 6. sütun (index 5)
      const errorMessage = await row.locator('td').nth(5).textContent() || '';
      // Sadece anlamlı error mesajlarını göster (boş olmayan ve "TEST" olmayan)
      if (errorMessage.trim() !== '' && errorMessage.trim() !== 'TEST') {
        console.log(` ⚠️✅ ${errorMessage.trim()} mesajı göründü`);
      }
    }
    
    console.log('='.repeat(100));
  }
  } catch (error) {
  
  }
     await page.waitForTimeout(1000);  
   
     // Modal'ı daha güvenilir şekilde kapat
     try {
       const kapatButton = page.getByRole('button', { name: /Kapat/ });
       await kapatButton.waitFor({ state: 'visible', timeout: 5000 });
       await kapatButton.click();
       
       // Modal'ın tamamen kapanmasını bekle
       await page.waitForTimeout(1000);
       
       // Modal'ın kapandığını doğrula
       const modal = page.locator('modal-container[role="dialog"]');
       await modal.waitFor({ state: 'hidden', timeout: 5000 });
       
       console.log('✅ Modal başarıyla kapatıldı');
     } catch (error) {
       console.log('⚠️ Modal kapatma hatası:', error);
       // Alternatif kapatma yöntemi
       try {
         await page.keyboard.press('Escape');
         await page.waitForTimeout(1000);
         console.log('✅ Modal Escape tuşu ile kapatıldı');
       } catch (escapeError) {
         console.log('❌ Modal kapatılamadı:', escapeError);
       }
     }

    
  

  // cihazları üye işyerinden geri al
  await cihazUyeIseyerindenGeriAl(page);

  // İkinci modal'ı da güvenilir şekilde kapat
  try {
    const kapatButton2 = page.getByRole('button', { name: /Kapat/ });
    await kapatButton2.waitFor({ state: 'visible', timeout: 5000 });
    await kapatButton2.click();
    
    // Modal'ın tamamen kapanmasını bekle
    await page.waitForTimeout(1000);
    
    // Modal'ın kapandığını doğrula
    const modal2 = page.locator('modal-container[role="dialog"]');
    await modal2.waitFor({ state: 'hidden', timeout: 5000 });
    
    console.log('✅ İkinci modal başarıyla kapatıldı');
  } catch (error) {
    console.log('⚠️ İkinci modal kapatma hatası:', error);
    // Alternatif kapatma yöntemi
    try {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
      console.log('✅ İkinci modal Escape tuşu ile kapatıldı');
    } catch (escapeError) {
      console.log('❌ İkinci modal kapatılamadı:', escapeError);
    }
  }

  
  // Cihaz silme
  await cihazSil(page);
  await cihazSil(page);

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 