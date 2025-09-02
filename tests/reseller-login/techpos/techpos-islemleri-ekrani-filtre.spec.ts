import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';   
import { zoom } from '../../../helpers/zoom';

test('TechPOS İşlemleri Ekranı Filtre (reseller-login)', async ({ page }) => {
  
    console.log('===>  Techpos İşlemleri Ekranı Filtreleme (reseller-login) <===');
        
    // Bugünün tarihini konsola yazdır
    const bugun = new Date();
    const tarihString = bugun.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    console.log(`📅 Bugünün tarihi: ${tarihString}`);

    // 30 gün öncesinin tarihini konsola yazdır
    const otuzGunOncesi = new Date();
    otuzGunOncesi.setDate(bugun.getDate() - 30);
    const otuzGunOncesiString = otuzGunOncesi.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    console.log(`📅 30 gün öncesi: ${otuzGunOncesiString}`);

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


    await login2(page);
    
    await zoom(page);

    // Techpos işlemleri sayfasına git
    await page.getByText('Techpos Yönetimi').click();
    await page.getByRole('link', { name: ' Techpos İşlemleri' }).click();

    // Tarih filtreleme - başlangıç tarihi
    await page.locator('#datepicker-1').click();
    await page.waitForTimeout(1000);
    await page.locator('#datepicker-1').press('ArrowLeft');
    await page.locator('#datepicker-1').press('ArrowLeft');
    await page.waitForTimeout(1000);

    // Tarih string'ini oluştur
    const gun = otuzGunOncesi.getDate();
    const ay = otuzGunOncesi.getMonth() + 1;
    const yıl = otuzGunOncesi.getFullYear();
    
    // Gün adını al
    await page.waitForTimeout(1000);

   // Tarih seçimi - GG.AA.YYYY formatında (numara olarak)
   console.log(`🔍  30 Gün Öncesi Seçildi`);
   const tarih = gun.toString() + ay.toString() + yıl.toString();
   if (gun.toString() !== '31') {
   const gunStr = ['3','4','5','6','7','8','9'].includes(gun.toString()) ? '0' + gun.toString() : gun.toString();
   const tarih = gunStr + ay.toString() + yıl.toString();
   }
   
   if (['1','3','5','7','8','10','12'].includes(ay.toString())) {
    await page.locator('#datepicker-1').click();
    for (let i = 0; i < yıl.toString().length; i++) {
    await page.locator('#datepicker-1').press(yıl.toString()[i]);
    await page.waitForTimeout(300); // Her karakter arasında kısa bekleme
    }
    await page.locator('#datepicker-1').press('ArrowLeft');
    for (let i = 0; i < ay.toString().length; i++) {
        await page.locator('#datepicker-1').press(ay.toString()[i]);
        await page.waitForTimeout(300); // Her karakter arasında kısa bekleme
    }
    await page.locator('#datepicker-1').press('ArrowLeft');
    await page.locator('#datepicker-1').press('ArrowLeft');
    for (let i = 0; i < gun.toString().length; i++) {
        await page.locator('#datepicker-1').press(gun.toString()[i]);
        await page.waitForTimeout(300); // Her karakter arasında kısa bekleme
    }
   } else {
       // Tarih string'ini karakterlerine ayır ve her birini ayrı ayrı bas
   for (let i = 0; i < tarih.length; i++) {
    await page.locator('#datepicker-1').press(tarih[i]);
    await page.waitForTimeout(300); // Her karakter arasında kısa bekleme
    }   
    }

    
    // Gün adını al
    const gunAdi = gunAdiGetir(otuzGunOncesi.getDay());
    await page.waitForTimeout(1000);

    // Tarih seçimi
    const titleText = `${gun} ${ayAdiGetirTam(ay)} ${otuzGunOncesi.getFullYear()} ${gunAdi}`;
    console.log(`🔍 Seçilecek başlangıç tarihi: "${titleText}"`);

    // await page.getByTitle(titleText).locator('span').click();
    await page.waitForTimeout(1000);

    await page.locator('ot-data-entry-template').filter({ hasText: 'Bitiş Tarihi' }).getByLabel('Takvimden seç').click();
    await page.getByRole('button', { name: 'Bugün' }).click();

    // Terminal id doldur
    await page.locator('ot-data-entry-template').filter({ hasText: 'Terminal' }).getByRole('textbox').fill('77301');
    await page.getByRole('button', { name: 'Filtrele' }).click();
    await page.waitForTimeout(4000);

    // Belirtilen hücrelerdeki değerleri oku ve kontrol et
    const cellsTerminalId = [
        await page.locator('td:nth-child(3)').first(),
        await page.locator('.k-master-row.k-alt > td:nth-child(3)').first(),
        await page.locator('tr:nth-child(3) > td:nth-child(3)'),
        await page.locator('tr:nth-child(4) > td:nth-child(3)'),
        await page.locator('tr:nth-child(5) > td:nth-child(3)'),
        await page.locator('tr:nth-child(6) > td:nth-child(3)')
    ];

    let allMatchTerminalId = true;

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

    await page.locator('ot-data-entry-template').filter({ hasText: 'Terminal' }).getByRole('textbox').fill('');


    // BKM Seri No doldur
    await page.locator('ot-data-entry-template').filter({ hasText: 'BKM Seri No' }).getByRole('textbox').click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'BKM Seri No' }).getByRole('textbox').fill('PAV860066571');
    await page.getByRole('button', { name: 'Filtrele' }).click();
    await page.waitForTimeout(4000);

    const cellsBkmSeriNo = [
        await page.locator('td:nth-child(5)').first(),
        await page.locator('.k-master-row.k-alt > td:nth-child(5)').first(),
        await page.locator('tr:nth-child(3) > td:nth-child(5)'),
        await page.locator('tr:nth-child(4) > td:nth-child(5)'),
        await page.locator('tr:nth-child(5) > td:nth-child(5)'),
        await page.locator('tr:nth-child(6) > td:nth-child(5)')
    ];

    let allMatchBkmSeriNo = true;

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

    await page.locator('ot-data-entry-template').filter({ hasText: 'BKM Seri No' }).getByRole('textbox').fill('');

    // Üye işyeri doldur
    await page.locator('ot-data-entry-template').filter({ hasText: 'Üye İşyeri' }).getByRole('combobox').click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'Üye İşyeri' }).getByRole('combobox').fill('erdal');
    await page.getByRole('option', { name: 'Erdal Bakkal' }).click();
    await page.getByRole('button', { name: 'Filtrele' }).click();
    await page.waitForTimeout(4000);

    const cellsUyeIsyeri = [
        await page.locator('td:nth-child(14)').first(),
        await page.locator('.k-master-row.k-alt > td:nth-child(14)').first(),
        await page.locator('tr:nth-child(3) > td:nth-child(14)'),
        await page.locator('tr:nth-child(4) > td:nth-child(14)'),
        await page.locator('tr:nth-child(5) > td:nth-child(14)'),
        await page.locator('tr:nth-child(6) > td:nth-child(14)')
    ];

    let allMatchUyeIsyeri = true;

    const expectedValueUyeIsyeri = 'Erdal Bakkal';

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

    


    


    await page.pause();
});
