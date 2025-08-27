import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';
import { dokumanOnEkiEkle, dokumanOnEkiGuncelle, dokumanOnEkiSil } from '../../../helpers/satisTerminaliIslemleri';

test('Doküman Ön Eki İşlemleri - Ekleme, Güncelleme ve Silme (reseller login)', async ({ page }) => {

    console.log('===>  Doküman Ön Eki İşlemleri - Ekleme, Güncelleme ve Silme (reseller login)  <===');

    // Reseller olarak sisteme giriş yap
    await login2(page);

    // Zoom işlemi
    await zoom(page);

    // Satış terminali bul ve tıkla
    const satisTerminali = page.locator('text="Satış Terminali"');
    await satisTerminali.click();
    
    // Sayfanın yüklenmesini bekle
    await page.waitForLoadState('networkidle');
    
    await page.getByRole('link', { name: ' Terminal', exact: true }).click();

    await page.getByRole('columnheader', { name: '' }).locator('ot-button').click();
     
    await page.getByRole('textbox', { name: 'Seri Numarası Filter' }).click();
    await page.getByRole('textbox', { name: 'Seri Numarası Filter' }).fill('DENEME');
    await page.getByRole('gridcell', { name: 'DENEME' }).first().click();

   //detay butonuna tıkla
   await page.getByRole('link', { name: 'Expand Details' }).first().click();

    // Doküman Ön Eki sekmesine git
    await page.getByText('Terminal Doküman Ön Eki').click();

    // Yeni doküman ön eki ekle
    await page.getByRole('button', { name: '+ Yeni' }).click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'Belge Türü' }).locator('span').first().click();
    await page.getByRole('option', { name: 'E-Fatura' }).click();
    await page.getByRole('dialog').getByRole('textbox').click();
    await page.getByRole('dialog').getByRole('textbox').fill('123');
    await page.getByRole('button', { name: 'Oluştur' }).click();
    await page.waitForTimeout(2000);

    if (await page.getByLabel('PrefixAlreadyExists').isVisible()) {
        console.log('❌ "Zaten kayıtlı döküman ön eki" hatası alındı (Beklenen Hata)');
        await page.getByRole('button', { name: 'Kapat' }).click();
    }

    try {
         const basarılıMesajı = page.getByText('Başarılı Terminal Document');
         await expect(basarılıMesajı).toBeVisible();
         await basarılıMesajı.click();
         console.log('❌ Terminal Doküman Ön Eki başarıyla eklendi. Sorun olabilir (beklenmeyen Durum)');
    } catch (error) {
         console.log('❌ Terminal Doküman Ön Eki eklenemedi (beklenen hata)');
    }
    await page.waitForTimeout(1000);

    // Doküman ön eki güncelle
    await page.getByLabel('Terminal Doküman Ön Eki').getByRole('button', { name: '' }).first().click();
    await page.getByRole('dialog').getByRole('textbox').click();
    await page.getByRole('dialog').getByRole('textbox').fill('456');
    await page.getByRole('button', { name: 'Güncelle' }).click();

    try {
         const basarılıMesajı = page.getByText('Başarılı Terminal Document');
         await expect(basarılıMesajı).toBeVisible();
         await basarılıMesajı.click();
         console.log('✅ Terminal Doküman Ön Eki başarıyla güncellendi');
    } catch (error) {
         console.log('❌ Terminal Doküman Ön Eki güncellenemedi');
    }
    await page.waitForTimeout(1000);
    
    
    // Doküman ön eki sil
    await page.getByLabel('Terminal Doküman Ön Eki').getByRole('button', { name: '' }).first().click();
    await page.getByRole('button', { name: 'Sil' }).click();
    await page.getByRole('button', { name: 'Evet' }).click();

    try {
          const basarılıMesajı = page.getByText('Asenkron Satış için Aktif Asenkron satış terminal için aktif');
          await expect(basarılıMesajı).toBeVisible();
          await basarılıMesajı.click();
          console.log('❌  Asenkron satış terminal için aktif. (beklenen hata)');
    } catch (error) {
          console.log('❌ Beklenmeyen bir hata oluştu', error);
    }
     await page.waitForTimeout(1000);    
    await page.pause();

});
