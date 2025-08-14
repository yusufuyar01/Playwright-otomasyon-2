import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { rastgeleString } from '../../../helpers/stringUret';
import { zoom } from '../../../helpers/zoom';
import { uyeIsyeriEkle509Gercek, uyeIsyeriSil } from '../../../helpers/uyeIsyeriIslemleri';

test('Üye İşyeri Güncelleme', async ({ page }) => {

  console.log('===>  Üye İşyeri Güncelleme  <===');

  // Önce sisteme giriş yap (reseller login)
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

  // ===== ADIM 3: Üye İşyeri Ekleme (Fonksiyon ile) =====
  const isyeriAdi = await uyeIsyeriEkle509Gercek(page);

  // ===== ADIM 4: Üye İşyeri Güncelleme =====
  try {
    const guncelleme = page.getByRole('row', { name: 'Expand Details  ' + isyeriAdi }).getByRole('button');
    await guncelleme.click();
    await page.waitForTimeout(500);
  } catch (error) {
    console.log(`❌ ${isyeriAdi} ile başlayan üye işyeri bulunamadı:`, error.message);
  }

  try {
    await page.getByRole('button', { name: 'Güncelle' }).click();
    const basarili = page.getByText('Başarılı Üye İşyeri başarıyla');
    await basarili.click();
    console.log(`✅ ${isyeriAdi} ile başlayan üye işyeri Güncellendi`);
  } catch (error) {
    console.log(`❌ ${isyeriAdi} ile başlayan üye işyeri Güncellenemedi:`, error.message);
  }

  // ===== ADIM 5: Üye İşyeri Silme =====
  await uyeIsyeriSil(page, isyeriAdi);

  await page.pause();

  
});
