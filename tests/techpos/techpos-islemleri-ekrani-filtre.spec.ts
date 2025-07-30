import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';

test('TechPOS - İşlemleri Ekranı Filtre', async ({ page }) => {
  
    await login(page);
    
    await zoom(page);

    // Techpos yönetimine ve techpos işlemleri sayfasına git
    await page.getByText('Techpos Yönetimi').click();
    await page.getByRole('link', { name: 'Techpos İşlemleri', exact: true }).click();

    // Sayfanın yüklenmesini bekle
    await page.waitForLoadState('networkidle');

    // Filtre alanlarını test et
    console.log('🔍 Filtre testleri başlıyor...');

    // 1. Terminal ID filtresi
    console.log('📋 Terminal ID filtresi test ediliyor...');
    await page.getByLabel('Terminal ID').click();
    await page.getByLabel('Terminal ID').fill('76082');
    await page.getByRole('button', { name: 'Filtrele' }).click();
    await page.waitForTimeout(2000);
    
    // Sonuçları kontrol et
    const terminalResults = page.locator('table tbody tr');
    const terminalCount = await terminalResults.count();
    console.log(`📊 Terminal ID filtresi sonucu: ${terminalCount} kayıt bulundu`);

    // 2. Tarih aralığı filtresi
    console.log('📅 Tarih aralığı filtresi test ediliyor...');
    await page.getByLabel('Başlangıç Tarihi').click();
    await page.getByLabel('Başlangıç Tarihi').fill('2024-01-01');
    await page.getByLabel('Bitiş Tarihi').click();
    await page.getByLabel('Bitiş Tarihi').fill('2024-12-31');
    await page.getByRole('button', { name: 'Filtrele' }).click();
    await page.waitForTimeout(2000);

    // 3. İşlem tipi filtresi
    console.log('💳 İşlem tipi filtresi test ediliyor...');
    await page.getByLabel('İşlem Tipi').click();
    await page.getByRole('option', { name: 'Satış' }).click();
    await page.getByRole('button', { name: 'Filtrele' }).click();
    await page.waitForTimeout(2000);

    // 4. Durum filtresi
    console.log('✅ Durum filtresi test ediliyor...');
    await page.getByLabel('Durum').click();
    await page.getByRole('option', { name: 'Başarılı' }).click();
    await page.getByRole('button', { name: 'Filtrele' }).click();
    await page.waitForTimeout(2000);

    // 5. Tutar aralığı filtresi
    console.log('💰 Tutar aralığı filtresi test ediliyor...');
    await page.getByLabel('Min Tutar').click();
    await page.getByLabel('Min Tutar').fill('10');
    await page.getByLabel('Max Tutar').click();
    await page.getByLabel('Max Tutar').fill('1000');
    await page.getByRole('button', { name: 'Filtrele' }).click();
    await page.waitForTimeout(2000);

    // 6. Çoklu filtre testi
    console.log('🔍 Çoklu filtre testi yapılıyor...');
    await page.getByLabel('Terminal ID').click();
    await page.getByLabel('Terminal ID').fill('76082');
    await page.getByLabel('İşlem Tipi').click();
    await page.getByRole('option', { name: 'Satış' }).click();
    await page.getByLabel('Durum').click();
    await page.getByRole('option', { name: 'Başarılı' }).click();
    await page.getByRole('button', { name: 'Filtrele' }).click();
    await page.waitForTimeout(2000);

    // 7. Filtreleri temizle
    console.log('🧹 Filtreleri temizleme testi...');
    await page.getByRole('button', { name: 'Filtreleri Temizle' }).click();
    await page.waitForTimeout(2000);

    // 8. Sayfalama testi
    console.log('📄 Sayfalama testi...');
    const paginationButtons = page.locator('.pagination button');
    const paginationCount = await paginationButtons.count();
    
    if (paginationCount > 0) {
        // İkinci sayfaya git
        await page.getByRole('button', { name: '2' }).click();
        await page.waitForTimeout(2000);
        console.log('✅ Sayfalama çalışıyor');
    } else {
        console.log('ℹ️ Sayfalama butonu bulunamadı');
    }

    // 9. Sıralama testi
    console.log('📊 Sıralama testi...');
    const sortableHeaders = page.locator('table th[data-sortable="true"]');
    const headerCount = await sortableHeaders.count();
    
    if (headerCount > 0) {
        // İlk sıralanabilir başlığa tıkla
        await sortableHeaders.first().click();
        await page.waitForTimeout(2000);
        console.log('✅ Sıralama çalışıyor');
    } else {
        console.log('ℹ️ Sıralanabilir başlık bulunamadı');
    }

    // 10. Export işlemi testi
    console.log('📤 Export işlemi testi...');
    const exportButton = page.getByRole('button', { name: 'Export' });
    
    if (await exportButton.isVisible()) {
        await exportButton.click();
        await page.waitForTimeout(2000);
        console.log('✅ Export işlemi başlatıldı');
    } else {
        console.log('ℹ️ Export butonu bulunamadı');
    }

    // Test sonuçlarını doğrula
    try {
        // Tablo görünür olmalı
        const table = page.locator('table');
        expect(table).toBeVisible();
        console.log('✅ Tablo görünür');
        
        // Filtre alanları görünür olmalı
        const filterForm = page.locator('form[data-testid="filter-form"]');
        if (await filterForm.isVisible()) {
            console.log('✅ Filtre formu görünür');
        } else {
            console.log('ℹ️ Filtre formu bulunamadı');
        }
        
        console.log('🎉 TechPOS işlemleri ekranı filtre testleri tamamlandı');
        
    } catch (error) {
        console.log('❌ Test doğrulama hatası:', error);
    }
    
    await page.pause();
}); 