import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { ePostaUret } from '../../helpers/ePostaUret';
import { telNoUret } from '../../helpers/telNoUret';
import { rastgeleString } from '../../helpers/stringUret';
import { zoom } from '../../helpers/zoom';

test('Detay İletişim Bilgileri Ekleme ve Güncelleme', async ({ page }) => {
  
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


  // yeni butonuna tıkla
  await page.getByRole('button', { name: '+ Yeni' }).click();

  // Ana iletişim seç
  await page.getByText('Adres Tipi seçiniz...').click();

  
  // 3 elemanlı veri kümesi
  const dataSet = ['Adres', 'Telefon', 'Web'];
  
  // Veri kümesinden rastgele seç
  const randomIndex = Math.floor(Math.random() * dataSet.length);
  const selectedOption = dataSet[randomIndex];
  console.log(`🎯 Ana iletişim seçilen: ${selectedOption}`);

  // Seçilen Seçeneğe Tıkla
  if (selectedOption) {
    await page.getByRole('option', { name: selectedOption }).click();
  } else {
    console.log('❌ Seçenek metni bulunamadı');
    return;
  }
  await page.waitForTimeout(1000);

    if (selectedOption == 'Adres') {
        // Adrese özel işlemler
        // Alt kontak tipi
        await page.locator('ot-data-entry-template').filter({ hasText: 'Alt Kontak Tipi' }).locator('span').nth(1).click();
        await page.getByRole('option', { name: 'Posta Adresi' }).click();

        // Ülke
        await page.locator('ot-data-entry-template').filter({ hasText: 'Ülke' }).locator('span').nth(1).click();
        await page.getByRole('searchbox', { name: 'Filter' }).fill('tü');
        await page.getByRole('option', { name: 'Türkiye' }).click();

        // şehir
        await page.locator('ot-data-entry-template').filter({ hasText: 'Şehir' }).locator('span').nth(1).click();
        await page.getByRole('option', { name: 'ADANA' }).click();

        // ilçe
        await page.locator('ot-data-entry-template').filter({ hasText: 'İlçe/Semt/Bölge' }).locator('span').nth(1).click();
        await page.getByRole('option', { name: 'KOZAN' }).click();

        // mahalle
        await page.locator('ot-data-entry-template').filter({ hasText: 'Mahalle' }).locator('span').nth(1).click();
        await page.getByRole('option', { name: 'AKKAYA MAH.' }).click();

        // Adres metni
        const adresMetni = rastgeleString(10);
        await page.getByRole('textbox').fill(adresMetni);

    } else if (selectedOption == 'Telefon') {
        // Telefon özel işlemler
         // Alt kontak tipi
         await page.locator('ot-phone-contact-entry span').nth(1).click();
         await page.getByRole('option', { name: 'Telefon', exact: true }).click();
        
         // telefon No
         const telefonNo = telNoUret();
         await page.getByRole('textbox').fill(telefonNo);
 
    } else if (selectedOption == 'Web') {
        // Web özel işlemler
        // Alt kontak tipi
        await page.locator('ot-web-contact-entry span').nth(1).click();
        await page.getByRole('option', { name: 'Web Sitesi' }).click();

        // adres
        const adres = rastgeleString(10);
        await page.locator('ot-data-entry-template').filter({ hasText: 'Adres' }).getByRole('textbox').fill(adres);

    } else {
      console.log('Bilinmeyen adres tipi:', selectedOption);
    }

    // Oluştur butonuna tıkla
    await page.getByRole('button', { name: 'Oluştur' }).click();
    await page.waitForTimeout(1000);

    try {
      const basariMesaji = page.getByText('Başarılı Bayi İletişim başarı');
      await basariMesaji.waitFor({ timeout: 5000 });
      console.log('✅ Başarılı: İletişim bilgisi başarıyla eklendi!');
    } catch (error) {
      console.log('❌ İletişim bilgisi ekleme başarı mesajı kontrol edilirken hata oluştu:', error.message);
    }




    // ===== ADIM 5: Güncelleme İşlemi =====
      // const firstRowExpand = page.getByRole('row', { name: /Expand Details/ }).getByRole('button').nth(randomRowNumber);
      
      // eklenen iletişim bilgisi listenin en üstüne geldiğinden 0 indexli güncelle butonuna tıkla
      const bayiSatiri = page.getByLabel('İletişim Bilgileri').getByRole('gridcell', { name: '' }).nth(0);
      await bayiSatiri.click();
      await page.waitForTimeout(1000);

      if (await page.locator('ot-dropdown-entry').filter({ hasText: 'Ana İletişimAdres' }).isVisible()) {
        // Adrese güncelleme özel işlemler
        // Adres metni
        const adresMetni = rastgeleString(10);
        await page.locator('ot-data-entry-template').filter({ hasText: 'Adres' }).getByRole('textbox').fill(adresMetni);
        console.log('Yeni adres:', adresMetni);

    } else if (await page.locator('ot-data-entry-template').filter({ hasText: 'Ana İletişimTelefon' }).isVisible()) {
        // Telefon güncelleme özel işlemler
        // telefon no
         const telefonNo = telNoUret();
         await page.getByRole('textbox').fill(telefonNo);
         console.log('Yeni telefon:', telefonNo);

    } else if (await page.locator('ot-dropdown-entry').filter({ hasText: 'Ana İletişimWeb' }).isVisible()) {
        // Web güncelleme özel işlemler
        // adres
        const adres = rastgeleString(10);
        await page.locator('ot-data-entry-template').filter({ hasText: 'Adres' }).getByRole('textbox').fill(adres);
        console.log('Yeni web adresi:', adres);
    } 


      // güncelle butonuna tıkla
      await page.getByRole('button', { name: 'Güncelle' }).click();
      await page.waitForTimeout(1000);


      try {
        const basariMesaji = page.getByText('Başarılı Bayi İletişim başarı');
        await basariMesaji.waitFor({ timeout: 5000 });
        console.log('✅ Başarılı: İletişim bilgisi başarıyla güncellendi!');
      } catch (error) {
        console.log('❌ İletişim bilgisi güncelleme başarı mesajı kontrol edilirken hata oluştu:', error.message);
      }
    


  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 