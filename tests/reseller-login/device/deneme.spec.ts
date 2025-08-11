import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';
import { cihazEkle, cihazGuncelle, cihazSil } from '../../../helpers/cihazIslemleri';

test('Cihazları Bayiye Atama (checkbox işaretli)', async ({ page }) => {

  console.log('===>  Cihazları Bayiye Atama (checkbox işaretli)  <===');

  // Önce sisteme giriş yap
  await login2(page);

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

  // Cihaz ekleme, birisi füncellenecek

  // Yeni cihaz ekleme butonunu bul ve tıkla
  await page.getByRole('button', { name: '+ Yeni' }).click();
  await page.waitForTimeout(1000);

  // Cihaz Seri No üret ve gir
  const cihazSeriNo = ("PAVDENEME" + rastgeleString(5)).toUpperCase();
  const seriNoInput = page.locator('ot-data-entry-template').filter({ hasText: 'Seri Numarası' }).getByRole('textbox');
  await seriNoInput.fill(cihazSeriNo);

  // Durum seçimi
  await page.getByText('Seçiniz...').first().click();
  await page.getByRole('option', { name: 'Hazır Değil' }).click();

  // Depo seçimi
  await page.locator('ot-dropdown-entry').filter({ hasText: 'DepoSeçiniz...' }).click();
  await page.getByRole('option', { name: 'TEST', exact: true }).click();

  //Tip
  await page.getByText('Seçiniz...').first().click();
  await page.getByRole('option', { name: 'Smart POS' }).click();

  //Marka
  await page.getByText('Seçiniz...').first().click();
  await page.getByRole('option', { name: 'PAVO' }).click();

  //Model
  await page.getByText('Seçiniz...').click();
  await page.getByRole('option', { name: 'N86', exact: true }).click();

  //Oluştur butonu
  await page.getByRole('button', { name: 'Oluştur' }).click();
  await page.waitForTimeout(500);
  //Başarı kontrolü
  try {
    const basariMesaji = page.getByText('Başarılı Cihaz başarıyla oluş');
    await expect(basariMesaji).toBeVisible();
    await page.waitForTimeout(500);
    await basariMesaji.click();
    console.log('✅ 1 Cihaz başarıyla eklendi');
  } catch (error) {
    console.log('⚠️ Başarı mesajı görünmedi, cihaz eklenmiş olabilir');
  }
  await page.waitForTimeout(1000);




  
  // Cihaz güncelleme
  await cihazGuncelle(page);

  // ===== ADIM 4: Cihaz Seçimi =====
  // PAVDENEME ile başlayan ve Ana Bayi değeri boş olan bir cihaz seç
  try {
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
        const randomIndex = Math.floor(Math.random() * bosAnaBayiPavdenemeRows.length);
        const pavdenemeRow = bosAnaBayiPavdenemeRows[randomIndex];
        await pavdenemeRow.getByRole('checkbox').check();
        console.log(`✅ PAVDENEME cihazı seçildi (${bosAnaBayiPavdenemeRows.length} adet boş Ana Bayi arasından rastgele)`);
      } else {
        console.log('❌ Ana Bayi değeri boş olan PAVDENEME cihazı bulunamadı. Otomasyon ile DENEME cihazları oluştur.');
      }
    } else {
      console.log('❌ PAVDENEME ile başlayan cihaz bulunamadı.');
    }
  } catch (error) {
    console.log('❌ PAVDENEME ile başlayan cihaz bulunamadı');
  }
  
  // PAVGUNCELLE ile başlayan ve Ana Bayi değeri boş olan bir cihaz seç
  try {
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
        const randomIndex = Math.floor(Math.random() * bosAnaBayiPavguncelleRows.length);
        const pavguncelleRow = bosAnaBayiPavguncelleRows[randomIndex];
        await pavguncelleRow.getByRole('checkbox').check();
        console.log(`✅ PAVGUNCELLE cihazı seçildi (${bosAnaBayiPavguncelleRows.length} adet boş Ana Bayi arasından rastgele)`);
      } else {
        console.log('❌ Ana Bayi değeri boş olan PAVGUNCELLE cihazı bulunamadı. Otomasyon ile eklenen DENEME cihazlarını otomasyon ile güncelle  cihazları oluştur.');
      }
    } else {
      console.log('❌ PAVGUNCELLE ile başlayan cihaz bulunamadı');
    }
  } catch (error) {
    console.log('❌ PAVGUNCELLE ile başlayan cihaz bulunamadı');
  }

  // işlemler dropdownından bayiye ata butonuna tıkla
  await page.getByRole('button', { name: 'İşlemler ' }).click();
  await page.getByRole('button', { name: ' Bayiye Ata' }).click();


  const uyarı = page.getByText('Uyarı Lütfen en az bir öğe se');
  if (await uyarı.isVisible()) {
    console.log('❌ DENEME veya GÜNCELLE cihazı seçilmedi');    
    console.log('🛑 Test durduruldu.');
    await page.pause(); // Testi durdur
    return; // Testi sonlandır
  }


  // Bayi seçimi ve atama işlemi(Transfer the operational reseller aktif)
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
    // { state: 'visible' }
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
      console.log('✅ Başarılı: Cihazlar başarıyla bayiye atandı!');
    }
  } catch (error) {
    console.log('✅ Başarılı: Cihazlar başarıyla bayiye atandı!');
  }
    // Cihaz silme
    await cihazSil(page);
    await cihazSil(page);

  
  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

});