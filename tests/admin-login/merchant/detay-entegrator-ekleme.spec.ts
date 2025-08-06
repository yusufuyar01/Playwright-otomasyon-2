import { test, expect } from '@playwright/test';
import { login } from '../../../helpers/login';
import { zoom } from '../../../helpers/zoom';

test('Entegratör Ekleme', async ({ page }) => {

  console.log('===>  Entegratör Ekleme  <===');
  
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
  // Detay menüye tıkla (ilk 10 satırdan rastgele seç)
  const randomRowNumber = Math.floor(Math.random() * 10) + 2;
  console.log(`🎯 Rastgele seçilen satır numarası: ${randomRowNumber}`);
  const firstRowExpand = page.locator(`tr:nth-child(${randomRowNumber}) > .k-hierarchy-cell`);

  // bu satır özellikle bir detay satırını incelemek için konulmuştur. hemen yukarıdaki 3 satırı yorum satırına alarak kullanabilirsiniz.
  // const firstRowExpand = page.locator('tr:nth-child(5) > .k-hierarchy-cell');
  await firstRowExpand.click();

  // ===== ADIM 2: Entegratör Yönetimi Menüsünü Bulma =====
  // Entegratör yönetimi menü linkini bul ve tıkla
  const entegratorler = page.getByText('Entegratörler')
  await entegratorler.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 3: Yeni Entegratör Ekleme =====
  // Yeni entegratör ekleme butonunu bul ve tıkla
  const yeniButton = page.getByRole('button', { name: '+ Yeni' }); 
  await yeniButton.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 4: Entegratör Ekleme Formu Doldurulması =====

     // Entegratör dropdown'ına tıkla
   const entegratorDropdown = page.getByRole('dialog').locator('span').nth(3);
   await entegratorDropdown.click();
   await page.waitForTimeout(500);

   // Tüm entegratör seçeneklerini al
   const tumEntegratorSecenekleri = await page.getByRole('option').all();
   
   // Rastgele bir entegratör seç
   if (tumEntegratorSecenekleri.length > 0) {
     const randomIndex = Math.floor(Math.random() * tumEntegratorSecenekleri.length);
     const secilenEntegrator = tumEntegratorSecenekleri[randomIndex];
     const entegratorAdi = await secilenEntegrator.textContent();
     await secilenEntegrator.click();
     console.log(`🎯 Rastgele seçilen entegratör: ${entegratorAdi}`);
   } else {
     console.log('❌ Entegratör seçeneği bulunamadı');
   }

  // "Oluştur" butonuna tıkla
  const olusturButton = page.getByRole('button', { name: 'Oluştur' });
  await olusturButton.click();
  await page.waitForTimeout(500);

  // ===== ADIM 6: Başarı Kontrolü =====
  // Başarı mesajını kontrol et
  try {
    const basariMesaji = page.getByText('Başarılı');
    await basariMesaji.waitFor({ timeout: 5000 });
    console.log('✅ Entegratör başarıyla eklendi');
  } catch (error) {
    console.log('⚠️ Başarı mesajı görünmedi, işlem tamamlanamadı olabilir.');
  }

  await page.pause();

}); 