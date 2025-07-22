import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';
import { cihazEkle, cihazGuncelle, cihazSil, cihazUyeIseyerineAtama, uyeIsyeriOlanCihazlariSec } from '../../helpers/cihazIslemleri';

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

  // ===== ADIM 4: Cihazları Üye İşyerine Atama =====
  // Önce cihazları üye işyerine ata
  await cihazUyeIseyerineAtama(page);
  await page.waitForTimeout(2000);

  // ===== ADIM 5: Üye İşyeri Olan Cihaz Seçimi =====
  // Fonksiyon ile üye işyeri olan cihazları seç
  await uyeIsyeriOlanCihazlariSec(page);

  // işlemler dropdownından bayiye ata butonuna tıkla
  await page.getByRole('button', { name: 'İşlemler ' }).click();
  await page.getByRole('button', { name: ' Bayiye Ata' }).click();

  const uyarı = page.getByText('Uyarı Lütfen en az bir öğe se');
  if (await uyarı.isVisible()) {
    console.log('❌ Üye İşyeri olan DENEME veya GÜNCELLE cihazı seçilmedi');    
    console.log('🛑 Test durduruldu.');
    await page.pause(); // Testi durdur
    return; // Testi sonlandır
  }

  // Bayi seçimi ve atama işlemi (Transfer the operational reseller aktif)
  await page.getByRole('combobox').filter({ hasText: /^$/ }).click();
  await page.getByRole('combobox').filter({ hasText: /^$/ }).fill('test');
  await page.getByRole('option', { name: 'Test Bayi Demo' }).click();
  const atamaButton = page.getByRole('button', { name: 'Ata' });
  await atamaButton.click();

  // ===== ADIM 8: Başarı Kontrolü =====
  // Başarısız işlemleri göster
  try {
    // Başarısız işlemler başlığının görünür olmasını bekle
    const basarisizIslemler = page.getByRole('heading', { name: 'Başarısız İşlemler' });
    await basarisizIslemler.waitFor({ state: 'visible', timeout: 1000 });
    
    if (await basarisizIslemler.isVisible()) {
      console.log('❌ Başarısız işlemler görüntülendi');
      
      // Başarısız işlemler tablosunu oku ve konsola yazdır
      console.log('\n📋 BAŞARISIZ İŞLEMLER TABLOSU:');
      console.log('='.repeat(100));
      
      // Tablo başlıklarını yazdır
      const headers = [
        'Seri Numarası',
        'Cihaz Adı', 
        'Cihaz Modeli',
        'Cihaz Tipi',
        'Marka',
        'Error Message'
      ];
      console.log(headers.join(' | '));
      console.log('-'.repeat(100));
      
      // Tablodaki tüm satırları oku
      const rows = page.locator('.k-grid-content .k-master-row');
      const rowCount = await rows.count();
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        
        // Her satırdaki hücreleri oku
        const seriNo = await row.locator('td').nth(0).textContent() || '';
        const cihazAdi = await row.locator('td').nth(1).textContent() || '';
        const cihazModeli = await row.locator('td').nth(2).textContent() || '';
        const cihazTipi = await row.locator('td').nth(3).textContent() || '';
        const marka = await row.locator('td').nth(4).textContent() || '';
        const errorMessage = await row.locator('td').nth(5).textContent() || '';
        
        // Satırı konsola yazdır
        console.log(`${seriNo} | ${cihazAdi} | ${cihazModeli} | ${cihazTipi} | ${marka} | ${errorMessage}`);
      }
      
      console.log('='.repeat(100));
    }
    else {
      console.log('✅ Başarılı: Üye İşyeri olan cihazlar başarıyla bayiye atandı!');
    }
  } catch (error) {
    console.log('✅ Başarılı: Üye İşyeri olan cihazlar başarıyla bayiye atandı!');
  }
  
  // Cihaz silme
  await cihazSil(page);
  await cihazSil(page);

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 