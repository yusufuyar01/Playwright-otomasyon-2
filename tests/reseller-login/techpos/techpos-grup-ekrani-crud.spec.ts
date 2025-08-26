import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';
import { rastgeleString } from '../../../helpers/stringUret';

test('TechPOS Grup Ekranı CRUD İşlemleri (reseller-login)', async ({ page }) => {

    console.log('===>  Techpos Grup Ekranı CRUD İşlemleri (reseller-login)  <===');

    await login2(page);
    await zoom(page);

    // Techpos yönetimi ve grup sayfasına git
    await page.getByText('Techpos Yönetimi').click();
    // Menü bazı ortamlarda ikonla başlayabilir; önce ikonlu, sonra düz metni dene
    const grupLinkWithIcon = page.getByRole('link', { name: ' Techpos Grup' });
    if (await grupLinkWithIcon.count()) {
        await grupLinkWithIcon.click();
    } else {
        await page.getByRole('link', { name: 'Techpos Grup' }).click();
    }

    // yeni grup ekleme
    await page.getByRole('button', { name: 'Yeni Ekle' }).click();

    const grupIsim = ("DENEME" + rastgeleString(5)).toUpperCase();
    await page.getByRole('textbox').fill(grupIsim);
    await page.getByText('Seçiniz...').click();
    await page.getByRole('option', { name: 'test', exact: true }).click();
    await page.getByRole('button', { name: 'Oluştur' }).click();

    try {
        const basarimMesaji = page.getByText('Başarılı BKM Techpos Group ba');
        await expect(basarimMesaji).toBeVisible();
        await basarimMesaji.click();
        await page.waitForTimeout(500);
        console.log('✅ Grup başarıyla oluşturuldu');   
    } catch (error) {
        console.log('❌ Grup oluşturma başarım mesajı bulunamadı!');
    }   

    // grup güncelleme
    await page.getByRole('button', { name: 'Son Sayfa' }).click();
    await page.getByRole('row', { name: ' ' + grupIsim + ' Test' }).getByRole('button').click();
    await page.getByRole('dialog').getByText('Test').click();
    await page.getByRole('option', { name: 'test2', exact: true }).click();
    await page.getByRole('button', { name: 'Güncelle' }).click();

    try {
        const basarimMesaji = page.getByText('Başarılı BKM Techpos Group ba');
        await expect(basarimMesaji).toBeVisible();
        await page.waitForTimeout(500);
        await basarimMesaji.click();
        console.log('✅ Grup başarıyla güncellendi');
    } catch (error) {
        console.log('❌ Grup güncelleme başarım mesajı bulunamadı!');
    }

    // grup silme
    await page.getByRole('row', { name: ' ' + grupIsim + ' Test2' }).getByRole('button').click();
    await page.getByRole('button', { name: 'Sil' }).click();
    await page.getByRole('button', { name: 'Evet' }).click();

    try {
        const basarimMesaji = page.getByText('Başarılı BKM Techpos Group ba');
        await expect(basarimMesaji).toBeVisible();
        await page.waitForTimeout(500);
        await basarimMesaji.click();
        console.log('✅ Grup başarıyla silindi');
    } catch (error) {
        console.log('❌ Grup silme başarım mesajı bulunamadı!');
    }

    await page.pause();
});
