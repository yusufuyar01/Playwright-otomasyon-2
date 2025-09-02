import { test, expect } from '@playwright/test';
import { login } from '../../../helpers/login';
import { zoom } from '../../../helpers/zoom';

test('Satışlarım Filtreleme İşlemleri', async ({ page }) => {

    console.log('===>  Satışlarım Filtreleme İşlemleri  <===');

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

    // Tarih filtreleme - başlangıç tarihi
    await page.locator('#datepicker-1').click();
    await page.waitForTimeout(1000);
    await page.locator('#datepicker-1').press('ArrowLeft');
    await page.locator('#datepicker-1').press('ArrowLeft');
    await page.waitForTimeout(1000);


    // Tarih string'ini oluştur
    const gun = yirmiGunOncesi.getDate();
    const ay = yirmiGunOncesi.getMonth() + 1;
    const yıl = yirmiGunOncesi.getFullYear();
    
    // Gün adını al
    await page.waitForTimeout(1000);

    // Tarih seçimi - GG.AA.YYYY formatında (numara olarak)
   console.log(`🔍  20 Gün Öncesi Seçildi`);
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
    const gunAdi = gunAdiGetir(yirmiGunOncesi.getDay());
    await page.waitForTimeout(1000);

    // Tarih seçimi
    const titleText = `${gun} ${ayAdiGetirTam(ay)} ${yirmiGunOncesi.getFullYear()} ${gunAdi}`;
    console.log(`🔍 Seçilecek başlangıç tarihi: "${titleText}"`);

    // await page.getByTitle(titleText).locator('span').click();
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