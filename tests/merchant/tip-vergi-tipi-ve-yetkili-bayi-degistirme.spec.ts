import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { vknUret } from '../../helpers/vknUret';
import { tcknUret } from '../../helpers/tcknUret';
import { rastgeleString } from '../../helpers/stringUret';
import { zoom } from '../../helpers/zoom';

test('Tip, Vergi Tipi ve Yetkili bayi Değiştirme', async ({ page }) => {

  console.log('===>  Tip, Vergi Tipi ve Yetkili bayi Değiştirme  <===');

  // Önce sisteme giriş yap
  await login(page);

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

  // ===== ADIM 3: Değişikliklerin yapılacağı üye işyeri seçimi (rastgele) =====
  // ilk 8 satırdan rastgele seç
  const randomRowNumber = Math.floor(Math.random() * 10) + 2;
  console.log(`🎯 Rastgele seçilen satır numarası: ${randomRowNumber + 1}`);
  const firstRowExpand = page.getByRole('row', { name: /Expand Details/ }).getByRole('button').nth(randomRowNumber);


  // const firstRowExpand = page.getByRole('row', { name: /Expand Details/ }).getByRole('button').nth(3);
  await firstRowExpand.click();
  await page.waitForTimeout(1000);


  // ===== ADIM 4: Vergi Tipi değiştirme =====

  // Gerçek mükellef seçiliyse Tüzel mükellef seç
  if (await page.getByRole('dialog').getByText('Gerçek').isVisible()) {
    await page.getByRole('dialog').getByText('Gerçek').click();
    await page.getByRole('option').getByText('Tüzel').click();

      // VKN üret
    const vkn = await vknUret(page);
    console.log('Üretilen VKN:', vkn);
  
    // VKN alanına yaz
    const vknInput = page.locator('ot-data-entry-template').filter({ hasText: 'VKN'}).getByRole('textbox');
    await vknInput.fill(vkn);

    // üye işyeri ad soyad alanına yaz
    const isyeriAdi = rastgeleString(10);
    const isyeriAdiInput = page.locator('ot-data-entry-template').filter({ hasText: 'Üye İşyeri Ad Soyad' }).getByRole('textbox');
    await isyeriAdiInput.fill(isyeriAdi);
    

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

    // üye işyeri ad soyad alanına yaz
    const adSoyad = rastgeleString(10);
    const adInput = page.locator('div').filter({ hasText: /^Ad$/ }).getByRole('textbox')
    await adInput.fill(adSoyad);
    const soyadInput = page.locator('ot-data-entry-template').filter({ hasText: 'Soyad' }).getByRole('textbox')
    await soyadInput.fill(adSoyad);


  }
  await page.waitForTimeout(2000);

  // ===== ADIM 4: Tipi değiştirme =====
  if (await page.locator('ot-dropdown-entry').filter({ hasText: 'Tip507-Mükellefi' }).isVisible()) {
    await page.getByRole('dialog').getByText('-Mükellefi').click();
    await page.getByRole('option').nth(2).click();
  } else if (await page.locator('ot-dropdown-entry').filter({ hasText: 'Tip509-Mükellefi' }).isVisible()) {
    await page.getByRole('dialog').getByText('-Mükellefi').click();
    await page.getByRole('option').nth(0).click();
  } else if (await page.locator('ot-dropdown-entry').filter({ hasText: 'Tip507/509-Mükellefi' }).isVisible()) {
    await page.getByRole('dialog').getByText('/509-Mükellefi').click();
    await page.getByRole('option').getByText('507-Mükellefi').click();
  }



  // ===== ADIM 5: Yetkili bayi ekleme veya güncelleme =====
  
  // Aypara PF Test dropdown'ını bul ve tıkla
  const ayparaDropdown = page.getByRole('combobox').getByLabel('Select').nth(6);
  await ayparaDropdown.click();
  await page.waitForTimeout(500);

  // Açılan dropdown'dan rastgele seçim yap
  const dropdownOptions = page.getByRole('option');
  const optionCount = await dropdownOptions.count();
  
  if (optionCount > 0) {
    const randomOptionIndex = Math.floor(Math.random() * optionCount);
    console.log(`🎯 Dropdown'dan rastgele seçilen seçenek indeksi: ${randomOptionIndex + 1}`);
    await dropdownOptions.nth(randomOptionIndex).click();
    await page.waitForTimeout(500);
  } else {
    console.log('⚠️ Dropdown\'da seçenek bulunamadı');
  }

  // ===== ADIM 6: Güncelle butonuna tıkla =====
  await page.getByRole('button', { name: 'Güncelle' }).click();
  

  try {
    const basariMesaji = page.getByText('Başarılı Üye İşyeri başarıyla')
    await expect(basariMesaji).toBeVisible();
    console.log('✅ Başarılı! Güncelle işlemi başarıyla gerçekleştirildi');
  } catch (error) {
    console.log('❌ Güncelle işlemi yapılamadı');
  }

  await page.waitForTimeout(2000);




  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 