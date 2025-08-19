import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';
import { uyeIsyeriEkle509Gercek, uyeIsyeriSil } from '../../../helpers/uyeIsyeriIslemleri';

test('Detay Ödeme Aracıları 1 (reseller login)', async ({ page }) => {

  console.log('===>  Detay Ödeme Aracıları 1 (reseller login)  <===');

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

  try {
    const nakit =  page.getByRole('gridcell', { name: 'Nakit' }).isVisible;
    const bkmTechpos = page.getByRole('gridcell', { name: 'BKM TechPOS' }).isVisible;
    if(nakit && bkmTechpos){
      console.log('✅ İlgili Ödeme Araciları ekli!');
    } else{
      console.log('❌ İlgili Ödeme Araciları ekli değil!');
    }
  } catch {
    console.log('❌ İlgili Ödeme Araciları kontrol edilirken bir hata oluştu!');

  }
  
  
  // ===== ADIM 5: Ödeme Aracıları Ekleme =====
  await page.getByText('Ödeme Aracıları').click();
  await page.getByRole('button', { name: '+ Yeni' }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Terminal Tipi' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Web' }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Ödeme Aracısı' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Nakit' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('4');
  await page.getByText('✓✕').nth(1).click();
  await page.getByRole('button', { name: 'Oluştur' }).click();
  await page.getByRole('button', { name: 'Oluştur' }).click();
  await page.waitForTimeout(1000);

  // Başarı mesajını kontrol et
  try {
    if (await page.getByText('Başarılı Üye İşyeri Ödeme').isVisible()) {
      await page.getByText('Başarılı Üye İşyeri Ödeme').click();
      console.log('✅ Başarılı: Ödeme Aracısı başarıyla oluşturuldu!');
    } 
  } catch (error) {
    console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }
  await page.waitForTimeout(1000);

  // ===== ADIM 6: Ödeme Aracı Güncelleme =====
  
    await page.getByLabel('Ödeme Aracıları').getByRole('button', { name: '' }).nth(2).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('5');
  await page.getByRole('button', { name: 'Güncelle' }).click();

  await page.getByRole('button', { name: 'Güncelle' }).click(); 
  await page.waitForTimeout(1000);

  // Güncelleme başarı mesajını kontrol et
  try {
    if (await page.getByText('Başarılı Üye İşyeri Ödeme').isVisible()) {
      await page.getByText('Başarılı Üye İşyeri Ödeme').click();
      console.log('✅ Başarılı: Ödeme Aracısı başarıyla güncellendi!');
    } 
  } catch (error) {
    console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }
  await page.waitForTimeout(1000);


  // ====== Parametre Eklemede hata kontrolü =======
  await page.getByRole('button', { name: '' }).first().click();
  await page.getByRole('button', { name: '+ Ekle' }).click();

  try {
    const hata = await page.getByRole('alert', { name: 'You do not have enough' });
    if (hata.isVisible()) {
      await hata.click();
      console.log('❌ Hata mesajı göründü! (Beklenen Sonuç)');
    } else {
      console.log('görünmedi');
    }
  } catch (error) {
    console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: ' Kapat' }).click();

  await page.waitForTimeout(1000);

  // ===== ADIM 7: Ödeme Aracı Silme =====
    await page.getByLabel('Ödeme Aracıları').getByRole('button', { name: '' }).nth(2).click();
  await page.getByRole('button', { name: 'Sil' }).click();
  await page.getByRole('button', { name: 'Evet' }).click();
  await page.waitForTimeout(1000);
      
  // Silme başarı mesajını kontrol et
  try {
    if (await page.getByText('Başarılı Üye İşyeri Ödeme').isVisible()) {
      await page.waitForTimeout(1000);
      await page.getByText('Başarılı Üye İşyeri Ödeme').click();
      console.log('✅ Başarılı: Ödeme Aracısı başarıyla silindi!');
    } else {
      console.log('❌ Başarı mesajı bulunamadı');
    }
  } catch (error) {
    console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }
  await page.waitForTimeout(1000);

  // ===== ADIM 8: Üye İşyeri Temizliği =====
  await uyeIsyeriSil(page, isyeriAdi);

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

});
