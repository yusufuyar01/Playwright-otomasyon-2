import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';
import { cihazEkle, cihazGuncelle, cihazSil, cihazUyeIseyerindenGeriAlma, cihazUyeIseyerineAtama,  } from '../../helpers/cihazIslemleri';

test('Üye İşyeri Olan Cihazları Bayiye Atama', async ({ page }) => {

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

  // Cihazı üye işyerine atama
  await cihazUyeIseyerineAtama(page);

  // ===== ADIM 4: Cihazları Bayiye  Atama =====
  
// PAVDENEME ile başlayan ve Ana Bayi değeri boş olan bir cihaz seç

  const pavdenemeRows = page.getByRole('row').filter({ hasText: /PAVDENEME/ });
  const pavdenemeCount = await pavdenemeRows.count();
  
  if (pavdenemeCount > 0) {
    // Ana Bayi sütunu boş olan PAVDENEME cihazlarını filtrele
    const bosAnaBayiPavdenemeRows: any[] = [];
    
    for (let i = 0; i < pavdenemeCount; i++) {
      const row = pavdenemeRows.nth(i);
      const anaBayiCell = row.locator('td:nth-child(4)'); // Ana Bayi sütunu
      const anaBayiText = await anaBayiCell.textContent();
      
      if (!anaBayiText || anaBayiText.trim() === '') {
        bosAnaBayiPavdenemeRows.push(row);
      }
    }
    
            if (bosAnaBayiPavdenemeRows.length > 0) {
        const firstIndex = 0;
        const pavdenemeRow = bosAnaBayiPavdenemeRows[firstIndex];
        await pavdenemeRow.getByRole('checkbox').check();
        console.log(`✅ PAVDENEME cihazı seçildi (${bosAnaBayiPavdenemeRows.length} adet boş Ana Bayi arasından ilk indeks)`);
      } else {
      console.log('❌ Ana Bayi değeri boş olan PAVDENEME cihazı bulunamadı. Otomasyon ile DENEME cihazları oluştur.');
    }
  } else {
    console.log('❌ PAVDENEME ile başlayan cihaz bulunamadı.');
  }

// PAVGUNCELLE ile başlayan ve Ana Bayi değeri boş olan bir cihaz seç

  const pavguncelleRows = page.getByRole('row').filter({ hasText: /PAVGUNCELLE/ });
  const pavguncelleCount = await pavguncelleRows.count();
  
  if (pavguncelleCount > 0) {
    // Ana Bayi sütunu boş olan PAVGUNCELLE cihazlarını filtrele
    const bosAnaBayiPavguncelleRows: any[] = [];
    
    for (let i = 0; i < pavguncelleCount; i++) {
      const row = pavguncelleRows.nth(i);
      const anaBayiCell = row.locator('td:nth-child(4)'); // Ana Bayi sütunu
      const anaBayiText = await anaBayiCell.textContent();
      
      if (!anaBayiText || anaBayiText.trim() === '') {
        bosAnaBayiPavguncelleRows.push(row);
      }
    }
    
            if (bosAnaBayiPavguncelleRows.length > 0) {
        const firstIndex = 0;
        const pavguncelleRow = bosAnaBayiPavguncelleRows[firstIndex];
        await pavguncelleRow.getByRole('checkbox').check();
        console.log(`✅ PAVGUNCELLE cihazı seçildi (${bosAnaBayiPavguncelleRows.length} adet boş Ana Bayi arasından ilk indeks)`);
      } else {
      console.log('❌ Ana Bayi değeri boş olan PAVGUNCELLE cihazı bulunamadı. Otomasyon ile eklenen DENEME cihazlarını otomasyon ile güncelle  cihazları oluştur.');
    }
  } else {
    console.log('❌ PAVGUNCELLE ile başlayan cihaz bulunamadı');
  }

// işlemler dropdownından üye işyerine ata butonuna tıkla
await page.getByRole('button', { name: 'İşlemler ' }).click();
await page.getByRole('button', { name: ' Bayiye Ata' }).click();
await page.getByRole('combobox').filter({ hasText: /^$/ }).fill('tes');
await page.getByRole('option', { name: 'Test Bayi Demo' }).click();
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


await page.getByRole('button', { name: ' Kapat' }).click();

  // cihazları üye işyerinden geri al
  await cihazUyeIseyerindenGeriAlma(page);
  await page.waitForTimeout(1000);
  
  // // Cihaz silme
  await cihazSil(page);
  await cihazSil(page);

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 