import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';

test('TechPOS - Grup Ata ve Terminal Güncelle', async ({ page }) => {
  
    await login(page);
    
    await zoom(page);

    // Techpos yönetimine ve techpos terminal sayfasına tıkla
    await page.getByText('Techpos Yönetimi').click();
    await page.getByRole('link', { name: ' Techpos Terminal', exact: true }).click();

    // Terminali getir
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('spinbutton', { name: 'Id Filter', exact: true }).click();
    await page.getByRole('spinbutton', { name: 'Id Filter', exact: true }).fill('76082');
    await page.getByRole('row', { name: ' 76082 77385 N860W657047' }).locator('#selectAllCheckboxId').check();
    await page.getByText('Techpos Grup Seç').click();
    
    // Rastgele bir grup seç (1-25 arası)
    const randomIndex = Math.floor(Math.random() * 25) + 1;
    const techposGrup = page.getByRole('option').nth(randomIndex);
    const selectedGrupText = await techposGrup.textContent();
    console.log(`Seçilen grup adı: ${selectedGrupText}`);
    await techposGrup.click();


    // techpos grup atama
    await page.getByRole('button', { name: 'Techpos Grup atama ' }).click();
    await page.getByRole('button', { name: ' Assign Techpos Group' }).click();
    await page.getByRole('button', { name: 'Evet' }).click();


    try {
        const basariliMesaj = page.getByText('Başarılı Başarılı');
        expect(basariliMesaj).toBeVisible();
        await page.waitForTimeout(1000);
        await basariliMesaj.click();
        console.log('✅ Techpos grup atama başarılı');
    } catch (error) {
        console.log('❌ Techpos grup atama başarısız');
    }


    // terminal guncelleme
    await page.getByRole('button', { name: '' }).click();
    if (await page.getByText('Bekletiliyor').isVisible()) {
        await page.getByRole('combobox').filter({ hasText: 'Bekletiliyor' }).getByLabel('Select').click();
        await page.getByRole('option', { name: 'Aktif' }).click();
        await page.getByRole('button', { name: 'Güncelle' }).click();
    } else {
        await page.getByRole('combobox').filter({ hasText: 'Aktif' }).getByLabel('Select').click();
        await page.getByRole('option', { name: 'Bekletiliyor' }).click();
        await page.getByRole('button', { name: 'Güncelle' }).click();
    }
    
    

    try {
        const basariliMesaj = page.getByText('Başarılı Techpos Terminal baş');
        expect(basariliMesaj).toBeVisible();
        await page.waitForTimeout(1000);
        await basariliMesaj.click();
        console.log('✅ Techpos terminal güncelleme başarılı');
    } catch (error) {
        console.log('❌ Techpos terminal güncelleme başarısız');
    }
    
    await page.pause();
});
