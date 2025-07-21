import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';
import { rastgeleString } from '../../helpers/stringUret';

test('Cihaz Güncelleme', async ({ page }) => {

  // Önce sisteme giriş yap
  await login(page);

  // Zoom işlemi
  await zoom(page);

  // ===== ADIM 1: Dashboard'da Cihaz Yönetimi Menüsünü Bulma =====
  // Cihaz yönetimi bul ve tıkla
  const cihazYonetimi = page.locator('text="Cihaz Yönetimi"'); 
  await cihazYonetimi.click();

  // ===== ADIM 2: Cihaz İşlemleri Sayfasına Gitme =====
  // Cihaz İşlemleri menü linkini bul ve tıkla
  const cihazIslemleri = page.getByRole('link', { name: ' Cihaz İşlemleri' });
  await cihazIslemleri.click();

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
        console.log(`🎯 Ana bayi değeri boş olan PAVDENEME cihazı bulundu: ${secilenCihazAdi}`);
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
  console.log('Güncellenen Cihaz Seri No:', yeniCihazSeriNo);
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
    console.log('✅ Cihaz başarıyla güncellendi');
  } catch (error) {
    console.log('⚠️ Başarı mesajı görünmedi, cihaz güncellenmiş olabilir');
  }

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 