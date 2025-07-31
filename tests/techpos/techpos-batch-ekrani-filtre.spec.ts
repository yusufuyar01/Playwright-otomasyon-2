import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';

test('TechPOS - Batch Ekranı Filtre', async ({ page }) => {
  
    // Bugünün tarihini konsola yazdır
    const bugun = new Date();
    const tarihString = bugun.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    console.log(`📅 Bugünün tarihi: ${tarihString}`);

    // 20 gün öncesinin tarihini konsola yazdır
    const yirmiGunOncesi = new Date();
    yirmiGunOncesi.setDate(bugun.getDate() - 20);
    const yirmiGunOncesiString = yirmiGunOncesi.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    console.log(`📅 20 gün öncesi: ${yirmiGunOncesiString}`);

    // Ay numarasını ay adına çeviren fonksiyon
    const ayAdiGetirTam = (ayNumarasi: number): string => {
        const aylar = [
            'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
            'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
        ];
        return aylar[ayNumarasi - 1];
    };
    
    // Gün numarasını gün adına çeviren fonksiyon
    const gunAdiGetir = (gunNumarasi: number): string => {
        const gunler = [
            'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 
            'Perşembe', 'Cuma', 'Cumartesi'
        ];
        return gunler[gunNumarasi];
    };  

    await login(page);
    
    await zoom(page);

    // Techpos yönetimi ve batch sayfasına git
    await page.getByText('Techpos Yönetimi').click();
    await page.getByRole('link', { name: 'Techpos Batch' }).click();

    // Tarih filtreleme - başlangıç tarihi
    await page.locator('ot-data-entry-template').filter({ hasText: 'Oluşturulma Tarihi' }).getByLabel('Takvimden seç').click();

    // Takvim açıldıktan sonra elementin yüklenmesini bekle
    await page.waitForSelector('[role="gridcell"]', { state: 'visible' });

    // Tarih string'ini daha basit formatta oluştur (sadece gün)
    const gun = yirmiGunOncesi.getDate();
    const ay = yirmiGunOncesi.getMonth() + 1;
    
    // Gün adını al
    const gunAdi = gunAdiGetir(yirmiGunOncesi.getDay());
    await page.waitForTimeout(1000);

    // Tarih seçimi
    const titleText = `${gun} ${ayAdiGetirTam(ay)} ${yirmiGunOncesi.getFullYear()} ${gunAdi}`;
    console.log(`🔍 Seçilecek başlangıç tarihi: "${titleText}"`);

    await page.getByTitle(titleText).locator('span').click();
    await page.waitForTimeout(1000);
   
    // Bitiş tarihi seçimi
    await page.locator('ot-data-entry-template').filter({ hasText: 'Bitiş Tarihi' }).getByLabel('Takvimden seç').click();
    await page.getByRole('button', { name: 'Bugün' }).click();

    // Terminal id doldur
    await page.locator('ot-data-entry-template').filter({ hasText: 'Terminal' }).getByRole('combobox').click();
    await page.waitForTimeout(3000);
    await page.locator('ot-data-entry-template').filter({ hasText: 'Terminal' }).getByRole('combobox').fill('77301');
    await page.locator('ot-data-entry-template').filter({ hasText: 'Terminal' }).getByRole('combobox').fill('7730');
    await page.getByRole('option', { name: '77301' }).click();
    

    // BKM Seri No doldur
    await page.locator('ot-data-entry-template').filter({ hasText: 'BKM Seri No' }).getByRole('combobox').click();
    await page.waitForTimeout(10000);

    await page.locator('ot-data-entry-template').filter({ hasText: 'BKM Seri No' }).getByRole('combobox').fill('PAV860066571');
    await page.waitForTimeout(3000);
    await page.locator('ot-data-entry-template').filter({ hasText: 'BKM Seri No' }).getByRole('combobox').fill('PAV86006657');
    await page.waitForTimeout(1000);
    await page.locator('ot-data-entry-template').filter({ hasText: 'BKM Seri No' }).getByRole('combobox').fill('PAV8600665');
    await page.waitForTimeout(1000);
    await page.locator('ot-data-entry-template').filter({ hasText: 'BKM Seri No' }).getByRole('combobox').fill('PAV86006657');
    // await page.waitForTimeout(1000);
    await page.waitForTimeout(1000);
    await page.getByRole('option', { name: 'PAV860066571' }).click();
    
    // Üye işyeri doldur
    await page.locator('kendo-combobox').getByRole('combobox').click();
    await page.locator('kendo-combobox').getByRole('combobox').fill('erda');
    await page.getByRole('option', { name: 'Erdal Bakkal-' }).click();

    // Filtrele butonuna tıkla
    await page.getByRole('button', { name: 'Filtrele' }).click();
    await page.waitForTimeout(4000);

    // "Kayıt bulunamadı" mesajının görünüp görünmediğini kontrol et
    const kayitBulunamadiElement = page.getByText('Kayıt bulunamadı');
    const isKayitBulunamadiVisible = await kayitBulunamadiElement.isVisible();

    // "Seçilecek maksimum gün aralığı:" mesajının görünüp görünmediğini kontrol et
    const gunUyarisi = page.getByText('Seçilecek maksimum gün aralığı:');
    const isGunUyarisiVisible = await gunUyarisi.isVisible();

    if (isGunUyarisiVisible) {
        console.log('❌ Seçilecek maksimum gün aralığı: 30');
        await page.pause();
        return;
    }
    else if (isKayitBulunamadiVisible) {
        console.log('❌ Kayıt bulunamadı');
        await page.pause();
        return;
    }

    // Belirtilen hücrelerdeki değerleri oku ve kontrol et
    const cellsTerminalId = [
        await page.locator('td:nth-child(7)').first(),
        await page.locator('.k-master-row.k-alt > td:nth-child(7)').first(),
        await page.locator('tr:nth-child(3) > td:nth-child(7)'),
        await page.locator('tr:nth-child(4) > td:nth-child(7)'),
        await page.locator('tr:nth-child(5) > td:nth-child(7)'),
        await page.locator('tr:nth-child(6) > td:nth-child(7)')
    ];

    const cellsBkmSeriNo = [
        await page.locator('td:nth-child(8)').first(),
        await page.locator('.k-master-row.k-alt > td:nth-child(8)').first(),
        await page.locator('tr:nth-child(3) > td:nth-child(8)'),
        await page.locator('tr:nth-child(4) > td:nth-child(8)'),
        await page.locator('tr:nth-child(5) > td:nth-child(8)'),
        await page.locator('tr:nth-child(6) > td:nth-child(8)')
    ];

    const cellsUyeIsyeri = [
        await page.locator('td:nth-child(10)').first(),
        await page.locator('.k-master-row.k-alt > td:nth-child(10)').first(),
        await page.locator('tr:nth-child(3) > td:nth-child(10)'),
        await page.locator('tr:nth-child(4) > td:nth-child(10)'),
        await page.locator('tr:nth-child(5) > td:nth-child(10)'),
        await page.locator('tr:nth-child(6) > td:nth-child(10)')
    ];

   

    let allMatchTerminalId = true;
    let allMatchBkmSeriNo = true;
    let allMatchUyeIsyeri = true;
    const expectedValueTerminalId = '77301';

    for (let i = 0; i < cellsTerminalId.length; i++) {
        const cellText = await cellsTerminalId[i].textContent();
        
        if (cellText?.trim() !== expectedValueTerminalId) {
            allMatchTerminalId = false;
            console.log(`Hücre ${i + 1} eşleşmiyor. Beklenen: ${expectedValueTerminalId}, Bulunan: ${cellText}`);
        }
    }

    if (allMatchTerminalId) {
        console.log('✅ Filtreleme sonucu terminal id eşleşti');
    } else {
        console.log('❌ Filtreleme sonucu terminal id eşleşmedi');
    }

    const expectedValueBkmSeriNo = 'PAV860066571';

    for (let i = 0; i < cellsBkmSeriNo.length; i++) {
        const cellText = await cellsBkmSeriNo[i].textContent();
        
        if (cellText?.trim() !== expectedValueBkmSeriNo) {
            allMatchBkmSeriNo = false;
            console.log(`Hücre ${i + 1} eşleşmiyor. Beklenen: ${expectedValueBkmSeriNo}, Bulunan: ${cellText}`);
        }
    }

    if (allMatchBkmSeriNo) {
        console.log('✅ Filtreleme sonucu BKM Seri No eşleşti');
    } else {
        console.log('❌ Filtreleme sonucu bkm seri no eşleşmedi');
    }

    const expectedValueUyeIsyeri = 'ERDAL BAKKAL';

    for (let i = 0; i < cellsUyeIsyeri.length; i++) {
        const cellText = await cellsUyeIsyeri[i].textContent();
        
        if (cellText?.trim() !== expectedValueUyeIsyeri) {
            allMatchUyeIsyeri = false;
            console.log(`Hücre ${i + 1} eşleşmiyor. Beklenen: ${expectedValueUyeIsyeri}, Bulunan: ${cellText}`);
        }
    }

    if (allMatchUyeIsyeri) {
        console.log('✅ Filtreleme sonucu üye işyeri eşleşti');
    } else {
        console.log('❌ Filtreleme sonucu üye işyeri eşleşmedi');
    }

    
    await page.pause();
}); 