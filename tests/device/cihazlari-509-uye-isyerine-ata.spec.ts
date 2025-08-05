import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';
import { cihazEkle, cihazGuncelle, cihaziBayiyeAta, cihazSil, cihazUyeIseyerindenGeriAl, UyeIseyerineAta509 } from '../../helpers/cihazIslemleri';

test('Cihazları 509 Üye İşyerine Atama', async ({ page }) => {

  console.log('===>  Cihazları 509 Üye İşyerine Atama  <===');

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

  // Cihazı bayiye ekle
  await cihaziBayiyeAta(page);

  // 2. cihazı bayiye ekle
    // PAVGUNCELLE ile başlayan ilk cihazı seç
    try {
      const pavguncelleRows = page.getByRole('row').filter({ hasText: /PAVGUNCELLE/ });
      const pavguncelleFirstRow = pavguncelleRows.first();
      await pavguncelleFirstRow.getByRole('checkbox').check();
      console.log(`✅ PAVGUNCELLE cihazı seçildi. (Alt Bayiye atanacak cihaz)`);
      } catch (error) {
        console.log('❌ PAVGUNCELLE cihazı seçilemedi:', error);
      } 
      
      
    
    // işlemler dropdownından bayiye ata butonuna tıkla
    await page.getByRole('button', { name: 'İşlemler ' }).click();
    await page.getByRole('button', { name: ' Bayiye Ata' }).click();
    await page.getByRole('combobox').filter({ hasText: /^$/ }).click();
    await page.getByRole('combobox').filter({ hasText: /^$/ }).fill('tes');
    await page.getByRole('option', { name: 'TEST', exact: true }).click();
    await page.getByRole('button', { name: 'Ata' }).click();
    
    
    try {
    // Başarısız işlemler başlığının görünür olmasını bekle
    const basarisizIslemler = page.getByRole('heading', { name: 'Başarısız İşlemler' });
    await basarisizIslemler.waitFor({ state: 'visible', timeout: 1000 });
    // { state: 'visible' }
    if (await basarisizIslemler.isVisible()) {
      console.log('❌ Başarısız işlemler görüntülendi');
      
      // Tablodaki tüm satırları oku
      const rows = page.locator('.k-grid-content .k-master-row');
      const rowCount = await rows.count();
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const errorMessage = await row.locator('td').nth(5).textContent() || '';
        // Satırı konsola yazdır
        console.log(` ⚠️✅ ${errorMessage} mesajı göründü`);
      }
      
      console.log('='.repeat(100));
    }
    } catch (error) {
    
    }


  // 509 üye işyerine cihaz atama işlemi
  await UyeIseyerineAta509(page);

  // cihazları üye işyerinden geri al
  await cihazUyeIseyerindenGeriAl(page);
  
  // Cihaz silme
  await cihazSil(page);
  await cihazSil(page);

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 