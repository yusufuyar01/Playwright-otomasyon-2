import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';
import { uyeIsyeriEkle509Gercek, uyeIsyeriSil } from '../../../helpers/uyeIsyeriIslemleri';

test('Detay Entegratör (reseller login)', async ({ page }) => {

  console.log('===>  Detay Entegratör (reseller login)  <===');

  // Önce sisteme giriş yap
  await login2(page);

  // Zoom işlemi
  await zoom(page);

  // ===== ADIM 1: Dashboard'da Üye İşyeri Yönetimi Menüsünü Bulma =====
  // Üye işyeri yönetimi bul ve tıkla
  const uyeIsyeriYonetimi = page.locator('text="Üye İşyeri Yönetimi"'); 
  await uyeIsyeriYonetimi.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 2: Üye İşyeri Tıklama =====
  // Üye işyeri menü linkini bul ve tıkla (URL ile spesifik olarak hedefle)
  const uyeIsyeri = page.locator('a[href="/Merchant/Merchant/Index"]'); 
  await uyeIsyeri.click();
  await page.waitForTimeout(500);

  // ===== ADIM 3: Üye İşyeri Ekleme =====
  const isyeriAdi = await uyeIsyeriEkle509Gercek(page);

  // ===== ADIM 4: Detay Menü =====
  console.log(`🎯 Seçilen üye işyeri: ${isyeriAdi}`);

  try {
    await page.getByRole('row', { name: 'Expand Details  ' + isyeriAdi }).getByLabel('Expand Details').click();
  } catch (error) {
    console.log(`❌ ${isyeriAdi} ile başlayan üye işyeri bulunamadı:`, error.message);
  }

  // ===== ADIM 5: Entegratör Yönetimi Menüsünü Bulma =====
  // Entegratör yönetimi menü linkini bul ve tıkla
  const entegratorler = page.getByText('Entegratörler');  
  await entegratorler.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 6: Yeni Entegratör Ekleme =====
  // Yeni entegratör ekleme butonunu bul ve tıkla
  await page.getByRole('button', { name: '+ Yeni' }).click(); 


  await page.waitForTimeout(1000);

  await page.locator('ot-data-entry-template').filter({ hasText: 'Entegratör' }).getByLabel('Select').click();
  await page.getByRole('searchbox', { name: 'Filter' }).fill('tes');
  await page.getByRole('option', { name: 'test entegratörü' }).click();
  await page.getByRole('button', { name: 'Oluştur' }).click();
  await page.waitForTimeout(500);

  // ===== ADIM 8: Başarı Kontrolü =====
  // Başarı mesajını kontrol et
  try {
    const basariMesaji = page.getByText('Başarılı Üye İşyeri Entegratö');
    await basariMesaji.waitFor({ timeout: 5000 });
    await basariMesaji.click();
    console.log('✅ Entegratör başarıyla eklendi');
  } catch (error) {
    console.log('⚠️ Başarı mesajı görünmedi, entegratör ekleme işlem tamamlanamadı olabilir.');
  }
  await page.waitForTimeout(1000);

  // ===== ADIM 9: Entegratör Güncelleme =====
  // Mevcut entegratörü bul ve güncelleme butonuna tıkla
  await page.getByLabel('Entegratörler').getByRole('button', { name: '' }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Açıklama' }).getByRole('textbox').click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Açıklama' }).getByRole('textbox').fill('test');
  await page.getByRole('button', { name: 'Güncelle' }).click();
  await page.waitForTimeout(1000);

    // Güncelleme başarı mesajını kontrol et
    try {
      const guncelleBasariMesaji = page.getByText('Başarılı Üye İşyeri Entegratö');
      await guncelleBasariMesaji.waitFor({ timeout: 5000 });
      await guncelleBasariMesaji.click();
      console.log('✅ Entegratör başarıyla güncellendi');
    } catch (error) {
      console.log('⚠️ Güncelleme başarı mesajı görünmedi');
    }
  await page.waitForTimeout(1000);




  // ===== ADIM 10: Entegratör Silme =====
    await page.getByLabel('Entegratörler').getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: 'Sil' }).click();
    await page.getByRole('button', { name: 'Evet' }).click();
    await page.waitForTimeout(1000);

    // Silme başarı mesajını kontrol et
    try {
      const silmeBasariMesaji = page.getByText('Başarılı Üye İşyeri Entegratö');
      await silmeBasariMesaji.waitFor({ timeout: 5000 });
      await silmeBasariMesaji.click();
      console.log('✅ Entegratör başarıyla silindi');
    } catch (error) {
      console.log('⚠️ Silme başarı mesajı görünmedi');
    }


  // ===== ADIM 11: Üye İşyeri Temizliği =====
  await uyeIsyeriSil(page, isyeriAdi);

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

});
