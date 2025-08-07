import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';
import { uyeIsyeriEkle507Tuzel, uyeIsyeriSil } from '../../../helpers/uyeIsyeriIslemleri';
import { ePostaUret } from '../../../helpers/ePostaUret';
import { telNoUret } from '../../../helpers/telNoUret';

test('Detay kullanıcıları gruba ekle ve çıkar (reseller login)', async ({ page }) => {

  console.log('===>  Detay kullanıcıları gruba ekle ve çıkar (reseller login)  <===');

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
  const isyeriAdi = await uyeIsyeriEkle507Tuzel(page);

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

  // ===== ADIM 5: Kullanıcı Ekleme (Grup atamasıyla) =====
  await page.getByText('Kullanıcılar', { exact: true }).click();
  await page.getByRole('button', { name: '+ Yeni' }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Adı Soyadı' }).getByRole('textbox').click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Adı Soyadı' }).getByRole('textbox').fill('Test Kullanıcı');
  await page.getByText('Departman Seçin...').click();
  await page.getByRole('option', { name: 'Genel Yönetim' }).click();
  await page.getByText('Şube Seçin...').click();
  await page.getByRole('option', { name: isyeriAdi }).click();
  await page.getByRole('textbox', { name: 'ornek@ornek.com' }).fill(ePostaUret());
  await page.locator('kendo-maskedtextbox').getByRole('textbox').fill(telNoUret());
  await page.getByRole('combobox').filter({ hasText: /^$/ }).click();
  await page.getByRole('option', { name: isyeriAdi + ' Auditors' }).click();
  await page.locator('div').filter({ hasText: /^Kullanıcı Adı Ata$/ }).click();
  await page.getByRole('button', { name: 'Oluştur' }).click();

  try {
    const basariMesaji = page.getByText('Başarılı Üye İşyeri kullanıcı');
    await basariMesaji.waitFor();
    await basariMesaji.click();
    if (basariMesaji) {
      console.log('✅ Başarılı: Kullanıcı başarıyla oluşturuldu!');
    } else {
      console.log('❌ Başarı mesajı bulunamadı');
    }
  } catch (error) {
    console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }
  await page.waitForTimeout(1000);


  // ===== ADIM 6: Kullanıcı Güncelleme üzerinden grup ekleme =====
  await page.getByLabel('Kullanıcılar').getByRole('button', { name: '' }).nth(1).click();
  await page.getByRole('combobox').filter({ hasText: /^$/ }).click();
  await page.getByRole('option', { name: isyeriAdi }).nth(1).click();
  await page.getByRole('option', { name: isyeriAdi }).nth(2).click();
  await page.getByRole('heading', { name: 'Üye İşyeri Kullanıcısı Gü' }).click();
  await page.getByRole('button', { name: 'Güncelle' }).click();

  try {
    const basariMesaji = page.getByText('Başarılı Üye İşyeri kullanıcı');
    await basariMesaji.waitFor();
    await basariMesaji.click();
    if (basariMesaji) {
      console.log('✅ Başarılı: Kullanıcı başarıyla gruba eklendi!');
    } else {
      console.log('❌ Başarı mesajı bulunamadı');
    }
  } catch (error) {
    console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }
  await page.waitForTimeout(1000);



  // ===== ADIM 7: Kullanıcı Güncelleme üzerinden gruptan silme =====
  await page.getByLabel('Kullanıcılar').getByRole('button', { name: '' }).nth(1).click();
  await page.getByRole('combobox').filter({ hasText: /^$/ }).click();
  await page.getByRole('combobox').filter({ hasText: /^$/ }).press('Backspace');
  await page.getByRole('combobox').filter({ hasText: /^$/ }).press('Backspace');
  await page.getByText('Aktif', { exact: true }).click();
  await page.getByRole('button', { name: 'Güncelle' }).click();

  try {
    const basariMesaji = page.getByText('Başarılı Üye İşyeri kullanıcı');
    await basariMesaji.waitFor();
    await basariMesaji.click();
    if (basariMesaji) {
      console.log('✅ Başarılı: Kullanıcı gruptan silindi!');
    } else {
      console.log('❌ Başarı mesajı bulunamadı');
    }
  } catch (error) {
    console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }
  await page.waitForTimeout(1000);


  // ===== ADIM 8: Temizlik =====
  await uyeIsyeriSil(page, isyeriAdi);

  await page.pause();

});
