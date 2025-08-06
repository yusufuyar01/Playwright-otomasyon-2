import { test, expect } from '@playwright/test';
import { login } from '../../../helpers/login';
import { ePostaUret } from '../../../helpers/ePostaUret';
import { telNoUret } from '../../../helpers/telNoUret';
import { rastgeleString } from '../../../helpers/stringUret';
import { zoom } from '../../../helpers/zoom';

test('Detay Kullanıcı Ekleme ve Güncelleme', async ({ page }) => {
  
  console.log('===>  Detay Kullanıcı Ekleme ve Güncelleme  <===');

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
 
   // ===== ADIM 3: Mevcut Bayi Seçimi =====
   // İlk bayi satırını seç (test için)
   const ilkBayiSatiri = page.locator('table tbody tr').first();
   await ilkBayiSatiri.click();
   await page.waitForTimeout(1000);
 
   // ===== ADIM 4: Detay Butonuna Tıklama =====
   // ===== ADIM 3: Değişikliklerin yapılacağı üye işyeri seçimi (rastgele) =====
   // ilk 8 satırdan rastgele seç
   const randomRowNumber = Math.floor(Math.random() * 10) + 2;
   console.log(`🎯 Rastgele seçilen satır numarası: ${randomRowNumber + 1}`);
   const firstRowExpand = page.locator('.k-hierarchy-cell.k-table-td').nth(randomRowNumber);
 
   // const firstRowExpand = page.locator('.k-hierarchy-cell.k-table-td').nth(1);
   await firstRowExpand.click();
   await page.waitForTimeout(1000);

   // kullanıcılar başlığına tıkla
   await page.getByText('Kullanıcılar', { exact: true }).click();

   // + yeni butonuna tıkla
   await page.getByRole('button', { name: '+ Yeni' }).click();
   await page.waitForTimeout(1000);

    // Adı Soyadı gir
    const adSoyad = rastgeleString(10);
    console.log('Ad Soyad:', adSoyad);
    const adSoyadInput = page.locator('ot-data-entry-template').filter({ hasText: 'Adı Soyadı' }).getByRole('textbox');
    await adSoyadInput.fill(adSoyad);

    // Departman seç
    await page.getByText('Departman Seçin...').click();
    await page.getByRole('option', { name: 'Genel Yönetim' }).click();

    // Şube seç
    await page.getByText('Şube Seçin...').click();
    await page.getByRole('option', { name: 'Merkez Şube' }).click();

    // e-posta adresi gir
    const ePosta = ePostaUret();
    console.log('E-posta:', ePosta);
    await page.getByRole('textbox', { name: 'ornek@ornek.com' }).fill(ePosta);

    // telefon numarası gir
    const telNo = telNoUret();
    console.log('Telefon:', telNo);
    await page.locator('kendo-maskedtextbox').getByRole('textbox').fill(telNo);

    // kullanıcı Grupları seç
    await page.getByRole('combobox').filter({ hasText: /^$/ }).click();
    await page.getByRole('option').first().click();

    
    // oluştur butonuna tıkla
    await page.getByRole('button', { name: 'Oluştur' }).click();
    await page.waitForTimeout(1000);

    try {
      const basariMesaji = page.getByText('Başarılı Bayi kullanıcısı başarıyla oluşturuldu');
      await basariMesaji.waitFor({ timeout: 5000 });
      console.log('✅ Başarılı: Kullanıcı başarıyla eklendi!');
    } catch (error) {
      console.log('❌ Kullanıcı ekleme başarı mesajı kontrol edilirken hata oluştu:', error.message);
    }


  // ===== ADIM 7: Kullanıcı Güncelleme İşlemi =====
  // Eklenen kullanıcının güncelle butonuna tıkla (en üstte olacak)
  await page.getByLabel('Kullanıcılar').getByRole('button', { name: '' }).first().click();
  await page.waitForTimeout(1000);


  
  // Ad Soyad güncelle
  const adSoyad2 = rastgeleString(10);
  console.log('Güncellenen Ad Soyad:', adSoyad2);
  const adSoyadInput2 = page.locator('ot-data-entry-template').filter({ hasText: 'Adı Soyadı' }).getByRole('textbox');
  await adSoyadInput2.fill(adSoyad2);
  console.log('Ad Soyad güncellendi:', adSoyad2);

  // E-posta güncelle
  const ePosta2 = ePostaUret();
  console.log('Güncellenen E-posta:', ePosta2);
  const ePostaInput2 = page.getByRole('textbox', { name: 'ornek@ornek.com' });
  await ePostaInput2.fill(ePosta2);
  console.log('E-posta güncellendi:', ePosta2);

  // Telefon Numarası güncelle
  const telNo2 = telNoUret();
  console.log('Güncellenen Telefon Numarası:', telNo2);
  const telNoInput = page.locator('kendo-maskedtextbox').getByRole('textbox');
  await telNoInput.fill(telNo2);
  console.log('Telefon Numarası güncellendi:', telNo2);


  // Güncelle butonuna tıkla
  await page.getByRole('button', { name: 'Güncelle' }).click();
  await page.waitForTimeout(1000);

  // evet butonuna tıkla
  await page.getByRole('button', { name: 'Evet' }).click();
  await page.waitForTimeout(1000);

  // Güncelleme başarı mesajını kontrol et
  try {
    const guncellemeBasariMesaji = page.getByText('Başarılı Bayi kullanıcısı başarıyla güncellendi');
    await guncellemeBasariMesaji.waitFor({ timeout: 5000 });
    console.log('✅ Başarılı: Kullanıcı başarıyla güncellendi!');
  } catch (error) {
    console.log('❌ Kullanıcı güncelleme başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }
  

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 