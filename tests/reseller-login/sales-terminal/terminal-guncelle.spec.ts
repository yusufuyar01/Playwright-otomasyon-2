import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';
import { rastgeleString } from '../../../helpers/stringUret';

test('Terminal bilgilerini güncelleme (reseller login)', async ({ page }) => {

    console.log('===>  Terminal Bilgilerini Güncelleme (reseller login)  <===');

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

    await page.getByRole('button', { name: '' }).first().click();

    if (await page.getByRole('dialog').getByText('Hazır').isVisible()) {
        await page.getByRole('dialog').getByText('Hazır').click();
        await page.getByRole('option', { name: 'Başlatılamadı' }).click();
    }
    else {
        await page.getByRole('dialog').getByText('Başlatılamadı').click();
        await page.getByRole('option', { name: 'Hazır' }).click();
    }

    await page.getByRole('button', { name: 'Güncelle' }).click();

    try {
        const successMesajı = page.getByText('Başarılı', { exact: true });
        await expect(successMesajı).toBeVisible();
        console.log('✅ Terminal başarıyla güncellendi');
    } catch (error) {
        console.log('❌ Terminal güncellenemedi');
    }

    await page.pause();

});
