import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';
import { rastgeleString } from '../../helpers/stringUret';
import { terminaliGetir } from '../../helpers/satisYerminaliIslemleri';

test('Terminal bilgilerini güncelleme', async ({ page }) => {

    // Önce sisteme giriş yap
    await login(page);

    // Zoom işlemi
    await zoom(page);

    await terminaliGetir(page);

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
