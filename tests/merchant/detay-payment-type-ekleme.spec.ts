import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';

test('Detay Payment type Ekleme', async ({ page }) => {

  console.log('===>  Detay Payment Type Ekleme  <===');

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

  // ===== ADIM 3: Detay Menü =====
  // Detay menüye tıkla tıkla (ilk 10 satırdan rastgele seç)
  const firstRowExpand = page.locator(`tr:nth-child(${Math.floor(Math.random() * 10) + 1}) > .k-hierarchy-cell`);
  await firstRowExpand.click();
  await page.waitForTimeout(1000);


  // "ödeme tipleri" tıklama 
  const odemeTipleri = page.getByText('Ödeme Tipleri');
  await odemeTipleri.click();
  await page.waitForTimeout(1000);

  //"Yeni" butonu
  const yeniButton = page.getByRole('button', { name: '+ Yeni' });
  await yeniButton.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 4: Ödeme Tipi Ekleme =====
  // Ödeme Tipi dropdown'ına tıkla
  const odemeTipiDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Ödeme Tipi' }).locator('span').first();
  await odemeTipiDropdown.click();
  await page.waitForTimeout(500);

  // Kesin belirli bir seçenek seçemeyiz, kullanılmış bir seçenek yazılırsa dropdownda gözükmeyeceğinden seçme işlemi olmayacaktır. 
  const options = await page.getByRole('option').all();
  // Rastgele bir seçenek seç
  const randomOption = options[Math.floor(Math.random() * options.length)]; 
  await randomOption.click();
  await page.waitForTimeout(500);

  // "Oluştur" butonuna tıkla
  const olusturButton = page.getByRole('button', { name: 'Oluştur' });
  await olusturButton.click();
  console.log('✅ Başarılı: Ödeme Tipi eklendi!');
  await page.waitForTimeout(1000);







  
  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 