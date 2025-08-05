import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { vknUret } from '../../helpers/vknUret';
import { rastgeleString } from '../../helpers/stringUret';
import { ePostaUret } from '../../helpers/ePostaUret';
import { telNoUret } from '../../helpers/telNoUret';
import { zoom } from '../../helpers/zoom';

test('Tüzel Kişi Bayi Ekleme', async ({ page }) => {
  
  console.log('===>  Tüzel Kişi Bayi Ekleme  <===');

  // Önce sisteme giriş yap
  await login(page);

  // Zoom işlemi
  await zoom(page);

  // ===== ADIM 1: Dashboard'da Bayi Yönetimi Menüsünü Bulma =====
  // Bayi yönetimi bul ve tıkla
  const bayiYonetimi = page.locator('text="Bayi Yönetimi"'); 
  await bayiYonetimi.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 2: Bayi Menüsüne Tıklama =====
  // Bayi menü linkini bul ve tıkla
  const bayi = page.getByRole('link', { name: ' Bayi' }); 
  await bayi.click();
  await page.waitForTimeout(500);

  // ===== ADIM 3: Yeni Bayi Ekleme =====
  // Yeni bayi ekleme butonunu bul ve tıkla
  const yeniBayi = page.getByRole('button', { name: 'Yeni Ekle' }); 
  await yeniBayi.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 4: Bayi Ekleme Formu Doldurulması =====

// Vergi Tipi seçimi
  const taxType = page.getByRole('dialog').getByText('Tüzel');
  await taxType.click();

  // Gerçek kullanıcı seç
  const taxTypeOption = page.getByRole('option', { name: 'Tüzel' });
  await taxTypeOption.click();


  // ===== ADIM 5: Bayi adı girilmesi =====
  // bayi adı üret ve gir
  const bayiAdi = ("DENEME" + rastgeleString(5)).toUpperCase();
  console.log('Üretilen Bayi Adı:', bayiAdi);

  // Bayi adı alanına yaz
  const bayiAdiInput = page.locator('ot-data-entry-template').filter({ hasText: 'Bayi Adı' }).getByRole('textbox');
  await bayiAdiInput.fill(bayiAdi);

  // ===== ADIM 5: Vergi Dairesi Seçimi =====
  // Kendo searchbar combobox'ına tıkla
  const vergiDairesiCombobox = page.locator('kendo-searchbar').getByRole('combobox');
  await vergiDairesiCombobox.click();


  // "başkent" yaz
  await vergiDairesiCombobox.fill('başkent');
  await page.waitForTimeout(500);

  // "Başkent Vergi Dairesi" seçeneğine tıkla
  const baskVergiDairesi = page.getByRole('option', { name: 'Başkent Vergi Dairesi' });
  await baskVergiDairesi.click();

  // ===== ADIM 6: VKN doldurulması =====
  // VKN üret
  const vkn = await vknUret(page);
  console.log('Üretilen VKN:', vkn);
  
  // VKN alanına yaz
  const vknInput = page.locator('ot-alpha-entry').filter({ hasText: 'VKN'}).getByRole('textbox');
  await vknInput.fill(vkn);

  // "Tercih Edilen Dil" dropdown'ına tıkla
  const tercihEdilenDil = page.locator('ot-data-entry-template').filter({ hasText: 'Tercih Edilen Dil' }).getByLabel('Select');
  await tercihEdilenDil.click();

  // "Türkçe" seçeneğini seç
  const turkceOption = page.getByRole('option', { name: 'Türkçe' });
  await turkceOption.click();

  // "Şehir" dropdown'ına tıkla
  const sehirDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Şehir' }).locator('span').first();
  await sehirDropdown.click();

  // "ADANA" seçeneğini seç
  const adanaOption = page.getByRole('option', { name: 'ADANA' });
  await adanaOption.click();

  // "İlçe" dropdown'ına tıkla
  const ilceDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'İlçe' }).locator('span').first();
  await ilceDropdown.click();

  // "Kozan" seçeneğini seç
  const kozanOption = page.getByRole('option', { name: 'KOZAN' });
  await kozanOption.click();
  
  // "Mahalle" dropdown'ına tıkla
  const mahalleDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Mahalle' }).locator('span').first();
  await mahalleDropdown.click();

  // "Akkaya Mahallesi" seçeneğini seç
  const akkayaOption = page.getByRole('option', { name: 'AKKAYA MAH.' });
  await akkayaOption.click();

  // "Adres" alanına yaz
  const adresInput = page.locator('ot-address-contact-entry').getByRole('textbox');
  await adresInput.fill('Adres'); 

  //E-Posta Adresi alanınlarına yaz
  const uretilenEposta = ePostaUret();
  console.log('Üretilen E-posta:', uretilenEposta);
  
  
  // E-Posta Adresi alanlarına yaz
  const ePostaInput1 = page.locator('ot-data-entry-template').filter({ hasText: 'Fatura E-Posta Adresi' }).getByPlaceholder('ornek@ornek.com');
  await ePostaInput1.fill(uretilenEposta);


  // Telefon Numarası Üret
  const uretilenTelNo = telNoUret();
  console.log('Üretilen Telefon Numarası:', uretilenTelNo);
  
  // Telefon Numarası alanını yaz
  const telNoInput1 = page.locator('ot-data-entry-template').filter({ hasText: 'Fatura Cep Telefonu' }).getByRole('textbox');
  await telNoInput1.fill(uretilenTelNo);


  // üye işyeri admin kullanıcısı (bayi ile aynı değeri verdik)
  const adSoyadInput = page.locator('ot-data-entry-template').filter({ hasText: 'Adı Soyadı'}).getByRole('textbox');
  await adSoyadInput.fill(bayiAdi);

  // E-Posta Adresi alanına yaz
  const ePostaInput2 = page.locator('ot-panel').filter({ hasText: 'Bayi Admin KullanıcısıAdı' }).getByPlaceholder('ornek@ornek.com');
  await ePostaInput2.fill(uretilenEposta);

  // Telefon Numarası alanına yaz
  const telNoInput2 = page.locator('ot-data-entry-template').filter({ hasText: 'Telefon Numarası' }).getByRole('textbox');
  await telNoInput2.fill(uretilenTelNo);


  // Oluştur butonuna tıkla
  const olusturButton = page.getByRole('button', { name: 'Oluştur' }).first();
  await olusturButton.click();

  // Başarı mesajını kontrol et
  try {
    // Oluştur butonunun artık görünür olmadığını bekle
    await olusturButton.waitFor({ state: 'hidden', timeout: 5000 });
    console.log('✅ Başarılı: Bayi başarıyla eklendi! (Tüzel Kişi)');
  } catch (error) {
    console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }

  await page.reload();

  // Zoom işlemi
  await zoom(page);

  // ===== ADIM 6: Bayi Silme =====
  try {

     // İlk DENEME satırını bul ve expand details butonuna tıkla
     const expandButton = page.getByRole('row', { name: new RegExp(bayiAdi) }).getByRole('button');
     await expandButton.click();

 } catch (error) {
   console.log(`❌ ${bayiAdi} ile başlayan bayi bulunamadı:`, error.message);
 }

 // Sil butonuna tıkla
 await page.getByRole('button', { name: 'Sil' }).click();
 await page.getByRole('button', { name: 'Evet' }).click();
 await page.getByRole('button', { name: 'Evet' }).click();


 // Başarı mesajını kontrol et
   try {
     const basariMesaji = page.getByText('Başarılı Bayi başarıyla');
     await basariMesaji.waitFor();
     if (basariMesaji) {
       console.log('✅ Başarılı: Bayi başarıyla silindi!');
     } else {
       console.log('❌ Başarı mesajı bulunamadı');
     }
   } catch (error) {
     console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
   }

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 