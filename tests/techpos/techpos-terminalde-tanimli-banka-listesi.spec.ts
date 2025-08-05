import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';

test('TechPOS Terminalde Tanımlı Banka Listesi', async ({ page }) => {

    console.log('===>  Techpos Terminalde Tanımlı Banka Listesi  <===');

    await login(page);
    await zoom(page);

    // Techpos yönetimi ve terminal sayfasına git
    await page.getByText('Techpos Yönetimi').click();
    await page.getByRole('link', { name: 'Techpos Terminalde Tanımlı Banka Listesi' }).click();

    let bkmSeriNo = 'PAV60W800122';
    // BKM Seri No doldur
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill(bkmSeriNo);
    await page.getByRole('button', { name: 'Sorgu' }).click();
    await page.waitForTimeout(1000);

    try {
    const kayitBulunamadi = await page.getByText('Kayıt bulunamadı').isVisible();
    if (kayitBulunamadi) {
        console.log('❌', bkmSeriNo, 'için Kayıt bulunamadı');
    } else {
            console.log('✅', bkmSeriNo, 'için Kayıt bulundu');
            console.log('Techpos Terminalde Tanımlı Bankalar:');
            let i = 2;
                while (await page.getByRole('gridcell').nth(i).isVisible()) {   
                    const bankaAdi = await page.getByRole('gridcell').nth(i).textContent();
                    console.log('➤', bankaAdi);
                    i+=7;
                }
        }
    } catch (error) {
        console.log('❌ Bir sorun oluştu');
    }

    



    await page.pause();
}); 