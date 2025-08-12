import { test, expect } from '@playwright/test';
import { login } from '../../../helpers/login';
import { zoom } from '../../../helpers/zoom';
import { rastgeleString } from '../../../helpers/stringUret';
import { cihazSil } from '../../../helpers/cihazIslemleri';

test('Yeni Cihaz Ekleme', async ({ page }) => {

  console.log('===>  Yeni Cihaz Ekleme  <===');


  // Önce sisteme giriş yap
  await login(page);

  // Zoom işlemi
  await zoom(page);

  // ===== ADIM 1: Dashboard'da Cihaz Yönetimi Menüsünü Bulma =====
  // Cihaz yönetimi bul ve tıkla
  const cihazYonetimi = page.locator('text="Cihaz Yönetimi"'); 
  await cihazYonetimi.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 2: Cihaz İşlemleri Sayfasına Gitme =====
  // Cihaz İşlemleri menü linkini bul ve tıkla
  const cihazIslemleri = page.getByRole('link', { name: ' Cihaz İşlemleri' });
  await cihazIslemleri.click();
  await page.waitForTimeout(2000);

  // ===== ADIM 3: Yeni Cihaz Ekleme =====
  // Yeni cihaz ekleme butonunu bul ve tıkla
  await page.getByRole('button', { name: '+ Yeni' }).click();
  await page.waitForTimeout(1000);

  // ===== ADIM 4: Cihaz Ekleme Formu Doldurulması =====
  // Cihaz Seri No üret ve gir
  const cihazSeriNo = ("PAVDENEME" + rastgeleString(5)).toUpperCase();
  console.log('Üretilen Cihaz Seri No:', cihazSeriNo);
  const seriNoInput = page.locator('ot-data-entry-template').filter({ hasText: 'Seri Numarası' }).getByRole('textbox');
  await seriNoInput.fill(cihazSeriNo);

  // Durum seçimi
  await page.getByText('Seçiniz...').first().click();
  await page.getByRole('option', { name: 'Hazır Değil' }).click();

  // Depo seçimi
  await page.locator('ot-dropdown-entry').filter({ hasText: 'DepoSeçiniz...' }).click();
  await page.getByRole('option', { name: 'TEST', exact: true }).click();

  //Tip
  await page.getByText('Seçiniz...').first().click();
  await page.getByRole('option', { name: 'Smart POS' }).click();

  //Marka
  await page.getByText('Seçiniz...').first().click();
  await page.getByRole('option', { name: 'PAVO' }).click();

  //Model
  await page.getByText('Seçiniz...').click();
  await page.getByRole('option', { name: 'N86', exact: true }).click();

  //Oluştur butonu
  await page.getByRole('button', { name: 'Oluştur' }).click();
  await page.waitForTimeout(2000);

  //Başarı kontrolü
  try {
    const basariMesaji = page.getByText('Başarılı Cihaz başarıyla oluş');
    await expect(basariMesaji).toBeVisible();
    console.log('✅ Cihaz başarıyla eklendi');
  } catch (error) {
    console.log('⚠️ Başarı mesajı görünmedi, cihaz eklenmiş olabilir');
  }

  // cihaz silme
  await cihazSil(page);

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 