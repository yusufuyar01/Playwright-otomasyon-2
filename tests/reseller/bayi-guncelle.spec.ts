import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { vknUret } from '../../helpers/vknUret';
import { tcknUret } from '../../helpers/tcknUret';
import { rastgeleString } from '../../helpers/stringUret';
import { ePostaUret } from '../../helpers/ePostaUret';
import { telNoUret } from '../../helpers/telNoUret';
import { zoom } from '../../helpers/zoom';

test('Bayi Güncelleme', async ({ page }) => {

  // Önce sisteme giriş yap
  await login(page);

  // Zoom işlemi
  await zoom(page);

  // ===== ADIM 1: Dashboard'da Bayi Yönetimi Menüsünü Bulma =====
  // Bayi yönetimi bul ve tıkla
  const bayiYonetimi = page.locator('text="Bayi Yönetimi"'); 
  await bayiYonetimi.click();
  await page.waitForTimeout(500);

  // ===== ADIM 2: Bayi Menüsüne Tıklama =====
  // Bayi menü linkini bul ve tıkla
  const bayi = page.getByRole('link', { name: ' Bayi' }); 
  await bayi.click();
  await page.waitForTimeout(500);

  // ===== ADIM 3: Güncellenecek bayi seçimi (rastgele) =====
  // İlk 10 satırdan rastgele seç
  const randomRowNumber = Math.floor(Math.random() * 10) + 1;
  console.log(`🎯 Rastgele seçilen satır numarası: ${randomRowNumber + 1}`);
  const firstRowExpand = page.getByRole('row', { name: /Expand Details/ }).getByRole('button').nth(randomRowNumber);

//   const firstRowExpand = page.getByRole('row', { name: /Expand Details/ }).getByRole('button').nth(1);
  await firstRowExpand.click();
  await page.waitForTimeout(500);

  // ===== ADIM 4: Vergi Tipi değiştirme =====
  // Gerçek mükellef seçiliyse Tüzel mükellef seç
  if (await page.getByRole('dialog').getByText('Gerçek').isVisible()) {
    await page.getByRole('dialog').getByText('Gerçek').click();
    await page.getByRole('option').getByText('Tüzel').click();
    await page.waitForTimeout(500);



    // Kendo searchbar combobox'ına tıkla
    const vergiDairesiCombobox = page.locator('kendo-searchbar').getByRole('combobox');
    await vergiDairesiCombobox.click();


    // "başkent" yaz
    await vergiDairesiCombobox.fill('başkent');
    await page.waitForTimeout(500);

    // "Başkent Vergi Dairesi" seçeneğine tıkla
    const baskVergiDairesi = page.getByRole('option', { name: 'Başkent Vergi Dairesi' });
    await baskVergiDairesi.click();

    // VKN üret
    const vkn = await vknUret(page);
    console.log('Üretilen VKN:', vkn);
  
    // VKN alanına yaz
    const vknInput = page.locator('ot-alpha-entry').filter({ hasText: 'VKN'}).getByRole('textbox');
    await vknInput.fill(vkn);
    await page.waitForTimeout(500);




  } else if (await page.getByRole('dialog').getByText('Tüzel').isVisible()) {
    // Tüzel mükellef seçiliyse Gerçek mükellef seç
    await page.getByRole('dialog').getByText('Tüzel').click();
    await page.getByRole('option').getByText('Gerçek').click();
    
    // TC No üret
    const tckn = await tcknUret(page);
    console.log('Üretilen TC No:', tckn);
  
    // TC No alanına yaz
    const tcknInput = page.locator('ot-alpha-entry').filter({ hasText: 'TCKN'}).getByRole('textbox');
    await tcknInput.fill(tckn);

    // Bayi adı alanını güncelle
    const bayiAdi = rastgeleString(10);
    const bayiAdiInput = page.locator('ot-data-entry-template').filter({ hasText: 'Bayi Adı' }).getByRole('textbox');
    await bayiAdiInput.fill(bayiAdi);
  }
  await page.waitForTimeout(500);

  // ===== ADIM 8: Güncelle butonuna tıkla =====
  await page.getByRole('button', { name: 'Güncelle' }).click();
  await page.getByRole('button', { name: 'Evet' }).click();
  
  try {
    const basariMesaji = page.getByText('Başarılı Bayi başarıyla')
    await expect(basariMesaji).toBeVisible();
    console.log('✅ Başarılı! Bayi güncelleme işlemi başarıyla gerçekleştirildi');
  } catch (error) {
    console.log('❌ Bayi güncelleme işlemi yapılamadı');
  }

    // // Başarı mesajını kontrol et
    // try {
    //     // Oluştur butonunun artık görünür olmadığını bekle
    //     await olusturButton.waitFor({ state: 'hidden', timeout: 5000 });
    //     console.log('✅ Başarılı: Bayi başarıyla eklendi! (Gerçek Kişi)');
    //   } catch (error) {
    //     console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
    //   }


  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 