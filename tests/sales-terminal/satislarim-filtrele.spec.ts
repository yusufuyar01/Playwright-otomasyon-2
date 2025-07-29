import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';
import { terminaliGetir } from '../../helpers/satisYerminaliIslemleri';

test('Satışlarım Filtreleme İşlemleri', async ({ page }) => {

    // Önce sisteme giriş yap
    await login(page);

    // Zoom işlemi
    await zoom(page);

    await page.getByText('Satış', { exact: true }).click();
    await page.getByRole('link', { name: ' Satışlarım' }).click();

    // Tarih filtreleme
    await page.locator('ot-data-entry-template').filter({ hasText: 'Başlangıç Tarihi' }).getByLabel('Takvimden seç').click();
    await page.getByText('Tem', { exact: true }).first().click();
    await page.getByTitle('1 Temmuz 2025 Salı').locator('span').click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'Bitiş Tarihi' }).getByLabel('Takvimden seç').click();
    await page.getByText('Tem', { exact: true }).first().click();
    await page.getByTitle('31 Temmuz 2025 Perşembe').locator('span').click();

    // Seri numarası ve üye işyeri filtreleme
    await page.locator('ot-data-entry-template').filter({ hasText: 'Seri Numarası' }).getByRole('textbox').click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'Seri Numarası0/' }).getByRole('textbox').fill('N860W657047');
    await page.locator('kendo-combobox').getByRole('combobox').click();
    await page.locator('kendo-combobox').getByRole('combobox').fill('erdal');
    await page.getByText('Erdal Bakkal-').click();

    // Filtrele butonuna tıkla
    await page.getByRole('button', { name: 'Filtrele' }).click();
    await page.waitForTimeout(1000);

    // "Kayıt bulunamadı" mesajının görünüp görünmediğini kontrol et
    const kayitBulunamadiElement = page.getByText('Kayıt bulunamadı');
    const isKayitBulunamadiVisible = await kayitBulunamadiElement.isVisible();
    
    if (isKayitBulunamadiVisible) {
        console.log('❌ Kayıt bulunamadı');
        await page.pause();
        return;
    }



    // Belirtilen hücrelerdeki değerleri oku ve kontrol et
    const cells = [
        await page.locator('td:nth-child(5)').first(),
        await page.locator('.k-master-row.k-alt > td:nth-child(5)').first(),
        await page.locator('tr:nth-child(3) > td:nth-child(5)'),
        await page.locator('tr:nth-child(4) > td:nth-child(5)'),
        await page.locator('tr:nth-child(5) > td:nth-child(5)'),
        await page.locator('tr:nth-child(6) > td:nth-child(5)')
    ];

    let allMatch = true;
    const expectedValue = 'N860W657047';

    for (let i = 0; i < cells.length; i++) {
        const cellText = await cells[i].textContent();
        
        if (cellText?.trim() !== expectedValue) {
            allMatch = false;
            console.log(`Hücre ${i + 1} eşleşmiyor. Beklenen: ${expectedValue}, Bulunan: ${cellText}`);
        }
    }

    if (allMatch) {
        console.log('✅ Filtreleme başarılı');
    } else {
        console.log('❌ Filtreleme başarısız - bazı hücreler beklenen değerle eşleşmiyor');
    }

    await page.pause();

}); 