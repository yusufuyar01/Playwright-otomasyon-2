import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { rastgeleString } from '../../../helpers/stringUret';
import { zoom } from '../../../helpers/zoom';
import { uyeIsyeriEkle509Gercek, uyeIsyeriSil } from '../../../helpers/uyeIsyeriIslemleri';

test('Detay E-Belge Ayarları', async ({ page }) => {

  console.log('===>  Detay E-Belge Ayarları  <===');

  // Önce sisteme giriş yap (reseller login)
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


  // "E-Belge" tıklama 
  const eBelgeAyarlari = page.getByText('E-Belge Ayarları');
  await eBelgeAyarlari.click();

  // "Yeni" butonu
  const yeniButton = page.getByRole('button', { name: '+ Yeni' });
  await yeniButton.click();


  // ===== ADIM 4: E-Belge Ekleme =====
  try {
    // Entegratör eklenmemişse çıkan hatayı bekle (3 saniye timeout)
    const entegratorHatasi = page.getByText('Üye işyeri için entegratör');
    await entegratorHatasi.waitFor({ timeout: 2000 });
    console.log('⚠️  Üye işyeri için entegratör bulunamadı! Entegratör ekleniyor...');
    
  } catch (error) {
    console.log('❌ Entegratör mesajı görünmedi, E-Belge Ayarları (Beklenmeyen durum)');
    
  }
  await page.getByRole('button', { name: 'Tamam' }).click();
  await page.waitForTimeout(1000);
  await page.getByLabel('Close').click();

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
  await page.getByRole('option', { name: 'Pavo Finansal Teknoloji Çözü' }).click();
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


// ===== ADIM 7: E-Belge Ayarları =====
  // "E-Belge" tıklama 
  await eBelgeAyarlari.click();

  // "Yeni" butonu
  await yeniButton.click();

  
  // Entegratör seçimi
  await page.locator('ot-data-entry-template').filter({ hasText: 'Entegratör' }).getByLabel('Select').click();
    
  // Dropdown'da çıkan ilk elemana tıkla
  const firstOption1 = await page.getByRole('option').first();
  await firstOption1.click();

  // Belge Türü seçimi
  await page.locator('ot-data-entry-template').filter({ hasText: 'Belge Türü' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'E-Arşiv' }).click();

  

  // Seri Numarası alanına rastgele metin yaz
  const eBelgeAdi = rastgeleString(3).toUpperCase();
  const seriNumaraInput = page.getByRole('dialog').locator('input[type="text"]');
  await seriNumaraInput.fill(eBelgeAdi);

  // Gönderici Takma Adı alanına rastgele metin yaz
  const gondericiTakmaAdi = rastgeleString(15);
  const gondericiTakmaAdiInput = page.locator('textarea');
  await gondericiTakmaAdiInput.fill(gondericiTakmaAdi);

  // Oluştur butonuna tıkla
  await page.getByRole('button', { name: 'Oluştur' }).click();

    // Pop-up mesajını kontrol et
  try {
    const popupMessage = page.getByText('Başarılı Üye İşyeri E-Belge');
    await popupMessage.waitFor({ timeout: 3000 });
    console.log('✅ Üye İşyeri E-Belge Ayarları başarıyla oluşturuldu');
  } catch (error) {
    // Başarı mesajı görünmediyse, "E-Belge Ayarı Zaten Kayıtlı" mesajını kontrol et
    try {
      const zatenKayitliMessage = page.getByText('E-Belge Ayarı Zaten Kayıtlı Bu e-belge ayarı zaten mevcut.');
      await zatenKayitliMessage.waitFor({ timeout: 3000 });
      console.log('e-BELGE AYARI ZATEN KAYITLI');
    } catch (secondError) {
      console.log('⚠️ Başarı mesajı görünmedi, işlem tamamlanamadı olabilir.');
    }
  }

  // ===== ADIM 8: E-Belge Ayarları Silme =====
  await uyeIsyeriSil(page, isyeriAdi);



   await page.pause();

});
