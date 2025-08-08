import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';
import { uyeIsyeriEkle509Gercek, uyeIsyeriSil } from '../../../helpers/uyeIsyeriIslemleri';

test('Ödemesi Olan Üye İşyeri Silme (reseller-login)', async ({ page }) => {

  console.log('===>  Ödemesi Olan Üye İşyeri Silme (reseller-login)  <===');
  
  // Önce sisteme giriş yap
  await login2(page);

  // Zoom işlemi
  await zoom(page);


  // ===== ADIM 1: Dashboard'da Üye İşyeri Yönetimi Menüsünü Bulma =====
  // Üye işyeri yönetimi bul ve tıkla
   const uyeIsyeriYonetimi = page.locator('text="Üye İşyeri Yönetimi"'); 
  await uyeIsyeriYonetimi.click();
  await page.waitForTimeout(1000);

  // // ===== ADIM 2: Üye İşyeri Tıklama =====
  // Üye işyeri menü linkini bul ve tıkla (URL ile spesifik olarak hedefle)
   const uyeIsyeri = page.locator('a[href="/Merchant/Merchant/Index"]'); 
  await uyeIsyeri.click();
  await page.waitForTimeout(500);




    // ===== ADIM 5: Ürün Ekleme =====

    await page.getByRole('columnheader', { name: '' }).locator('span').nth(1).click();
    await page.getByRole('textbox', { name: 'Fatura Başlığı Filter' }).click();
    await page.getByRole('textbox', { name: 'Fatura Başlığı Filter' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Fatura Başlığı Filter' }).fill('ERDAL');
    await page.getByRole('row', { name: 'Expand Details  ERDAL' }).getByRole('button').click();
    await page.getByRole('button', { name: 'Sil' }).click();
    await page.getByRole('button', { name: 'Evet' }).click();
    await page.getByText('Merchant Delete Failed Bu mü').click();


  // Başarı mesajını kontrol et
    try {
     
      if (await page.getByText('Başarılı Üye İşyeri başarıyla silindi.').isVisible()) {
        console.log('✅ Başarılı: Üye İşyeri başarıyla silindi!');
      } 
      else if (await page.getByText('Merchant Delete Failed Bu mü').isVisible()) {
        console.log('❌ Üye İşyeri silinemedi! (Beklenen durum. Test başarılı)');
      } else {
        console.log('❌ Başarı mesajı bulunamadı');
      }
    } catch (error) {
      console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
    }
 
     // Test sonunda ekranın kapanmasını engellemek için pause
    await page.pause();

});