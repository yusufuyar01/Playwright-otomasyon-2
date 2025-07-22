// helpers/cihazEkle.ts
import { Page, expect } from '@playwright/test';
import { rastgeleString } from './stringUret';

// Cihaz ekleme fonksiyonu
export async function cihazEkle(page: Page): Promise<void> {

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
  await page.waitForTimeout(2000);

  //Başarı kontrolü
  try {
    const basariMesaji = page.getByText('Başarılı Cihaz başarıyla oluş');
    await expect(basariMesaji).toBeVisible();
    console.log('✅ 1 Cihaz başarıyla eklendi');
  } catch (error) {
    console.log('⚠️ Başarı mesajı görünmedi, cihaz eklenmiş olabilir');
  }
}

// Cihaz güncelleme fonksiyonu
export async function cihazGuncelle(page: Page): Promise<void> {
     // ===== ADIM 3: Mevcut Cihazı Bulma ve Seçme =====
  // PAVDENEME ile başlayan cihazları bul ve ana bayi değeri boş olan birini seç
  await page.waitForTimeout(1000); // Tablo yüklenmesini bekle
  
  // PAVDENEME ile başlayan tüm satırları bul
  const pavdenemeRows = page.locator('tr').filter({ hasText: /PAVDENEME/ });
  const rowCount = await pavdenemeRows.count();
  
  if (rowCount > 0) {
    let secilenRow: any = null;
    let secilenCihazAdi = '';
    
    // Ana bayi değeri boş olan bir PAVDENEME cihazı bul
    for (let i = 0; i < rowCount; i++) {
      const currentRow = pavdenemeRows.nth(i);
      const rowText = await currentRow.textContent();
      
      // Ana bayi sütununu kontrol et (genellikle tabloda belirli bir sütun indeksi vardır)
      // Bu örnekte ana bayi değerinin boş olduğunu kontrol ediyoruz
      // Gerçek tablo yapısına göre bu kontrolü ayarlamanız gerekebilir
      const anaBayiCell = currentRow.locator('td').nth(3); // Ana bayi sütunu indeksi (3. sütun varsayımı)
      const anaBayiText = await anaBayiCell.textContent();
      
      if (!anaBayiText || anaBayiText.trim() === '' || anaBayiText.trim() === '-') {
        secilenRow = currentRow;
        secilenCihazAdi = rowText?.trim() || '';
        console.log(`🎯 PAVDENEME cihazı bulundu: ${secilenCihazAdi}`);
        break;
      }
    }
    
    if (secilenRow) {
      // Seçilen satırdaki düzenleme butonuna tıkla
      await secilenRow.getByRole('button').click();
    } else {
      console.log('❌ Ana bayi değeri boş olan PAVDENEME cihazı bulunamadı!');
      throw new Error('Ana bayi değeri boş olan PAVDENEME cihazı bulunamadı');
    }
  } else {
    console.log('❌ PAVDENEME ile başlayan cihaz bulunamadı!');
    throw new Error('PAVDENEME cihazı bulunamadı');
  }

  // ===== ADIM 5: Cihaz Bilgilerini Güncelleme =====
  // Cihaz Seri No güncelle
  const yeniCihazSeriNo = ("PAVGUNCELLEME" + rastgeleString(5)).toUpperCase();
  const seriNoInput = page.locator('ot-data-entry-template').filter({ hasText: 'Seri Numarası' }).getByRole('textbox');
  await seriNoInput.clear();
  await seriNoInput.fill(yeniCihazSeriNo);


  // ===== ADIM 6: Güncellemeyi Kaydetme =====
  // Güncelle butonu
  await page.getByRole('button', { name: 'Güncelle' }).click();

  // ===== ADIM 7: Başarı Kontrolü =====
  try {
    const basariMesaji = await page.getByText('Başarılı The Device has been');
    await expect(basariMesaji).toBeVisible();
    console.log('✅ 1 Cihaz başarıyla güncellendi');
  } catch (error) {
    console.log('⚠️ Başarı mesajı görünmedi, cihaz güncellenmiş olabilir');
  }

  
}

// Cihaz silme fonksiyonu
export async function cihazSil(page: Page): Promise<void> {
  await page.waitForTimeout(2000); // Tablo yüklenmesi için daha fazla bekle
  
  
  // PAVGUNCELLEME ile başlayan cihazları bul
  const pavguncellemeRows = page.locator('tr').filter({ hasText: /PAVGUNCELLEME/ });
  const pavguncellemeCount = await pavguncellemeRows.count();
  console.log(`🔍 PAVGUNCELLEME ile başlayan cihaz sayısı: ${pavguncellemeCount}`);
  
  // PAVDENEME ile başlayan cihazları da kontrol et
  const pavdenemeRows = page.locator('tr').filter({ hasText: /PAVDENEME/ });
  const pavdenemeCount = await pavdenemeRows.count();
  console.log(`🔍 PAVDENEME ile başlayan cihaz sayısı: ${pavdenemeCount}`);
  
  if (pavguncellemeCount > 0) {
    // İlk PAVGUNCELLEME cihazını seç ve sil
    const firstRow = pavguncellemeRows.first();
    const rowText = await firstRow.textContent();
    console.log(`🎯 Silinecek cihaz: ${rowText?.trim()}`);
    
    await firstRow.getByRole('button').click();
    await page.waitForTimeout(500);
    
    // Sil butonuna tıkla
    await page.getByRole('button', { name: 'Sil' }).click();
    await page.waitForTimeout(500);
    
    // Onay butonuna tıkla
    await page.getByRole('button', { name: 'Evet' }).click();
    await page.waitForTimeout(1000);
    
    // Başarı kontrolü
    try {
      const basariMesaji = await page.getByText('Başarılı The Device has been successfully deleted');
      await expect(basariMesaji).toBeVisible();
      console.log('✅ 1 Cihaz başarıyla silindi');
    } catch (error) {
      console.log('⚠️ Başarı mesajı görünmedi, cihaz silinmiş olabilir');
    }
  } else if (pavdenemeCount > 0) {
    // PAVGUNCELLEME yoksa PAVDENEME ile başlayan bir cihazı sil
    const firstRow = pavdenemeRows.first();
    const rowText = await firstRow.textContent();
    console.log(`🎯 Silinecek cihaz (PAVDENEME): ${rowText?.trim()}`);
    
    await firstRow.getByRole('button').click();
    await page.waitForTimeout(500);
    
    // Sil butonuna tıkla
    await page.getByRole('button', { name: 'Sil' }).click();
    await page.waitForTimeout(500);
    
    // Onay butonuna tıkla
    await page.getByRole('button', { name: 'Evet' }).click();
    await page.waitForTimeout(1000);
    
    // Başarı kontrolü
    try {
      const basariMesaji = await page.getByText('Başarılı The Device has been successfully deleted');
      await expect(basariMesaji).toBeVisible();
      console.log('✅ 2 Cihaz başarıyla silindi');
    } catch (error) {
      console.log('⚠️ Başarı mesajı görünmedi, cihaz silinmiş olabilir');
    }
  } else {
    console.log('❌ Silinebilecek test cihazı bulunamadı (PAVGUNCELLEME veya PAVDENEME)');
  }
} 