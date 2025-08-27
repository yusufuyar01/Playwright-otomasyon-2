import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';
import { rastgeleString } from '../../../helpers/stringUret';
import { mediatorEkle, mediatorGuncelle, mediatorSil, parametreEkle, parametreGuncelle, parametreSil, terminaliGetir } from '../../../helpers/satisYerminaliIslemleri';

test('Mediator İşlemleri - Ekleme, Güncelleme ve Silme (reseller login)', async ({ page }) => {

    console.log('===>  Mediator İşlemleri - Ekleme, Güncelleme ve Silme (reseller login)  <===');

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

    // Ödeme Aracısı ekle
    await page.getByRole('button', { name: '+ Yeni' }).click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'Ödeme Aracısı' }).locator('span').nth(1).click();
    await page.getByRole('option', { name: 'Pluxee' }).click();
    await page.getByRole('dialog').getByRole('spinbutton').click();
    await page.getByRole('dialog').getByRole('spinbutton').fill('10');
    await page.getByRole('button', { name: 'Oluştur' }).click();
    await page.waitForTimeout(2000);

    if (await page.getByLabel('Zaten kayıtlı ödeme aracısı').isVisible()) {
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: 'Kapat' }).click();
        await page.getByRole('row', { name: /  Pluxee / }).getByRole('button').first().click();
        await page.getByRole('button', { name: 'Sil' }).click();
        await page.getByRole('button', { name: 'Evet' }).click();

        await page.getByRole('button', { name: '+ Yeni' }).click();
        await page.locator('ot-data-entry-template').filter({ hasText: 'Ödeme Aracısı' }).locator('span').nth(1).click();
        await page.getByRole('option', { name: 'Pluxee' }).click();
        await page.getByRole('dialog').getByRole('spinbutton').click();
        await page.getByRole('dialog').getByRole('spinbutton').fill('10');
        await page.getByRole('button', { name: 'Oluştur' }).click();
    }

    try {
         const basarılıMesajı = page.getByText('Başarılı Terminal Ödeme Aracı');
         await expect(basarılıMesajı).toBeVisible();
         await basarılıMesajı.click();
         console.log('✅ Terminal Ödeme Aracısı başarıyla eklendi');
    } catch (error) {
         console.log('❌ Terminal Ödeme Aracısı eklenemedi');
    }




    // Ödeme Aracısı güncelle
    await page.getByRole('row', { name: /  Pluxee / }).getByRole('button').first().click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'Sıra' }).getByLabel('Arttır').click();
    await page.getByRole('button', { name: 'Güncelle' }).click();
    try {
         const basarılıMesajı = page.getByText('Başarılı Terminal Ödeme Aracı');
         await expect(basarılıMesajı).toBeVisible();
         await basarılıMesajı.click();
         console.log('✅ Terminal Ödeme Aracısı başarıyla güncellendi');
    } catch (error) {
         console.log('❌ Terminal Ödeme Aracısı güncellenemedi');
    }    





    // Parametre ekle
    await page.getByRole('row', { name: '  Pluxee 11 Hayır Hayır Hay' }).getByRole('button').nth(1).click();
    await page.getByRole('button', { name: '+ Ekle' }).click();
    

    try {
         const basarılıMesajı = page.getByText('Hata You do not have enough');
         await expect(basarılıMesajı).toBeVisible();
         await basarılıMesajı.click();
         console.log('❌ "Terminal Parametre eklemek için yetkiniz yok" (Beklenen Hata)');
    } catch (error) {
         console.log('❌ "Terminal Parametre eklemek için yetkiniz yok" hatası alınamadı.Bir sorun olabilir');
    }
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: ' Kapat' }).click();

 

    // Ödeme Aracısı sil
    await page.getByRole('row', { name: /  Pluxee / }).getByRole('button').first().click();
    await page.getByRole('button', { name: 'Sil' }).click();
    await page.getByRole('button', { name: 'Evet' }).click();
    try {
         const basarılıMesajı = page.getByText('Başarılı The Terminal Payment');
         await expect(basarılıMesajı).toBeVisible();
         await basarılıMesajı.click();
         console.log('✅ Terminal Ödeme Aracısı başarıyla silindi');
    } catch (error) {
         console.log('❌ Terminal Ödeme Aracısı silinemedi');
    }



    await page.pause();

});
