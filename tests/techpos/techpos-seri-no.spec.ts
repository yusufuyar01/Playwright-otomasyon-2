import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';

test('TechPOS - Seri No Grid Filtre', async ({ page }) => {
  

    await login(page);
    
    await zoom(page);

    // Techpos yönetimi ve batch sayfasına git
    await page.getByText('Techpos Yönetimi').click();
    await page.getByRole('link', { name: ' Seri Numara Doğrulama' }).click();

    // Başlangıç ve Bitiş Tarihi


    await page.locator('ot-data-entry-template').filter({ hasText: 'Başlangıç Tarihi' }).getByLabel('Takvimden seç').click();
    await page.getByText('Tem', { exact: true }).first().click();
    await page.getByTitle('1 Temmuz 2025 Salı').locator('span').click();



    await page.locator('ot-data-entry-template').filter({ hasText: 'Bitiş Tarihi' }).getByLabel('Takvimden seç').click();
    await page.getByTitle('1 Ağustos 2025 Cuma').locator('span').click();

    // Filtrele butonu
    await page.getByRole('button', { name: 'Filtrele' }).click();

    await page.waitForTimeout(1000);

    if (await page.getByText('Kayıt bulunamadı').isVisible()) {
        console.log(' ❌ Kayıt bulunamadı');
        await page.pause();
    } else {
        console.log(' ✅ Kayıt bulundu');

        let i = 2;
        while (await page.getByRole('gridcell').nth(i).isVisible()) {
        const olusturulmaTarihi = await page.getByRole('gridcell').nth(i).textContent();
        const seriNo = await page.getByRole('gridcell').nth(i+2).textContent();

        console.log('➤ Oluşturulma tarihi', olusturulmaTarihi, ' olan ve Seri Numarası', seriNo, ' olan cihaz bulundu');

        console.log('--------------------------------');

        i = i + 16;

        }

        const seriNo = await page.getByRole('gridcell').nth(4).textContent();

        await page.getByRole('button', { name: '' }).click();
        await page.getByRole('textbox', { name: 'Seri Numarası Filter' }).click();
        await page.getByRole('textbox', { name: 'Seri Numarası Filter' }).fill(seriNo);

        if (await page.getByText('Kayıt bulunamadı').isVisible()) {
            console.log(' ❌ Kayıt bulunamadı');
            await page.pause();
        } else {
            console.log(' ✅ Grid filtre ile Kayıt bulundu');
    
            let i = 18;
            while (await page.getByRole('gridcell').nth(i).isVisible()) {
            const olusturulmaTarihi = await page.getByRole('gridcell').nth(i).textContent();
            const seriNo = await page.getByRole('gridcell').nth(i+2).textContent();
    
            console.log('➤ Oluşturulma tarihi', olusturulmaTarihi, ' olan ve Seri Numarası', seriNo, ' olan cihaz bulundu');
    
            console.log('--------------------------------');
    
            i = i + 16;
    
            }
        }   
    }

    


    await page.pause();
}); 