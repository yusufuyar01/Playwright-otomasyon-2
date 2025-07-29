import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';

test('Satışlarım Filtreleme İşlemleri', async ({ page }) => {

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
    
   
    

        

    // Önce sisteme giriş yap
    await login(page);

    // Zoom işlemi
    await zoom(page);

    await page.getByText('Satış', { exact: true }).click();
    await page.getByRole('link', { name: ' Satışlarım' }).click();
    await page.waitForTimeout(1000);

    // Tarih filtreleme - düzeltilmiş versiyon
    await page.locator('ot-data-entry-template').filter({ hasText: 'Başlangıç Tarihi' }).getByLabel('Takvimden seç').click();

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
    console.log(`🔍 Seçilecek tarih: "${titleText}"`);

    
    await page.getByTitle(titleText).locator('span').click();
    await page.waitForTimeout(1000);

   
   
   
    await page.locator('ot-data-entry-template').filter({ hasText: 'Bitiş Tarihi' }).getByLabel('Takvimden seç').click();
    await page.getByRole('button', { name: 'Bugün' }).click();

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