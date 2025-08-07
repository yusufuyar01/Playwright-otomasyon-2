import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';
import { uyeIsyeriEkle509Gercek, uyeIsyeriSil } from '../../../helpers/uyeIsyeriIslemleri';
import { rastgeleString } from '../../../helpers/stringUret';

test('Detay Satış Uygulamaları (reseller login)', async ({ page }) => {

  console.log('===>  Detay Satış Uygulamaları (reseller login)  <===');

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

  // ===== ADIM 5: Satış Uygulaması Ekleme =====
  await page.getByText('Satış Uygulamaları').click();
  await page.getByRole('button', { name: '+ Yeni' }).click();
  await page.getByText('Öğeyi seçin..').first().click();
  await page.getByRole('option', { name: 'Web Faturalı' }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Başlık' }).getByRole('textbox').fill('Test Satış Uygulaması');
  await page.locator('ot-data-entry-template').filter({ hasText: 'Sıra' }).getByRole('textbox').fill('5');
  await page.getByRole('button', { name: 'Oluştur' }).click();
  await page.waitForTimeout(1000);

        try {
            if (await page.getByText('Başarılı Üye İşyeri Uygulamas').isVisible()) {
                page.getByText('Başarılı Üye İşyeri Uygulamas').click();
                console.log('✅ Başarılı: Satış Uygulaması başarıyla oluşturuldu!');
            } else if (await page.getByText('Girdiğiniz pozisyon zaten bulunmakta. Girdiğiniz Pozisyon değeri zaten').isVisible()) {
                console.log('⚠️ Girdiğiniz pozisyon zaten bulunmakta!');
            } else {
                console.log('❌ Başarı mesajı bulunamadı');
            }
        } catch (error) {
            console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
        }
        await page.waitForTimeout(1000);

        // ===== ADIM 6: Satış Uygulaması Sıra Güncelleme =====
        await page.getByRole('row', { name: ' Web Faturalı Test Satış' }).getByRole('button').click();
        await page.locator('ot-data-entry-template').filter({ hasText: 'Sıra' }).getByRole('textbox').click();
        await page.locator('ot-data-entry-template').filter({ hasText: 'Sıra/' }).getByRole('textbox').fill('4');
        await page.getByRole('button', { name: 'Güncelle' }).click();
        await page.waitForTimeout(1000);

        try {
            if (await page.getByText('Başarılı Üye İşyeri Uygulamas').isVisible()) {
                page.getByText('Başarılı Üye İşyeri Uygulamas').click();
                console.log('✅ Başarılı: Satış Uygulaması başarıyla güncellendi!');
            } else if (await page.getByText('Girdiğiniz pozisyon zaten bulunmakta. Girdiğiniz Pozisyon değeri zaten').isVisible()) {
                console.log('⚠️ Girdiğiniz pozisyon zaten bulunmakta!');
            } else {
                console.log('❌ Başarı mesajı bulunamadı');
            }
        } catch (error) {
            console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
        }
        await page.waitForTimeout(1000);

        // ===== ADIM 7: Satış Uygulaması Sıra Silme =====
        await page.getByRole('row', { name: ' Web Faturalı Test Satış' }).getByRole('button').click();
        await page.getByRole('button', { name: 'Sil' }).click();
        await page.getByRole('button', { name: 'Evet' }).click();
        await page.waitForTimeout(1000);
      
        try {
            if (await page.getByText('Başarılı Üye İşyeri Uygulamas').isVisible()) {
                page.getByText('Başarılı Üye İşyeri Uygulamas').click();
                console.log('✅ Başarılı: Satış Uygulaması başarıyla silindi!');
            } else {
                console.log('❌ Başarı mesajı bulunamadı');
            }
        } catch (error) {
            console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
        }
        await page.waitForTimeout(1000);

  // ===== ADIM 9: Üye İşyeri Silme =====
  await uyeIsyeriSil(page, isyeriAdi);

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

});
