import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';
import { uyeIsyeriEkle509Gercek, uyeIsyeriSil } from '../../../helpers/uyeIsyeriIslemleri';

test('Detay Ödeme Araçıları (reseller login)', async ({ page }) => {

  console.log('===>  Detay Ödeme Araçıları (reseller login)  <===');

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
  
  // bu satır özellikle bir detay satırını incelemek için konulmuştur. hemen yukarıdaki 3 satırı yorum satırına alarak kullanabilirsiniz.
  // const firstRowExpand = page.locator('tr:nth-child(3) > .k-hierarchy-cell');
  // await firstRowExpand.click();

  // ===== ADIM 5: Ödeme Araçıları Ekleme =====
  await page.getByText('Ödeme Aracıları').click();
  await page.getByRole('button', { name: '+ Yeni' }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Terminal Tipi' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Web' }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Ödeme Aracısı' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Nakit' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('4');
  await page.getByRole('button', { name: 'Oluştur' }).click();
  await page.waitForTimeout(1000);

  try {
    if (await page.getByText('Başarılı Üye İşyeri Ödeme').isVisible()) {
      page.getByText('Başarılı Üye İşyeri Ödeme').click();
      console.log('✅ Başarılı: Ödeme Aracısı başarıyla oluşturuldu!');
    } else if (await page.getByText('Girdiğiniz pozisyon zaten bulunmakta').isVisible()) {
      console.log('⚠️ Girdiğiniz pozisyon zaten bulunmakta!');
    } else {
      console.log('❌ Başarı mesajı bulunamadı');
    }
  } catch (error) {
    console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }
  await page.waitForTimeout(1000);

  // ===== ADIM 6: Ödeme Aracısı Güncelleme =====
  await page.getByLabel('Ödeme Aracıları').getByRole('button', { name: '' }).nth(2).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('5');
  await page.getByRole('button', { name: 'Güncelle' }).click();
  await page.waitForTimeout(1000);

  try {
    if (await page.getByText('Başarılı Üye İşyeri Ödeme').isVisible()) {
      page.getByText('Başarılı Üye İşyeri Ödeme').click();
      console.log('✅ Başarılı: Ödeme Aracısı başarıyla güncellendi!');
    } else if (await page.getByText('Girdiğiniz pozisyon zaten bulunmakta').isVisible()) {
      console.log('⚠️ Girdiğiniz pozisyon zaten bulunmakta!');
    } else {
      console.log('❌ Başarı mesajı bulunamadı');
    }
  } catch (error) {
    console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }
  await page.waitForTimeout(1000);

  // ===== ADIM 7: Ödeme Aracısı parametre ekleme =====
  await page.getByRole('row', { name: ' BKM Güncellenmiş BKM Medyatörü 2 Evet' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Sil' }).click();
  await page.getByRole('button', { name: 'Evet' }).click();
  await page.waitForTimeout(1000);











  // ===== ADIM 7: Ödeme Aracısı Silme =====
  await page.getByRole('row', { name: ' BKM Güncellenmiş BKM Medyatörü 2 Evet' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Sil' }).click();
  await page.getByRole('button', { name: 'Evet' }).click();
  await page.waitForTimeout(1000);
  
  try {
    if (await page.getByText('Başarılı Üye İşyeri Medyatör').isVisible()) {
      page.getByText('Başarılı Üye İşyeri Medyatör').click();
      console.log('✅ Başarılı: Ödeme Medyatörü başarıyla silindi!');
    } else {
      console.log('❌ Başarı mesajı bulunamadı');
    }
  } catch (error) {
    console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }
  await page.waitForTimeout(1000);

  // ===== ADIM 8: Üye İşyeri Silme =====
  await uyeIsyeriSil(page, isyeriAdi);

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

});
